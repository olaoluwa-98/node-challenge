# Node Challenge

Take home test for Node.js developers.

## The challenge

This challenge has been designed to measure your knowledge of Node.js, Express, Typescript and various technologies, like monorepos, databases and testing. For your exercise, you will be enhancing this API which serves as the backend for the Pleo app. Whenever a user of the app navigates to the expenses view, it calls this API to collect the list of expenses for that user.

Your objective is to write this new route to fetch the list of expenses for a given user. Right now that domain is empty, so you'll have to build everything from scratch- but you can look over at the user domain for inspiration. Additionally, we would also like you to write some tests for your route.

Finally, as a bonus objective, try to improve any aspect of this API. It could be to add more TS types, tests, add features, graphql support, etc.

## My Thought Process

Here's a chronological order in which I worked on this challenge.

- I started by inspecting the sql dump file to know what the tables look like. I first noticed there was no primary key so I added that in the dump file.
- I proceeded to validate uuid so instead of returning a db error, the client can be told to use a valid uuid which would be a better experience
- I moved a utility function (to utils domain) that would otherwise be duplicated in user and expense domains
- I setup models, formatter & types for expense domain based on the already existing structure in user domain to maintain consistency
- I setup the route for the expenses domain
- Upon running tests, there was a bug in `config-injector` so I removed the line causing it
- I setup utility functions for testing the user and expense domains. These required creating/destroying table/data
- I wrote test that handles success, error and empty states for the user and domain routes
- I corrected some typos I came across in the root test folder
