# My notes on building an API...

## Getting started:

While this category won't ALWAYS be applicable, you can start a totally blank project by running `npm init` in the repo, entering a project name, and holding enter.
Really, this isn't even specific to APIs. You can initialize **ANY** project using NPM this way. Even if you just want to commit a bunch of cat pictures.

Then, you should *immediately* `npm install dotenv express helmet morgan cors knex sqlite3 bcryptjs connect-session-knex jsonwebtoken`
This should get us every dependency we need for the base API:
- `express` to write the server.
- `helmet`, `cors` and `morgan` for security and verbose logging.
- `knex` to connect to the database in the API.

After those are done installing, go ahead and `npm install -D nodemon jest supertest cross-env` too. These will be used for testing later. (If you even test anything.)
For right now, this gets us:
- `nodemon` which is used to run our server locally.
    - You're going to want to add `"server": "nodemon index.js"` to your `package.json` `scripts` at this point.

To initialize your database shenanigans, run `npx knex init` which will generate a `knexfile.js` in your project's root directory. 
Do NOT move this file. 
- I don't recommend deleting anything in here if you actually intend on deploying the project. It can be a headache to dig through your other repos and find out why your knexfile is busted on-deploy...

Inside `knexfile.js`, you're going to want to do a number of things to boilerplate your database access: 
- Add a `testing` configuration option. Leave it blank for now.
- Add `useNullAsDefault: true,` inside the `development` config ONLY if you are using an `sqlite` database.
- Add a few more configs inside `development`:
   - `connection: {},` if it's not already there, and give it an argument of `filename: ../your/directory/here` which points to the relative location of... whever you want the database to live.
   - `migrations: {},` and `seeds: {},`, giving them both arguments of `directory: "../your/directory/here"` which point to where you respectively want your `migrations` and `seeds` to live.
- Here's where things get pretty gross. If you're trying to use a database with, well, any efficiency at all, you're going to want to use `foreign keys` so your database can be relational.
   - Add a `pool: {}` option inside `development` which contains an `afterCreate: () => {},` method.
   - Pass `afterCreate` the parameters of `(connect, done) => {`. Inside the function, invoke `connect.run("PRAGMA foreign_keys = ON", done);`
     - Don't ever ask why the `.run()` invocation looks so weird. Just do it, it's the same every time.

Make `index.js`. This is the same. Every time.

Create `server.js`. Depending on how your API is going to be structured, either everything will live in here or nothing will.
In this case, all our endpoints are going to live there.

Import `express`, `helmet`, `morgan` and `cors` plainly.

declare `server` as `express()` if that's what you're using.

Tell the server to `.use()` the following:
- `helmet()`, 
- `morgan("common")`, 
- `express.json()`, 
- `cors()`

Write, or at the very least, prototype your endpoints. Now would also be a good time to whiteboard your database stucture if you're using one. That is a completely separate guide, however.

Next, create `dbConfig.js`. Inside this folder, you're going to want to import `knex` as well as `knexfile as config`.

Set an `environment` constant to `process.env.DB_ENV || "development"`.

Then export `knex(config[environment])`.

Congratulations. You are boilerplated. That's a lot of stuff, right?

## Database Model

Make your first migration and seed the database if necessary.
In the same folder as `server.js`, make a file called `model.js`. This is where your models will live.
Require your `dbConfig` and use the namespace as your way to make SQL queries via `knex`.

## For Testing:

Start by adding an options object to `jest` in `package.json` which sets the `testEnvironment` to `node`.

And add a test script that runs `"cross-env DB_ENV=testing jest --watch"`. This both sets your environment variable to TESTING, and tells Jest to watch for file changes.

In your `knexfile.js`, add a `testing` environment that is identical to the `development` one save for the path to the database.

Then you can start writing tests in `server.spec.js` or whatever. See the file for examples.
- ANY promises that you write, you need to be `return`ing.

Continue on to your `models`. See `hobbitsModel.spec.js` for an example.