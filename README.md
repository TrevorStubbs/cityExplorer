# Lab 06: Node, npm, and Express

# Project Name

**Author**: Trevor Stubbs
**Version**: 1.0.0 (increment the patch/fix version number if you make more commits past your first submission)

Today, you will begin building an API server, which will provide data for the [City Explorer Application](https://codefellows.github.io/code-301-guide/curriculum/city-explorer-app/front-end/), allowing a user to search for a location, present a Map, as well as interesting information about the area, all using data from APIs that your server will fetch and manage.

## Resources

[Node JS Docs](https://nodejs.org/en/)

[NPM JS Docs](https://docs.npmjs.com/)

[Express JS Docs](http://expressjs.com/en/4x/api.html)

[dotenv Docs](https://www.npmjs.com/package/dotenv)

## Configuration

- `data` directory - with [location.json](https://codefellows.github.io/code-301-guide/curriculum/class-06/lab/starter-code/data/location.json) and [weather.json](https://codefellows.github.io/code-301-guide/curriculum/class-06/lab/starter-code/data/weather.json)
- `.env` - with your PORT. Make sure this file is in your `.gitignore`.
- `README.md` - with documentation regarding your lab and its current state of development. Check the "documentation" section below for more details on how that should look **AT MINIMUM**
- `.gitignore` - with standard NodeJS configurations
- `.eslintrc.json` - with Code 301 course standards for the linter
- `package.json` - with all dependencies and any associated details related to configuration. The dependencies needed for today's lab include: `express`, `cors`, and `dotenv`.
- Note that the `package-lock.json` file is automatically created when dependencies are installed and ensures that future installations of the project use the same versions of the dependencies.

```sh
lab-06-repository
   ├── data
   |     ├── weather.json
   |     └── location.json
   ├── .env
   ├── .eslintrc.json
   ├── .gitignore
   ├── package-lock.json
   ├── package.json
   └── server.js
```

## User Acceptance Tests

### Time Estimate

For each of the features listed below, make an estimate of the time it will take you to complete the feature, and record your start and finish times for that feature:

```markdown
Number and name of feature: ________________________________

Estimate of time needed to complete: _____

Start time: _____

Finish time: _____

Actual time needed to complete: _____
```

Add this information to your README.

### Overview

In labs 6 through 9, you will be building a stand-alone back end which will interact with a static front end. You will request data from a total of six third-party APIs, modify the data as needed, and send the data to the client to be displayed in the browser. In labs 8 and 9, you will be persisting data in a SQL database.

Every day you will have a new partner. You and your new partner(s) will spend the first 45 minutes reviewing each other's code from the previous day and planning out the days work on the whiteboard.

1. Draw the web request response cycle for the task at hand (about 15 minutes).
   1. Document the data flow: identify inputs and outputs for each part of the cycle.
   1. Outline the functions that support this data flow.
1. Do a formal code review of each person's code (15 minutes each).
   1. Open your partner's GitHub Pull Request on your laptop.
   1. Identify an area in the code that:
      1. you don't understand
      1. or seams overly complex
      1. or you see a way to improve
      1. or you want more information on
      1. or you really like or think is interesting
   1. Add kind comments or questions inline using the GitHub review feature.

You will then work independently for the rest of the day, implementing your plan, coding in your own repository, submitting your own pull request.

You will have access to view the code base for the client, but will not be able to modify it in any way.

For this lab assignment, you will convert a location entered by the user into a latitude and longitude, then use those values to request weather information for that location. As your City Explorer back end progresses in labs 6 through 9, you will use the latitude and longitude to request information from other APIs from the same search query.

### Workflow

- We will be using the [Trello](https://trello.com/home){:target="_blank"} project management tool for the duration of this project.
- To maximize your experience with Trello, you should create a free Trello account by clicking on the `Sign Up` button.
- After creating an account, go to the [City Explorer Trello Board](https://trello.com/b/ZmD87LCC){:target="_blank"}, open the "... Show Menu" link, click the "... More" link, and then click "Copy Board". Before you create it, be sure to "Change" from Private to "Public" (and click "Yes, Make Board Public") so your instructional team can see your work. Now, click "Create" to add a copy to your personal account.
- This Trello board contains all of the features required to complete this lab assignment.
- In the Show Menu tab, click the "Search Cards" link and filter by lab to see the assignment for just the current day
- Review the user stories and analyze the feature requests and requirements in the lab.
- Within each story, note the acceptance criteria ("Given ... When ... Then...") and the checklist of feature tasks. Be careful to execute tasks in order as they are often dependencies of one another.
- During the day, check off tasks as you complete them, and move the story cards through the workflow.

### Repository set-up

- You should create a new repository on GitHub called `city_explorer_api`.
- From this point on, work on semantically-named non-master branches. Once your app is functioning correctly on your branch, make a PR to master and confirm functionality on your deployed site. Your deployed site **should not** contain any broken functionality.

### Heroku deployment

- Create an instance on Heroku. Refer to lecture 5 for a reminder of the steps, if needed.
- In the Deploy tab, connect your instance to your repository and enable automatic deploys from your master branch. Deploy your application and make sure there are no errors.

### Feature Tasks

See the Trello board for your feature tasks for today's lab.

## Documentation

_Your `README.md` must include:_

```md

## Overview
This is a site that allows a user to enter in a city and it will return a list of information about the city

## Getting Started
This is the server side program. To use you must go to [City Explorer Front End](https://codefellows.github.io/code-301-guide/curriculum/city-explorer-app/front-end/) and enter in your server info. must start the SQL database to make it work.

## Architecture
This project is build using JavaScript, Node.js, Express, DOTENV, CORS and Heroku.

## Change Log
<!-- Use this area to document the iterative changes made to your application as each feature is successfully implemented. Use time stamps. Here's an examples:

01-01-2001 4:59pm - Application now has a fully-functional express server, with a GET route for the location resource. -->

## Credits and Collaborations
- Andrew Smith

<!-- Give credit (and a link) to other people or resources that helped you build this application. -->

```

## Submission Instructions

1. Complete your Feature Tasks for the lab
1. Create a PR back to the `master` branch of your repository, and merge it cleanly.
1. On Canvas, submit a link to your PR. Add a comment in your Canvas assignment which includes the following:
    - A link to the deployed version of your latest code.
    - A link to your public Trello board.
    - A question within the context of today's lab assignment
    - An observation about the lab assignment, or related 'Ah-hah!' moment
    - How long you spent working on this assignment


## Features

Number and name of feature: Repo Setup

Estimate of time needed to complete: 1 hour

Start time: 15:00

Finish time: 16:10

Actual time needed to complete: 1.2hours

---

Number and name of feature: Location Data Linked

Estimate of time needed to complete: 1 hour

Start time: 16:15

Finish time: 16:50

Actual time needed to complete: 35 minutes

---

Number and name of feature: Weather Data Linked

Estimate of time needed to complete: 30 minutes

Start time: 16:55

Finish time: 18:00

Actual time needed to complete: 1.1 hour

---

Number and name of feature: Error Handling

Estimate of time needed to complete: 1 hour

Start time: 18:00

Finish time: 18:15

Actual time needed to complete: 15 minutes

## Lab 07 - Day 2

- ![Whiteboard layout](images/lab07whiteboard.png)

Number and name of feature: Data Formatting

Estimate of time needed to complete: 30 minutes

Start time: 14:55

Finish time: 15:05

Actual time needed to complete: 10 minutes

---

Number and name of feature: Locations API

Estimate of time needed to complete: 1 hour

Start time: 15:10

Finish time: 15:50

Actual time needed to complete: 40 minutes

---

Number and name of feature: Weather API

Estimate of time needed to complete: 1 hour 

Start time: 16:00

Finish time: 16:30

Actual time needed to complete: 30 minutes

---

Number and name of feature: Trails API

Estimate of time needed to complete: 1 hour

Start time: 17:00

Finish time: 17:50

Actual time needed to complete: 50minutes

## Lab 8 - Day 3

Number and name of feature: Database

Estimate of time needed to complete: 30 minutes

Start time: 16:35

Finish time: 17:00

Actual time needed to complete: 25 minutes

---

Number and name of feature: Server

Estimate of time needed to complete: 1 hour

Start time: _____

Finish time: _____

Actual time needed to complete: _____

---

Number and name of feature: Deploy

Estimate of time needed to complete: 30 minutes

Start time: _____

Finish time: _____

Actual time needed to complete: _____

## Lab 09 - Day 4
- ![Whiteboard layout](images/cityexplorerDay9.png)

Number and name of feature: Movies API

Estimate of time needed to complete: 1 hour

Start time: 14:00

Finish time: 14:45

Actual time needed to complete: 45 minutes

---

Number and name of feature: Restaurants API

Estimate of time needed to complete: 1 hour

Start time: 15:00

Finish time: 16:00

Actual time needed to complete: 1 hour

---

Number and name of feature: Pagination of restaurants

Estimate of time needed to complete: 1 hour

Start time: 16:00

Finish time: 17:00

Actual time needed to complete: 1 hour