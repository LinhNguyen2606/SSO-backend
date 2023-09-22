import passport from "passport";
import LocalStrategy from "passport-local";
import loginRegisterService from "../service/loginRegisterService";

const configPassportLocal = () => {
  passport.use(
    new LocalStrategy({ passReqToCallback: true }, async function verify(
      req,
      username,
      password,
      done
    ) {
      let rawData = {
        valueLogin: username,
        password: password,
      };

      let res = await loginRegisterService.handleUserLogin(rawData);
      if (res && res.EC === 0) {
        return done(null, res.DT);
      } else {
        return done(null, false, req.flash("data", [res.EM, username, res.EC]));
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
