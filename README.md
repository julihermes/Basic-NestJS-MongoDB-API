<p align="center">
  <img src="https://i.imgur.com/29qObnG.png" width="250" alt="Nest Logo" />
</p>

# Basic NestJS MongoDB API

<p>Basic NestJS REST API project integrated with MongoDB to use as a base to start new projects.<p>

## Features

<ul>
  <li>A folder structure to follow (if you want)</li>
  <li>MongoDB connection (mongoose)</li>
  <li>Rapid MongoDB Repository</li>
  <li>MongoDB exceptions filters</li>
  <li>User module</li>
  <li>Auth module (Passport, JWT, bcrypt, guards)</li>
  <li>DTO Validation</li>
  <li>Configs structure</li>
  <li>Constants structure</li>
</ul>

## Installation

<p>Clone this repo and run:</p>

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn start:prod
```

The project can be access in `http://localhost:3000`

## First things to do

Before run the project, duplicate the file `.env.example` to `.env` and changes the vars properly.

After run the project, register a user using `http://localhost:3000/auth/register` to be able to login and access others controllers (controllers using JWT guard).

<i>PS. the register endpoint has no security level like a activation step or something like that. You need to implement any security level if your project needs this, or you can remove this endpoint after create the first user (other users can be added using Users endpoint).</i>

## Creating new modules

You can start development as you want like a NestJS common project. You can use Users Module as reference to implement new modules. You can also use `nest g` to create the files, but you have to adapt to use mongoDB, use Users Module as reference.

## Postman collection

I created a Postman collection to use this project with Auth and Users endpoints and a script to save JWT token in a collection variable, just running login endpoint. you can access here:
`https://www.getpostman.com/collections/29e8e02250259a261754`

You can use this collection to developing your project by adding new endpoints as you develops.

## To Do

<ul>
  <li>All the tests</li>
  <li>A generator to create all resources files ready to use</li>
</ul>
