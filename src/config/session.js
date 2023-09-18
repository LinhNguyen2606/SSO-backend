import Sequelize from "sequelize";
import session from "express-session";
import passport from "passport";
require("dotenv").config();

const configSession = (app) => {
  // initalize sequelize with session store
  const SequelizeStore = require("connect-session-sequelize")(session.Store);

  // create database, ensure 'sqlite3' in your package.json
  const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USERNAME,
    null,
    {
      host: process.env.DB_HOST,
      dialect: process.env.DB_dialect,
      logging: false,
      define: {
        freezeTableName: true,
      },
    }
  );

  const myStore = new SequelizeStore({
    db: sequelize,
  });

  // configure express
  app.use(
    session({
      secret: "keyboard cat",
      store: myStore,
      resave: false, // we support the touch method so per the express-session docs this should be set to false
      proxy: true, // if you do SSL outside of node.
      saveUninitialized: false,
    })
  );

  myStore.sync();

  app.use(passport.authenticate("session"));

  passport.serializeUser(function (user, cb) {
    process.nextTick(function () {
      cb(null, user);
    });
  });

  passport.deserializeUser(function (user, cb) {
    process.nextTick(function () {
      return cb(null, user);
    });
  });
};

export default configSession;
