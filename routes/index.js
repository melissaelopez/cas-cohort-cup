var express = require('express');
var router = express.Router();
var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Cohort = mongoose.model('Cohort');
var Challenge = mongoose.model('Challenge');
var Event = mongoose.model('Event');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect('/rankings');
});

router.get('/register', function(req, res, next) {
  res.render('register', { title: 'Rankings' });
});

router.get('/login', function(req, res, next) {
  res.render('login');
});

router.post('/register', function(req, res) {
  User.register(new User({username:req.body.username}), req.body.password, function(err, user){
    if (err) {
      res.render('register',{message:'Your registration information is not valid'});
    } else {
      passport.authenticate('local')(req, res, function() {
        res.redirect('/rankings');
      });
    }
  });   
});

router.post('/login', function(req,res,next) {
  passport.authenticate('local', function(err,user) {
    if (user) {
      req.logIn(user, function(err) {
        res.redirect('/rankings');
      });
    } else {
      res.render('login', {message:'Your login or password is incorrect.'});
    }
  })(req, res, next);
});

router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

router.get('/editor', function(req, res, next) {
  if(req.user) {
    res.redirect('/editor/manage');
  } else {
    res.render('login', {message: 'You must be logged in to view the requested content.'});
  }
});

router.get('/editor/manage', function(req, res, next) {
  if(req.user) {
    Cohort.find(function(err, cohorts, count) {
      res.render('manage', {cohorts:cohorts});
    });
  } else {
    res.render('login', {message: 'You must be logged in to view the requested content.'});
  }
});


router.get('/rankings', function(req, res, next) {
    Cohort.find(function(err, cohorts, count) {
        var scores = [];
        for (var i = 0; i < 44; i++){scores.push(i);}

        var scores = scores.map(function(num){return cohorts[num].totalScore;});
        var total = scores.reduce(function(a,b){return a+b;}, 0);
        var average = (total / 44).toFixed(2);
        var aboveAverage = scores.filter(function(score){return score > average;}).length;
        var topFiveCohorts = [0,0,0,0,0];
        var topFiveScores = [-1,-1,-1,-1,-1];
        var scoresCopy = scores.slice();
        var maxScore = -1;
        var maxIndex = 0;
        for (var i = 0; i < 5; i++){
            maxScore = scoresCopy[0];
            maxIndex = 0;
            for (var j = 0; j < scoresCopy.length; j++){
                if (maxScore < scoresCopy[j]){
                    maxScore = scoresCopy[j];
                    maxIndex = j;
                }
            }
            topFiveScores[i] = maxScore;
            scoresCopy[maxIndex] = -2;
            topFiveCohorts[i] = maxIndex + 1;
        }
        var leaders = [];
        for (var i = 0; i < 5; i++){
            var leader = {
                number: topFiveCohorts[i],
                name: cohorts[topFiveCohorts[i] - 1].cohortName,
                score: topFiveScores[i],
                cl: cohorts[topFiveCohorts[i] - 1].clName,
                rank: i+1
            }
            leaders.push(leader);
        }
        res.render('rankings', {total:total, average:average, aboveAverage:aboveAverage, cohorts:cohorts, scores:scores, leaders:leaders});
    });
});

router.get('/editor/points', function(req, res, next) {
  if(req.user) {
    Challenge.find(function(err, challenges, count) {
    Event.find(function(err, events, count) {
      res.render('points', {challenges:challenges, events:events});
    });
  });
  } else {
    res.render('login', {message: 'You must be logged in to view the requested content.'});
  }
});

router.post('/add-cohort', function(req, res, next){
  Cohort.findOne({cohortNumber: req.body.cohortNumber}, function(err, cohort, count) {
    cohort.cohortName = req.body.cohortName;
    cohort.clName = req.body.clName;
    cohort.save(function(err, cohort, count){
		  res.redirect('/editor/manage');
    });
  });
});

router.post('/add-points', function(req, res, next){
    if (isNaN(req.body.toAdd) || req.body.toAdd === undefined || req.body.toAdd === ""){
        Challenge.find(function(err, challenges, count) {
            Event.find(function(err, events, count) {
                res.render('points', {challenges:challenges, events:events, error: 'You must enter a numeric value in Points to Add.'});
            });
        });
    } else if (req.body.cohortNumber === undefined || req.body.cohortNumber === "" || isNaN(req.body.cohortNumber) || parseInt(req.body.cohortNumber) > 44){ 
        Challenge.find(function(err, challenges, count) {
            Event.find(function(err, events, count) {
                res.render('points', {challenges:challenges, events:events, error: 'You must enter a valid cohort number.'});
            });
        });
    } else {
        Cohort.findOne({cohortNumber: req.body.cohortNumber}, function(err, cohort, count) {
            cohort.totalScore += parseInt(req.body.toAdd);
            cohort.save(function(err, cohort, count){
              res.redirect('/editor/manage');
            });
        });
    }
});

