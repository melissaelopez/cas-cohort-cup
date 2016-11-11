var mongoose = require('mongoose');
  
var Cohort = new mongoose.Schema({  
	name: String,  
	shortName: String,
	cohortNum: Number,
	cohortHashtag: String,
	collegeLeaderName: String,
	challengeScores: [Number],
	eventScores: [Number],
	totalScore: Number
});  

var Challenge = new mongoose.Schema({  
	name: String,
	date: Number,
	weekTheme: String,
	cohortScores: [Number]
});  

var Event = new mongoose.Schema({  
	name: String,
	date: Number,
	cohortScores: [Number]
});  

mongoose.model('Cohort', Cohort);
mongoose.model('Challenge', Challenge);
mongoose.model('Event', Event);
mongoose.connect('mongodb://localhost/final-project');