import passport from "passport";
import LocalStrategy from "passport-local";
import loginRegisterService from "../service/loginRegisterService";

const configPassportLocal = () => {
  passport.use(
    new LocalStrategy({}, async (username, password, done) => {
      let rawData = {
        valueLogin: username,
        password: password,
      };

      let res = await loginRegisterService.handleUserLogin(rawData);
      if (res && res.EC === 0) {
        return done(null, res.DT);
      } else {
        return done(null, false, { message: res.EM });
      }
    })
  );
};

const handleLogOut = (req, res) => {
  req.session.destroy(function () {
    res.clearCookie("connect.sid");
    res.redirect("/");
  });
};

module.exports = {
  configPassportLocal,
  handleLogOut,
};
