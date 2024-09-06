# HomeLLC Assestment

## Setup

1. ```git clone https://github.com/<username>/full_stack_assessment_skeleton.git```
2. Start the MySQL Server `docker-compose -f docker-compose.final.yml up --build -d`
3. Start the Backend Server, Navigate to ./backend folder and run `npm install` run `npx prisma generate` and then run `npm run dev`
4. Start the Frontend Server, Navigate to ./frontend folder and run `npm install` and then run `npm run dev`
5. Goto "http://localhost:5173" and try the Application

   
- This exercise is designed to test basic skills in 3 core areas:

1. [SQL databases](#1-database)
2. [React SPA development](#2-react-spa)
3. [Backend API development on Node](#3-backend-api-development-on-node)

## 1. Database

### Solution

1. 99_file_db_dunp.sql file is used for normalization of the Data given into 3 tables(users, homes, user_interests)
2. Users table will contain only the users details (username:string & email:string)
3. Homes table will contain details (street_address:string , state:string, zip:string, sqft:float, beds:integer, baths:integer, list_price:float)
4. Finally user_interests table is used to map the details of users with the homes, Users and Homes will have a many-to-many relationship and will only have (user_id referencing the user's table's(primary key)) and home_id(referencing the homes tables' primary key) and both of these(user_id and home_id are the foreign keys in user_interests table)
5. The Nomralization of the data was performed
   a. For users table by selecting distinct usernames and emails from the initial table(user_home)
   b. For homes table by selecting distinct addresses, zip, state, beds, etc from the initial table(user_home)
   c. Finally for the user_interests table(mapping) was established by performing a join operation of users table with initial table and again with the homes table the intersection of the three would result in the maping of users and homes
   

## 2. React SPA

### Solution
  1. A Simple React with Typescirpt project was initialized
  2. Used useEffect() hook for API request pulling from the Backend
  3. Loading feature is added when the API request is sent and awaiting for the response
  4. Card Component was used to render the homes details on the frontend after API response
  5. Used Axios library for API calls
  6. Used Simple Bootstrap components
  7. UI is working as expected and bug-free

## 3. Backend API development on Node

### Solution

1. Express was used to design the Backend
2. PrismaORM was used along with Typescript and schema fetching was done directly from the MySQL server link : ("mysql://db_user:6equj5_db_user@localhost:3306/home_db")
3. All the APIs mentioned above have been implemented using PrismaORM tested and working as expected
  
