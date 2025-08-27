# Learn and master GraphQL with Node and React by building real production ready applications

## What you'll learn

Learn what is GraphQL and how it compares to REST
Learn how to build a GraphQL API
Learn the best practices designing a GraphQL API
Learn how to build multiple projects with GraphQL
Build a full React, Node and GraphQL Application

## Description

This course will teach you how to build a GraphQL API from absolute scratch. It is taught by a developer that has over 3 years of experience with GraphQL and has worked with it in multiple enterprise companies. By the end of this crash course, you will become an expert and know more than 99% of GraphQL hobbyists. This course isn't just aimed to teach you GraphQL, but how to properly utilize it in a real application. I hope you enjoy it!

We will be learning everything from scratch and thus you can be a GraphQL beginner to take this course. However, we will be using JavaScript as our primary language and thus some JS knowledge is ideal. We will also connect our server to the frontend and we will be using React as our client. Thus any frontend knowledge would be good but not unnecessary.

This course will teach you:

- What is GraphQL

- What are the benefits of GraphQL

- Learn GraphQL terminology

- How to build a GraphQL server

- Modern design principles

- Adding Authentication

- Working with Prisma v3 to interact with a Postgres DB

- Connecting GraphQL to the client

- Improve performance by learning about the n + 1 problem and solving it will data loaders

Instead of using HEROKU:

SQLite is a good alternative if you don't mind keeping your data locally and don't want to sign up for additional services
I used an SQLite database instead of a hosted Postgres one because it was quick and easy to set up.

To use an SQLite database:

1. In your src folder, create a database folder
2. Inside the folder, create a dev.db file
3. In the .env file, use DATABASE_URL="file:../src/database/dev.db"
4. In schema.prisma file, change the provider to sqlite
5. Follow along with the course and it should all work as in the lectures

run prisma:
npx prisma db push
npx prisma studio
