
![LeagueMastery](https://raw.githubusercontent.com/ahmj/LeagueMastery/master/public/assets/chest.png) 

# League Mastery 
https://leaguemastery.herokuapp.com/

**League Mastery** is an application to provide suggestions on optimizing the chances of earning a Mastery Chest. Our application analyzes specific factors on every champion for the given summoner deriving a computed score. The factors consist of the highest grade achieved, champion mastery level and overall Champion win rate provided to us by the Champion.GG API.  

**League Mastery** is the entry for the  [Riot Games API Challenge 2016](https://developer.riotgames.com/discussion/announcements/show/eoq3tZd1), Usability/Practicality Category. By providing a curated selection of champions with "cheat-sheets" that include skill builds, recommended starting items and final items we focus on providing a simple yet packaged experience for players.

## Development

1. Clone this repo.
2. Run `npm install` to install the dependencies
3. Create a `.env` file with the following information
    + `API_KEY=<RIOT DEVELOPER KEY>`
    + `GG_KEY=<CHAMPION.GG DEVELOPER KEY>`
4. Run `node app.js` to start the app

## Documentation
### Tasks
When the app launches we first initialize and run the tasks specified within `tasks.js`. Currently, the tasks serves to fetch
and copy the JSON static files from three endpoints, Champion static data from the Riot API, Champion statistics information from the Champion.GG API, and specific build and item information provided from the Champion.GG api. These JSON files are only ever changed when a patch occurs so it is recommended to wipe the `/data/json/` folder a few days after the patch lands which ensures both the Riot API and Champion.GG API are updated to reflect the changes.

Note: Due to stability issues with the Champion.GG API we have included JSON files for the current patch (6.9)
### API

Inside `api.js` you will find the mastery route for the application. The function calls the Riot API mastery endpoint for the specified summoner to fetch the champion mastery data. Afterword’s we calculate the score as well as use the JSON files fetched by our tasks function to assemble and build the final product which will used within our frontend system.

An example call found here:
http://leaguemastery.herokuapp.com/api/mastery/thegozaq/na

### Score
The application uses three different factors and computes a score for each of the champions on a given summoner. We use the computed score to create suggestions for the summoner. The three factors used are:

+ The highest grade achieved on the champion
    + The hextech system grants mastery chests if the summoner achieves an S rank, with this in mind we designed to exponentially increase the score as you enter a new grade range (i.e. A- to A+ can provide a value of between 23-28pts while an S- to S+ can provide 48-53pts). 
    + A grade which is less then C+ or unknown grades are scored starting at a value of -10. We determined that having a low grade should be less emphasized as it shows a lack of expertise. Although an unknown grade does not mean the summoner struggles with the champion, it could very well mean the opposite but the risk involved may defeat the purpose of the design
    + One of our design decisions is to not include any statistical information provided from previous games played by the champion. Because mastery crates are determined by a grade, and there is no concrete knowledge on how grades are calculated we determined that analyzing factors such as CS, or K/D ratios may increase inaccuracies.
+ The current Champion.GG win rate on a given champion
    + This factor provides us insightful feedback for how the champion is performing on the given patch. Playing current "meta" champions is an important factor that we value when it comes to achieving greater results.
    + The win rate of a champion is applied to a factor, currently set at 300. This gives champions +3 pts for every           percent increase. When considering our previous factor of highest grade a champion with a grade of A+ can outrank an S-     if the difference in win percentage is at least 3%.
+ The champion mastery level on the champion
    + Finally, the champion mastery level is also an important factor to consider. Champion mastery levels define how familiar summoners are when playing with a certain champion. This is not to be confused with how well a player utilizes the champion! 
    + This is calculated by multiplying the champion level by 2. This creates a range from 2pts as a level 1 to 10 pts as a level 5, which provides an edge for champions that are more familiar to the summoner.
    
    To illustrate the relationship between the champion grade and mastery level the provided graph will visualize the distribution of points. 
![LeagueMastery](https://raw.githubusercontent.com/ahmj/LeagueMastery/master/public/assets/graph.png) 

    These factors are the basis for how the application determines suggestions for summoners. In the end although we can provide summoners the road map to earn mastery chests, it is up to them to excel and achieve the required S rank.

## Special Thanks
+ Matviy K.
+ Kevin L.
+ Riot's Developer Community
+ Champion.GG API Team

### Disclaimer 
League Mastery isn't endorsed by Riot Games and doesn't reflect the views or opinions of Riot Games or anyone officially involved in producing or managing League of Legends. League of Legends and Riot Games are trademarks or registered trademarks of Riot Games, Inc. League of Legends © Riot Games, Inc.
