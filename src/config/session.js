import Sequelize from "sequelize";
import session from "express-session";
require("dotenv").config();

const configSession = (app) => {
  // initalize sequelize with session store
  var SequelizeStore = require("connect-session-sequelize")(session.Store);

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

  // configure express
  var app = express();
  app.use(
    session({
      secret: "keyboard cat",
      store: new SequelizeStore({
        db: sequelize,
      }),
      resave: false, // we support the touch method so per the express-session docs this should be set to false
      proxy: true, // if you do SSL outside of node.
    })
  );
};

export default configSession;
