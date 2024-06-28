This is the IdeaSite website where one can post their ideas and can also see all the ideas posted by other users.

# About this repo
This is the monorepo for two other separate repos - [Ideasite-frontend](https://github.com/simonsd054/IdeaSite-frontend) and [IdeaSite-backend](https://github.com/simonsd054/IdeaSite-backend).
As they have been mixed into one now, the other repos are not updated. This repo is the one reflecting the latest change.

# Pre-requisites

Make sure these are installed on your machine

1. Docker
2. MongoDB

# How to run the app

1. Clone this repo
2. Create .env files in frontend and backend folder
3. Copy the environment variables from .env.sample and provide your own values
4. Make the run.sh and stop.sh files executable  
   `chmod +x run.sh stop.sh`
5. Run run.sh  
   `./run.sh`
6. If you want to stop, run stop.sh  
   `./stop.sh`
