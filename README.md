# I10erary

## INTRODUCTION
Welcome to I10erary!

I10erary is a vacation-planning web app that allows users to plan out a day-by-day itinerary of their vacations. Upon creating an account, users can save their custom-made itineraries as well as add their own attractions and destinations to the database.

This program is a joint creation of Anna Reed and Chris Torres, created during our education at the Flatiron School.

[Demo Video here](https://www.youtube.com/watch?v=PDpr0DuhOuQ&t=36s)

## INSTALL/OPEN INSTRUCTIONS
1. Clone this directory to your device.
2. From your terminal, cd into the directory.
3. In your terminal, enter the following
    - cd project-backend
    - bundle install
    - rails db:migrate
    - rails db:seed
    - rails s
    - cd ..
    - open project-frontend/index.html

## USAGE INSTRUCTIONS
1. Click "Sign Up" and enter your desired username and e-mail address to create an account.
![/signup-gif.gif](/signup-gif.gif)

2. If your account was created without errors, click "Log in" and enter your new credentials.
![/login-gif.gif](/login-gif.gif)

3. To begin planning a new vacation, scroll through the list of destinations on the left of the screen and choose the one you plan on visiting.
![/selectdestination.gif](/selectdestination.gif)<br>
**Note:** If your desired destination isn't already on the list, you can add it by clicking on the "+" on the bottom of the list.

4. Set your vacation to the desired number of days using the "+" and "-" buttons on the top right of the window.
![/adddays.gif](/adddays.gif)

5. On the bottom of the window, there is a list of attractions at or near your destination city. Scroll through them and add any desired ones to your vacation.
![/selectattraction.gif](/selectattraction.gif)<br>
**Note:** As with destinations, you can add missing attractions by clicking the "+" button on the right of the list.

6. Once an attraction has been added to your itinerary, you can use use the arrow buttons to change the day you will be visiting it on, or the "-" button to take it off of your itinerary.
![/movevisits.gif](/movevisits.gif)

7. To view and/or edit previously-created itineraries, click on the "My Vacations" button while logged in.
![/viewvacations.gif](/viewvacations.gif)


## TECH STACK

Front end:
- Javascript
- HTML

Back end:
- Ruby on Rails
- ActiveRecord
- SQLite