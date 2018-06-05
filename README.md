## Installation

1. `Install Mysql`
2. `cd community-app`
3. `npm install`
4. `npm run build`
5. `cd server`
6. `npm install`
7. create Database Schema `community-app`
8. run `npm start` in server folder. That will create all tables and connections in Database by [sequelize](http://docs.sequelizejs.com/)
9. Import into database files `*.sql` from `server/scripts` folder in following order: (1-userRoles, 2-Users, 3-Roles) **Order is important!**
