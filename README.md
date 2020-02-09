# recipe-keeper

Recipe-keeper, officially known as Crave Recipes, is a web application for people who like to cook and bake. The user can search for recipes based on keywords like "cookies" or "mexican" to find new recipes by type of food or cuisine. They can also submit new recipes to our database. For features such as saving recipes and adding personal notes to the recipes, they can sign up for a free account and save as many recipes as they like!

![crave image](https://user-images.githubusercontent.com/23327932/74110747-f1369680-4b43-11ea-8022-7b7e27316311.png)

![image](https://user-images.githubusercontent.com/23327932/74110789-48d50200-4b44-11ea-9368-4886e6d77e2f.png)

## Tech/framework

Crave Recipes is a Node/Expressjs app. The database is a MySql relational type and we used Sequelize as the ORM. Passport serves as the library for authentication, using bcrypt to hash the passwords. Handlebars serves the front end and Bulma provides most of the styling. 

## How to use

To use the app simply go to:

https://safe-journey-98572.herokuapp.com/

You will be served three random recipes on the home page. Click on a recipe to read the details. Use the search bar to search for other recipes by keyword. Sign up to take advantage of more features. Once you are logged in, you will have a dashboard which will show you all your saved recipes. Use the search bar in the dashboard to find more recipes and click "save recipe" to save them. In the detailed recipe view, click to add or edit a personal note regarding the recipe. 

## Known issues

Its currently not possible to remove recipes from your saved recipes. There is a link, but it is not active.

## Installation (for developers who wish to contribute)

First clone the github repository to your computer. Then in the terminal of the root directory type:
>npm i

Help us make the app even better by shooting us a pull request!

## Credits and References for Libraries and APIs included

NPM libraries: 

Bulma, sequelize, mysql2, mysql, express-handlebars, passport, passport-local, express-session, express, bcrypt.

APIs: 

Thank you to the Spoonacular API which provided the recipes for the database. 

Developers:

This app was built by The Overachievers for our UCLA Coding Bootcamp Project 2. The team includes me, Meg Meyers on backend/database, Kory Friedman on authentication/sessions, and Miguel De Los Santos on design/frontend.

## Motivation

This app is for educational purposes only. And we had a lot of fun building it!!! 