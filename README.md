# Project Name
NBA Teams and their Draft Picks

## Description
Jonathan Lao's submission for the NBA's assessment for Senior CIAM Engineer

## Github Repository
https://github.com/jonathanlao/nba.git

## Installation / How to run

If you use `asdf`, simply run `asdf install`.
Otherwise, make sure you have [nodejs 20.18.0](https://nodejs.org/en/download/package-manager) installed locally.

Then install local dependences via:
`npm install`

To run:
`npm run start`

Output will generated in an `output.txt` file in addition to being printed to the console.

## Testing
Run tests via:

`npm run test`

## Notes / Assumptions / Explanation of Approach
- For the purposes of the assignment, I share my API Key in the `.env` file, though obviously that would not typically be shared
- The output can be found in the `output.txt` file
- I assume that all the output should contain all players for all teams throughout NBA history (at first I thought the assignment was asking for this information for players that are currently active, but the `/players/active` endpoint is not available for the free API key tier.)
- I include all teams form the `/teams` endpoint, including now defunct teams, which leads to some slightly odd data like two entries for the 'Denver Nuggets'
- I chose to fetch all players on a team by team basis. I try to parallelize these calls as much as possible, but because you can only fetch 100 players at a time, and the free tier API key is rate limited at 60 requests per minute, I built in a retry mechanism that that retries after 1 minute if an API call receives a 429 response. This means if the API key is ever upgraded, the code still should still work, but faster!

## Areas of Future Improvement
- I only gracefully handle a 429 error code in order to build a retry mechanism. The API documentation lists all possible error codes, but I handle all of them generically by just throwing an error and ending the script.
- The tests cover a few basic scenarios, but there is definite room for more elaborate fixtures.
- I output the data to the console and to a text file. Given that this is a TypeScript nodejs project, I initially considered outputting this as html, but decided against that for simplicity.
