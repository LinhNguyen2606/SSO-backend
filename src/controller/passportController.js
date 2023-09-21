import passport from "passport";
import LocalStrategy from "passport-local";
import loginRegisterService from "../service/loginRegisterService";

const configPassportLocal = () => {
  passport.use(
    new LocalStrategy(async function verify(username, password, cb) {
      let rawData = {
        valueLogin: username,
        password: password,
      };

      let res = await loginRegisterService.handleUserLogin(rawData);
      if (res && res.EC === 0) {
        return cb(null, res.DT);
      } else {
        return cb(null, false, { message: res.EM });
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
