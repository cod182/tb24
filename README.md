
# Dev Challenge - Personal Dashboard
#### By Codie Stephens-Evans

[Site is deployed on Netlify here](https://bejewelled-raindrop-29e6af.netlify.app/)

 ## Individual Tasks
### Registration/Login
  #### Requirement
- Ability to Login, Register and Logout.
- Database and collection to store all information securely
- Login in via Username & password
 ##### Status: ✅
  #### Functionality
	  - Users can login & out once registering.
	  - All pages redirect back to / for registration if not logged in

### Weather
#### Requirement
- Access to location service, preview thumbnail to show icon, current location and celsius temperature. Implement icon to indicate rainy, sunny or cloudy, name the location, show result in celcius, no internal page navigation required

 ##### Status: ✅
  #### Functionality
	  - longititue, latitude, error state and function to get the current location is stored in a context
	  - A Weather Card component exists to show data on dashboard
	  - A use effect requests user access if longitude and latitude is not already stored in context. I
		  - f they are in context, a call is made to the openweather API to get the current weather.
	  - A function is in place to load icons for certain conditions (e.g cloud, rain).
		  - if conditions aren't met, the icon falls back to the openweather default

  

### News
#### Requirement
- Implement API as provided, preview thumbnail to show image headline. Internal page navigation to show only the latest story with image, headline and sub text

 ##### Status: ✅
  #### Functionality
	  - A News Card component exists to display the latest news story on the dashboard with a link to a latest news page.
	  - A call is made to the BBC RSS feed and a function breaks dow the RSS feed into usable json to be displayed.
	  - INTERNAL PAGE: Latest News page featured an image thumbnail, date of update, title and subtext. 
		  - The image is also clickable to link to the BBC story.
  

### Sport
#### Requirement
- Use data provided. Thumbnail - show team name, internal page to have input field to insert team name. Chosen team (in input field) should produce a list of team names it has beaten in the champions league data that was made available. Ex - If input field is Juventus, list to include teams it has beaten

  ##### Status: ✅
  #### Functionality
	  - API was called to get a CSV file.
		  - CSV was parsed using papa to get the heading, data that is know the exist and optional data. 
		  - It is the put into a object and then into an array with all other results to be returned as usable json.
	  - A Sport Card was created to display a random match on the dashboard
		  - The card shows who played in the match, the date and a conditional message congratulating the team.
	  - INTERNAL PAGE: A sports results page was created to allow users to search for a team and get results of matches they have won.
	  - Searching for "Inter" will return all matches where they won against another team and how many times. 
		  - A drop down also show extra details on each match.

### Photos
#### Requirement
- Pick photos from your local device to add to photo library within this module. Thumbnail to show preview of upto 4 uploaded images. Internal page to support adding new photos. Any uploaded image image to be resized to 280 * 280. Deleting not mandatory but will be a bonus
  ##### Status: ✅
  #### Functionality
	  - A photo card was create to display the first 4 user photos.
		  - This is displayed conditionally. If a user has no photos, an add photos component is show to allow adding photos
			  - Before upload a functions uses a canvas to resize the image to 280x280px. Once a photo is upload the photos card updates to show the image in one of the 4 photo squares and the card activates a link to the photos page.
	
	  -INTERNAL PAGE: The photos page was created to display all user images. Users can view all their image, add new ones using the add image component, which displays first. Users can also delete their own images.
	  
### Tasks
- preview to show top 3 tasks and status for it. Internal page to show a list of tasks, which when tapped are an input field. When user types in text, it becomes the description of the task. A status checkbox is listed next to it, where user can tap to assign complete status or tap again to revert to incomplete status
  ##### Status: ✅
  #### Functionality
	  - A Tasks card was created to display 3 of the users tasks. If the user has no tasks, a add task component will display. Title is required and description is optional. Once the user adds a task, it is displayed in the task card where users are able to click the title to change the name and use the tick box to set the task to complete/incomplete the task. The task card also has a link to the /tasks page
	  - INTERNAL PAGE:  A tasks page was created to display all user tasks in a column and add news ones. The individual task also haas more options. When the title is clicked, the task expands to allow the user to change the title, add a description and delete the task.

### Clothes
#### Requirement
- Your task is to show a pie chart distribution of which type of clothing was worn how often over a 100% pie chart. E.g if raincoat was worn 200 days out of the 1000, the pie chart would show 20% for raincoat and so on
    ##### Status: ✅
  #### Functionality
	  - A clothes card was created to allow the data to be shown
	  - After an API call got the required json from the server it is run through functions that get the name of each item and how many times it was recorded.
	  - React-chart-js was then used to create a pie chat to be displayed in the Clothes Card


## Extra Info
  - Calling the APIs was blocked by cors so serverless functions were created that allow my proxy to make the API calls, returning the response to the frontend code
  - 3 collections exist in the database: users, photos, tasks along with a storage bucket
  - Hosting is via Netlify utilising serverless functions
  
  
  
## Beyond the brief
-	Dashboard
	- Dashboard: Nav menu integrated into icon
	- Dashboard: User logout in nav
	- Dashboard: Title welcome text is dynamic Good (Morning, Day, Evening)
- News
	- Internal News page: Link to BBC article from the image and date below
- Sports
	- Dashboard SportCard: Get a random sport match for each page load
	- Internal Sport page: Search results are grouped by beaten team
	- Internal Sport page: Search result has extra information
-	Photos
	-	Internal Photos page: Delete photos
	-	Dashboard PhotoCard: Upload photo (When no images present)
- Tasks
	- Internal Task page: Edit task title
	- Internal Task page: Delete tasks
	- Dashboard TaskCard: Add task (When no tasks present)
	- Dashboard TaskCard: Edit task title
	- Dashboard TaskCard: Change task status
-	Other
	-	Internal Pages: Back button leading to /dashboard
	-	Loader element allows refresh of api call when in error state
	-	Transitions using react-reveal are in place
## Caveats

- I used Appwrite for my database and authentication. Unfortunately, it doesn’t natively support logging in with a username, only with an email. To work around this, I implemented a solution where the username is submitted in place of the email field when registering and logging in, a function then  changes it to lowercase and turns it into an email. The user’s actual email address is then saved in the realEmail field within the user collection.