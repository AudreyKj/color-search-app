/* HOME */
header {
    width: 100%;
    height: 80px;

    display: flex;
    justify-content: center;
    text-align: center;

    margin-bottom: 30px;
    position: fixed;
    background-color: #212121;
}

@media (max-width: 550px) {
    header {
        height: 200px;
    }
}

@media (max-width: 400px) {
    header {
        height: 230px;
    }
}

@media (min-width: 1900px) {
    header {
        height: 120px;
    }
}

div.title {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
}

img.logo {
    width: 20px;
    height: auto;
    margin-right: 10px;
}

div.menu {
    position: absolute;
    right: 20px;

    display: flex;
    justify-content: center;
    flex-wrap: wrap;
}

@media (max-width: 770px) {
    div.menu {
        position: relative;
        margin-left: 30px;
    }
}

a,
a:hover,
a:active {
    color: #333;
    text-decoration: none;
}

a.link-header,
a:hover,
a:active {
    color: #fff;
    text-decoration: none;
}

/* COLOR SPOTTER */
div.color-graber {
    margin-bottom: 80px;
}

span.graber_instructions {
    text-align: center;
    font-size: 1.5rem;
    margin-bottom: 15px;
}

@media (max-width: 700px) {
    span.graber_instructions {
        font-size: 1.2rem;
    }
}

div.palette {
    width: 100%;
    display: flex;
    flex-direction: column;
}

div.saved_palettes_container {
    width: 100%;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    margin-bottom: 100px;
}

span.color-name {
    margin-top: 10px;
}

div.graber-container {
    list-style-type: none;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    padding: 0;
    width: 100%;
}

@media (max-width: 500px) {
    div.graber-container {
        justify-content: flex-start;
    }
}

div.color {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}

ul {
    display: flex;
    display: flex;
    justify-content: center;
}

li {
    width: 150px;
    height: 150px;

    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #cccccc8c;
}

@media (max-width: 1200px) {
    div.palette-save {
        margin-top: 45px;
    }
}

form.color-spotter {
    display: flex;
    justify-content: center;
}

@media (max-width: 500px) {
    form.color-spotter {
        display: flex;
        justify-content: center;
        flex-direction: column;
    }
}

span.save {
    display: inline-block;
    vertical-align: top;
    font-size: 1.3rem;
    letter-spacing: 0.04em;
    min-width: 1.5em;
    color: #333;
    border: 1px solid #333;
    text-transform: uppercase;
    margin-top: 10px;
    margin-bottom: 10px;
    margin-left: 10px;
    padding: 0.4em 0.6em 0.4em;
    cursor: pointer;
}

@media (max-width: 500px) {
    span.save {
        margin-left: 0;
    }
}

span.palette_saved_confirmation {
    font-size: 1.3rem;
    margin-top: 10px;
}

div.palette-save {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 40px;
}

div.color-graber {
    width: 80%;
}

@media (max-width: 600px) {
    div.color-graber {
        width: 90%;
    }
}

p.drop-graber {
    padding: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    font-size: 1.5rem;
    line-height: 1.2;
    margin-bottom: 30px;
    cursor: crosshair;
    box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2),
        0px 4px 5px 0px rgba(0, 0, 0, 0.14),
        0px 1px 10px 0px rgba(0, 0, 0, 0.12);
}

@media (min-width: 1900px) {
    p.drop-graber {
        font-size: 1.7rem;
    }
}

/* SAVED PALETTES */
div.saved_instructions {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 80%;
}

div.filtering {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-top: 15px;
    margin-bottom: 35px;
}

div.filter-part {
    display: flex;
    flex-direction: column;
    align-items: center;
}

form.form-filter {
    display: flex;
    align-items: center;
    justify-content: center;
}

