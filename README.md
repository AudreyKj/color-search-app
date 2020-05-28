# COLOR SPOT - React app with color API and data visualization

In this React app, users can detect the colors in images as well as save and categorize color palettes. An "admin" page visualizes the data from the users using the app. <br /><br />

API used: color-thief by Lokesh Dhakar

[visit live app](https://color-spot.herokuapp.com)

## Features

-   drag and drop an image to detect its colors using color-thief API
    <br />
-   save color palettes and categorize them with tags (only for logged in users)
    <br />
-   filter saved color palettes by tag (only for logged in users)
    <br />
-   admin page where users can visualize data about the the app's users (made with chart.js)
    <br />
-   login/ register (password hashed with bcrypt)
    <br />
-   create & update profile
    <br />
-   delete account & all associated info
    <br />
-   logout

## Tech

**Stack**: HTML, CSS, JavaScript, Node with Express.js, PostgreSQL <br />
**Protection**: CSURF <br />
**Testing**: React Testing Library + Jest <br />
**Framework**: React | **Deployment**: Heroku

## Future improvements

-   Adding auth with google with Google Sign-In
-   Automate sending of emails to enable users to change their password if they don't remember it

## Visuals

![screenshot](readMe/screenshot_2.png)
![screenshot](readMe/screenshot_1.png)

<p align="center">
<img width="300" height="550" src="readMe/mobile.png">
</p>
