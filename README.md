# Community Application

## Requirements 
Need MySQL Server with `community-app` schema 

## Build Scripts
1. `$ npm run build` - script which create application build
2. `$ npm run full-build` - script which install application dependencies and create application build
3. `$ npm run start` - script which create application build and run build
4. `$ npm run full-start` - script which install application dependencies and create application build and run build

## Auto Rebuild Mode
To launch 'auto rebuild' mode add the line "watch: true" in webpack.dev.js file on server side