router.post('/deduct-points', function(req, res, next){
    if (isNaN(req.body.toRemove) || req.body.toRemove === undefined || req.body.toRemove === ""){
        Challenge.find(function(err, challenges, count) {
            Event.find(function(err, events, count) {
                res.render('points', {challenges:challenges, events:events, error: 'You must enter a numeric value in Points to Remove.'});
            });
        });
    } else if (req.body.cohortNumber === undefined || req.body.cohortNumber === "" || isNaN(req.body.cohortNumber) || parseInt(req.body.cohortNumber) > 44){ 
        Challenge.find(function(err, challenges, count) {
            Event.find(function(err, events, count) {
                res.render('points', {challenges:challenges, events:events, error: 'You must enter a valid cohort number.'});
            });
        });
    } else {
        Cohort.findOne({cohortNumber: req.body.cohortNumber}, function(err, cohort, count) {
            cohort.totalScore -= parseInt(req.body.toRemove);
            cohort.save(function(err, cohort, count){
              res.redirect('/editor/manage');
            });
        });
    }
});

router.post('/add-event', function(req, res, next){
    var scoresString = req.body.cohortScores;
    var scores = scoresString.split(",");
    for (var i = 0; i < scores.length; i++){
      scores[i] = parseInt(scores[i]);
    }
    console.log(scores.length, req.body.eventName);
    if (scores.length === 44 && req.body.eventName !== undefined && req.body.eventName !== ""){
        distributeScores(scores);
        new Event({
            name: req.body.eventName,
            cohortScores: scores
        }).save(function(err, event, count){
            res.redirect('/editor/manage');
        });
    } else if (scores.length !== 44){
        Challenge.find(function(err, challenges, count) {
            Event.find(function(err, events, count) {
                res.render('points', {challenges:challenges, events:events, error: 'You must enter 44 comma separated values. Check your input again.'});
            });
        });
    } else if (req.body.eventName === undefined || req.body.eventName === ""){
        Challenge.find(function(err, challenges, count) {
            Event.find(function(err, events, count) {
                res.render('points', {challenges:challenges, events:events, error: 'You must enter an event name.'});
            });
        });
    }     
    
});

router.post('/parse-comments', function(req, res, next){
	if (req.body.weekTheme === "" || req.body.name === ""){
		Challenge.find(function(err, challenges, count) {
            Event.find(function(err, events, count) {
                res.render('points', {challenges:challenges, events:events, error: 'You may not leave the Week Theme nor the Challenge Name field blank.'});
            });
        });
	} else if (req.body.comments == undefined || req.body.comments == ""){
		Challenge.find(function(err, challenges, count) {
            Event.find(function(err, events, count) {
                res.render('points', {challenges:challenges, events:events, error: 'You may not leave the Facebook Comments field blank.'});
            });
        });
	} else {
		var comments = req.body.comments;
		var scores = getPoints(comments);
		distributeScores(scores);
		new Challenge({
			name: req.body.name,
			weekTheme: req.body.weekTheme,
			cohortScores: scores
		}).save(function(err, challenge, count){
			res.redirect('/editor/manage');
		});
	}
});

function getPoints(comments){
  var splitComments = comments.split("\r\n");
  var scores = [];
  for (var i = 0; i < 44; i++){
    scores.push(0);
  }
  var cohortNames =
    [ "neo","shaquille","the father","fantastic 4","view from the 5th",
      "six in the city", "the deadly sins","gr8 m8", "upside-down 6", "Hamil-10",
      "11", "duck", "inferno","cohorton hears a who", "cal-hort",
      "16", "17thirtyeight", "spatulah","33 marks and counting","3/20",
      "21","catch 22","23 jump street","24 jump street","paarti",
      "alphabet","republic of chad","taylor gang","drinks soy milk","savages",
      "31ectric","molar bears","tonioshalal", "wtf", "soaplets",
      "harambae","ebmarah","izzy","game of sloan","40wap",
      "black ballads matter", "and everything else","amysangels","co-fo-fo"
    ];
          
  var lineCount  = 0;
  var pointsGiven  = false;
  var cohortNum  = 0;

  for (var i = 0; i < splitComments.length; i++){
    var line = splitComments[i];
    lineCount += 1;
    line = line.toLowerCase();
    newLine = line.split(" ");
    
    if (newLine[0] == "like" || newLine[0] == "unlike"){
      lineCount = 0;
      pointsGiven = false;
      cohortNumber = 0;
    }
    else {
      if (pointsGiven == true){
        if (line.includes("'s photo") || true == true){
          scores[cohortNumber-1] += 5
        }  
      }
      while (pointsGiven == false){  
        for (var j = 43; j >= 0; j--){
          var cohortNum = j+1;
          var cohortHashtag = "cohort" + cohortNum.toString();
          var cohortHashtagSpace  = "cohort " + cohortNum.toString();
          if ((line.includes(cohortHashtag)) || (line.includes(cohortNames[j])) || (line.includes(cohortHashtagSpace))){
            scores[j] += 10;
            cohortNumber = j+1;
            pointsGiven = true;
            break;
          }
        }      
        break; 
      }
    }
  }
  return scores;
}

function distributeScores(scores){
  Cohort.find(function(err, cohorts, count){
    for (var i = 0; i < 44; i++){
      cohorts[i].totalScore += scores[i];
      cohorts[i].save(function(err, event, count){
      });
    }
  });
}

module.exports = router;