#Cohort Cup Point Tracker

#DESCRIPTION  
>This site is for tracking Cohort Cup points from the College of Arts and Science Cohort Cup. It is a competition between the 44 first-year student cohorts, each lead by an upperclassman College Leader, and there are two ways students can earn points. (1) Students comment on our Facebook posts where we present a prompt. Students then answer our prompt, and include their Cohort's number (1-44) in the commment. By commenting, students earn 15 points for their cohort, and an additional 10 points if they also included a photo. (2) Students earn points for attending a Cohort Cup Marquee Event. Typically we pull this data as CSV's from an attendance spreadsheet, where each value represents the number of points to be given to the cohort at that respective index. The site also has options for adding and subtracting points from an individual cohort, as well as editing the College Leader name or Cohort Name. However, the number of cohorts is FIXED at 44, per the structure of the compeition. 
  
#REQUIREMENTS 
(from db.js)
```
var Cohort = new mongoose.Schema({  
	name: String,  
	cohortNum: Number,
	collegeLeaderName: String,
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
	cohortScores: [Number]
});  
```
  
#WIREFRAMES
![Alt text](/documentation/wireframe-01.png?raw=true "Test")  
![Alt text](/documentation/wireframe-03.png?raw=true "Test")  
![Alt text](/documentation/wireframe-02.png?raw=true "Test")  
![Alt text](/documentation/wireframe-04.png?raw=true "Test")  
  
#SITE MAP 
![Alt text](/documentation/sitemap.png?raw=true "Test")  
  
#USER STORIES
>Melissa is the College Captain and needs to add cohort cup points for the first challenge of the year.  
>Rebecca wants to see what the current Cohort Cup standings are.  
>One cohort has earned bonus Cohort Cup points, so Lisa wants to add individual points to their total score.  
  
#RESEARCH TOPICS  
>(6 points) User authentication  
>>The part of the site where the cohort rankings are displayed should be and is public, but the rest of the site is only accessible to administrators with an account. Plus, we wouldn't want someone who isn't trusted to go in and change the score numbers. Even if someone has the url to a page that is only supposed to be visible to admin, they are not able to gain access.
  
>(2 points) Bootstrap  
>> I used Boostrap to help with the look of my website, with the forms, table and nav bar.

>(1-2 points) Chart.js
>> This is a JavaScript library that was fairly easy to use. It takes some data and displays it for you on a chart of your choice. I used this to create the bar graph on the rankings page. The difficult part was making sure that the MongoDB data stayed well-sorted, and that the aynchronous calls to .find() were handled appropriately.