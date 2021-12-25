# TravtorApp [![Netlify Status](https://api.netlify.com/api/v1/badges/2a368341-a59e-4bd0-8408-dbe2b1d26a13/deploy-status)](https://app.netlify.com/sites/gallant-clarke-28cac0/deploys) [![Tests-CI](https://github.com/shant24k/Travtor-test-application/actions/workflows/main.yml/badge.svg)](https://github.com/shant24k/Travtor-test-application/actions/workflows/main.yml)

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.1.2. Bootstarp 5 & CSS flexbox used to make this application responsive for all devices. It's Car Rental todo application built with mock data.

To run project online on stackblitz you can user URL: https://stackblitz.com/github/shant24k/Travtor-test-application 

## CI/CD

This application integrated with two github pipelines Build & Test which checks for any push, pull-request to main branch.

This application deployed on Netlify with host URL: https://gallant-clarke-28cac0.netlify.app 

And also autodeployment is enabled for the main branch. So, that any successful commits to main branch will trigger the deployment and thanks to Netlify  gets publishd & live in few minutes.

Deployment logs can be traced here: https://app.netlify.com/sites/gallant-clarke-28cac0/deploys

For each commit github actions pipeline logs can be traced under Actions tab of this repository i.e. https://github.com/shant24k/Travtor-test-application/actions

## State Management (NgRX)

NgRx store is used in application to share data across different pages, components of application.

## Internationalisation (i18n)

ngx-translate module used to integrate i18n in this app. It's offered in 3 languages en, es, de. The translations `.json` files can be found under assets folder

## Accessibility (a11y)

Application uses bootstrap components whereever possible and also most of the places proper HTML tags used so that website is accessible.

## Test Coverage

Used Jasmine, Karma to write unit tests for the developed functionality. Achieved 85%+ coverage on different sections e.g. Statements,Branches, Functions, Lines. (Angular makes use of Istanbul to calculate coverage & generate visiual coverage report).

You can check the coverage % by locally running command: `ng test --code-coverage`

## Information on Locally running this application

#### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

### Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
