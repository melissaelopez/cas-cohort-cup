var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');

var UserSchema = new mongoose.Schema({ });

UserSchema.plugin(passportLocalMongoose);
  
var Cohort = new mongoose.Schema({  
	cohortName: String,
	cohortNumber: Number, 
	clName: String,
	totalScore: Number
});

var Challenge = new mongoose.Schema({  
	name: String,
	weekTheme: String,
	cohortScores: [Number]
});

var Event = new mongoose.Schema({  
	name: String,
	cohortScores: [Number]
});

mongoose.model('Cohort', Cohort);
mongoose.model('Challenge', Challenge);
mongoose.model('Event', Event);
mongoose.model('User', UserSchema);

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI);
// mongoose.connect("mongodb://localhost/final-project");