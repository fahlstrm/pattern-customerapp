[![CircleCI](https://circleci.com/gh/fahlstrm/pattern-customerapp/tree/master.svg?style=svg)](https://circleci.com/gh/fahlstrm/pattern-customerapp/tree/master) [![codecov](https://codecov.io/gh/fahlstrm/pattern-customerapp/branch/master/graph/badge.svg?token=ZX8X4JFRRW)](https://codecov.io/gh/fahlstrm/pattern-customerapp)

# Customerapp
This repository is part of a group project done for the ['pattern' course](https://www.bth.se/utbildning/program-och-kurser/kurser/20232/BR4QJ/) at Blekinge Institute of Technology.

Customerapp is developed using Angular framework. 
Note that the application is based on [pattern-backend](https://github.com/datalowe/pattern-backend)-repo as backend, without this repo the application might not work as expected. The master-repo can be found here: [orchestra](https://github.com/datalowe/pattern-orchestra)

To clone the repository run: `git clone https://github.com/fahlstrm/pattern-customerapp`

## Developer mode
Run `npm install` to get required dependencies. Angular CLI is required, install it using `npm install -g @angular/cli`. Once Angular CLI is installed one can create new components, services using `ng xxx`. 
To start the application run `npm start`. The application can be opened in browser using localhost:4200

## Build and run
The repo includes a Dockerfile so the application can run without further installations once cloned.

Build the docker image using `build -t customerapp-pattern:latest .` and run `docker run –rm -it -p 4200:80 customerapp-pattern:latest` to start the application.

4200 can be changed to arbitrary port, but it is important to use port 80 due to the Dockerfile using nginx as headless browser and nginx listens on port 80.

## Testing
Tests using Karma/Jasmine can be run using the command `ng test`. You will see the test results in the terminal window and in a headless browser window. Using the flag `--code-coverage` will save a code coverage report in html and lcov formats in the root folder /coverage.

Configuration files for CircleCI and Codecov are included in the repository. Setup for CircleCi and Codecov might be needed externally. 

Use `ng lint` to run ESLint in the project folder.


