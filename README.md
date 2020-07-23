# React app with color API and data visualization

React app where users can detect the colors of images as well as save and categorize color palettes. <br />
An "admin" page (made with chart.js) visualizes data from the app's users. <br />

API used: color-thief by Lokesh Dhakar

[visit live app](https://color-spot.herokuapp.com)

## Features

-   drag and drop/upload image to detect its colors using color-thief API
    <br />
-   login/ register (password hashed with bcrypt) or with Google Sign In
    <br />
-   create & update profile
    <br />
-   save color palettes and categorize them with tags (only for logged in users)
    <br />
-   filter saved color palettes by tag (only for logged in users)
    <br />
-   admin page that visualizes data about the the app's users (made with chart.js)(protected by password)
    <br />
-   delete account
    <br />
-   logout

## Tech

**Stack**: SASS/SCSS, JavaScript, React, Node.js, PostgreSQL, chart.js, material-ui, Google Sign In<br />
**Protection**: CSURF <br />
**Testing**: React Testing Library + Jest | **Deployment**: Heroku

## Future improvements

-   Add color picker (Swatches)
-   Automate sending of emails to enable users to reset their password
-   Develop mobile app with React Native

## Visuals

![screenshot](readMe/screenshot_2.png)
![screenshot](readMe/screenshot_1.png)
![screenshot](readMe/screenshot_3.png)
