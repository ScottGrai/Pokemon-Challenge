## Setup

Project requires the latest Long Term Support version of Node.js, the current version of which is 18.17.1.
[Download the latest LTS versio no Node.js from here](https://nodejs.org/en/download)

Next you must install relevant dependencies using Node Package Manager (NPM).
* Navigate to the root directory (this directory is the one that contains the evolutionChain.ts and the package.json).
* Run the command "npm install"

## Running the App

Once setup is complete the app can be run in two ways:
* From the root directory run the command "node evolutionChain".
* From the root directory run the debug script by running the command "npm run debug".
  * This will use nodemon to start a version of the app that stays running and auto-restarts when a change is detected.
  * This will also allow a debugger to be attached via the specified port (8080 in this case).

## Deployment
TODO - Basic script frame has been implemented but not fully setup.