/*


presentation

APP --> color spot, aims for color research, could be suitable
for designers, creatives

how i had the idea: find inspiration for color schemes for apps
find original color scheme, image can serve as inpsiration
stumbled upon color api color thief and decided to make an app

deployed on heroku (color.space) but there is still one
feature that i want to add before I released

- facebook + github auth
- projects section: add project to organize color schemes where
there users can save notes and image moodboard, research colors
with color picker

user journey:
homepage: topbar with options (material ui for the styling)

not logged:
color spotter
shared palette
saved -> cannot save Palettes

admin -> protected by pw -> showing data dashboard with info
on the users

user need to be loggedIn to save palettes and grow collections

AUTH
- REGISTER / LOGIN
use custom hook useStateulFields:
on change, set value of e.target.values in state
- Register: custom errors at the front and the back

- via google sign in
- google-login component:
--> for new users, adding token + username + type "Google" in database

- function passed as props: updateLogged + updateGoogleLogged that enable
to track if user is logged in -> login and register compo use those function
when the user logs in / register

COLOR SPOTTER
- color thief api
- user uploads image (drag/drop or upload)
- returns color palette
for react: api works with Dropzone and Palette component
-> put data return in state and then map through it to render colors

-> if user loggedIn:
can save palette >> go in separate database
confirmation message

SAVED
- displays saved palette tag + palette
- filter by tag name >> request to database

share button: confirmation/error message
database of saved palettes updated
palette displays in SHARED: tag name + user name

PROFILE
- edit profile + delete account

ADMIN
- data dashboard protected
- access using session storage
- gender / country / age from user profiles 




















*/