@media (max-width: 400px) {
    form.form-filter {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
}

span.no-match {
    margin-top: 15px;
    font-size: 1.3rem;
}

.filter-button {
    display: inline-block;
    vertical-align: top;
    font-size: 1.3rem;
    letter-spacing: 0.04em;
    min-width: 1.5em;
    color: #333;
    border: 1px solid #333;
    text-transform: uppercase;
    margin: 0.5em 0.5em;
    padding: 0.4em 0.6em 0.4em;
    cursor: pointer;
}

span.filter_title {
    font-size: 2rem;
    margin-bottom: 5px;
}

@media (max-width: 750px) {
    span.filter_title {
        font-size: 1.5rem;
    }
}

div.saved-palette-container {
    display: flex;
    /* flex-direction: column; */
    width: 100%;
    height: 100%;
    justify-content: center;
    margin-bottom: 20px;
}

div.color-palette-save {
    display: flex;
    align-items: center;
    border: 1px solid #cccccc8c;
    padding: 20px;
    border-radius: 6px;
}

div.single-color {
    width: 150px;
    height: 150px;

    display: flex;
    align-items: center;
    justify-content: center;
    border: 0.5px solid #cccccc8c;
}

div.saved_color {
    text-align: center;
}

div.palette-options {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-right: 15px;
}

button.share {
    display: inline-block;
    vertical-align: top;
    font-size: 0.9rem;
    letter-spacing: 0.04em;
    min-width: 1.5em;
    color: #333;
    border: 1px solid #333;
    text-transform: uppercase;
    margin: 0.5em 0.5em;
    padding: 0.4em 0.6em 0.4em;
    cursor: pointer;
}

span.color-palette {
    text-align: center;
}

/* AUTH */
div.auth-login,
div.auth-register {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 80px;
}

div.auth-google {
    display: flex;
    justify-content: center;
}
form.auth {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
    font-size: 1.5rem;
}

label {
    display: block;
    margin-bottom: 10px;
}

input {
    padding: 10px;
    font-size: 1.3rem;
    background-color: #f3f3f3e0;
}

button.submit {
    display: inline-block;
    vertical-align: top;
    font-size: 1.3rem;
    letter-spacing: 0.04em;
    width: 100%;
    color: #333;
    border: 1px solid #333;
    text-transform: uppercase;
    margin-top: 10px;
    margin-bottom: 5px;
    padding: 0.4em 0.6em 0.4em;
    cursor: pointer;
}

span.error {
    text-align: center;
    font-size: 1.3rem;
    line-height: 1.2;
    color: red;
}

div.error-conf-messages {
    margin-top: 20px;
    text-align: center;
}

span.confirmation {
    font-size: 1.5rem;
}

/* INFO */
p.info {
    width: 40%;

    font-size: 1.5rem;
    line-height: 1.2;
    margin-top: 0;
}

@media (min-width: 1900px) {
    p.info {
        font-size: 1.6rem;
    }
}

.underline {
    text-decoration: underline;
}

span.title {
    font-size: 1.5rem;

    text-align: center;
}

@media (max-width: 700px) {
    span.title {
        font-size: 1.2rem;
    }
}

div.info-wrapper {
    width: 100%;
    display: flex;
    justify-content: center;
    color: #333;
    margin-bottom: 80px;
}

@media (max-width: 1200px) {
    p.info {
        width: 80%;
    }
}

@media (max-width: 1200px) {
    p.info {
        width: 90%;
    }
}

div.shared-container {
    margin-bottom: 50px;
}

/* PROFILE */
div.profile {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 100px;
}

form.profile {
    display: flex;
    flex-direction: column;
    font-size: 1.5rem;
    margin-bottom: 10px;
}

.profile-input {
    margin-left: 10px;
    margin-right: 5px;
}

/* ADMIN: CHARTS */
div.admin-page {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
}

div.admin-auth {
    display: flex;
    flex-direction: column;
    font-size: 1.3rem;
    margin-bottom: 20px;
    text-align: center;
    padding-left: 20px;
    padding-right: 20px;
}

input.admin-auth {
    margin-left: 15px;
    margin-top: 15px;
}
h1 {
    text-align: center;
    width: 80%;
    font-weight: 300;
    display: block;
}

@media (max-width: 700px) {
    h1 {
        text-align: center;
        width: 60%;
        font-size: 1rem;
    }
}

div.chart {
    display: flex;
    padding-top: 40px;
    align-items: center;
    justify-content: center;
    width: 100%;
    min-height: 100%;
    margin-bottom: 80px;
}

@media (max-width: 1000px) {
    div.chart {
        flex-direction: column;
    }
}

div.single-chart {
    padding-right: 30px;
}

/* FOOTER */
footer {
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    height: 40px;
    width: 100%;
    display: flex;
    align-items: center;
    color: #333;
    justify-content: center;
    box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.9),
        0px 4px 5px 0px rgba(0, 0, 0, 0.14),
        0px 1px 10px 0px rgba(0, 0, 0, 0.12);
}

@media (max-width: 350px) {
    footer {
        height: 50px;
    }
}
