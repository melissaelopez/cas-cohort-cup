Cohort Cup Point Tracker

DESCRIPTION  
>This site is for tracking Cohort Cup points from the College of Arts and Science Cohort Cup. It is a competition between the 44 first-year student cohorts, and they can earn points by participating in Facebook Challenges and by attending Marquee Events. Instead of counting up scores by hand, this application will read a file from Facebook containing all of the comments from a given Facebook Challenge post. It will then allocate points to the proper cohort. There will also be a section for adding in marquee event points, and manually adding individual points to a cohort's total tally.
  
REQUIREMENTS 
(from db.js)
```
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
```
  
WIREFRAMES
![Alt text](/documentation/wireframe-01.png?raw=true "Test")  
![Alt text](/documentation/wireframe-03.png?raw=true "Test")  
![Alt text](/documentation/wireframe-02.png?raw=true "Test")  
![Alt text](/documentation/wireframe-04.png?raw=true "Test")  
  
SITE MAP 
![Alt text](/documentation/sitemap.png?raw=true "Test")  
  
USER STORIES
>Melissa is the College Captain and needs to add cohort cup points for the first challenge of the year.  
>Rebecca wants to see what the current Cohort Cup standings are.  
>One cohort has earned bonus Cohort Cup points, so Lisa wants to add individual points to their total score.  
  
RESEARCH TOPICS  
>(6 points) User authentication  
>>This will allow me to create accounts for people using the site. The point tracker should only be accessible to administators, and not the the students participating in the Cohort Cup. Plus, we wouldn't want someone who isnt trusted to go in and change the score numbers.
  
>(2 points) Sass  
>>Sass is a CSS extension language that essentially adds more features to CSS such as creating variables and nesting CSS selectors. Making the site visually interesting is something I strive to do, mainly because it interests me, but also because I think it will help with organizing the site and making it nice to look at and easier to use for whoever may need to. Sass looks like a fun tool to get to know to make creating the style sheet more organized and intuitive.