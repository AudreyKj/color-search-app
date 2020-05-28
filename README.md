# COLOR SPOT - React app with color API and data visualization

In this React app, users can detect the colors in images as well as save and categorize color palettes. <br />An "admin" page visualizes (made with chart.js) the data from the users using the app. <br />

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

-   Add auth with Google Sign-In
-   Automate sending of emails to enable users to reset their password
-   Add more features to the "SAVED PALETTES" section

## Visuals

![screenshot](readMe/screenshot_1.png)
![screenshot](readMe/screenshot_2.png)
![screenshot](readMe/screenshot_data.png)
![screenshot](readMe/screenshot_3.png)
![screenshot](readMe/screenshot_4.png)

<p align="center">
<img width="400" height="570" src="readMe/mobile.png">
</p>
