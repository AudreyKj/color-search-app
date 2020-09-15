# React app with color API and data visualization

React app where users can detect the colors of images as well as save and categorize color palettes. <br />
An "admin" page (made with chart.js) visualizes data from the app's users. <br />

all the components have been unit-tested with Jest and React Testing Library.

API used: color-thief by Lokesh Dhakar

[visit live app](https://color-spot.space)

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
-   share color palettes
    <br />
-   admin page that visualizes data about the the app's users (made with chart.js)(protected by password)
    <br />
-   delete account
    <br />
-   logout

<br /> all the components have been unit-tested with Jest and React Testing Library.

## Tech

**Stack**: SASS/SCSS, JavaScript, React, Node.js, PostgreSQL, chart.js, material-ui, Google Sign In, Google Analytics<br />
**Protection**: CSURF <br />
**Testing**: React Testing Library + Jest | **Deployment**: Heroku

## Future improvements

-   Add "Projects" section where users can categorize projects + research ideas
-   Add color picker (Swatches)
-   Automate sending of emails to enable users to reset their password
-   Develop mobile app with React Native

## Visuals

![screenshot](readMe/img1.png)
<br />
![screenshot](readMe/img2.png)
<br />
![screenshot](readMe/img3.png)
<br/>
![screenshot](readMe/screenshot_3.png)

<p align="center">
<img width="300" height="595" src="readMe/mobile.png">
</p>
