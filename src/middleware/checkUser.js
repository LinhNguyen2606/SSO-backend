const isLogin = (req, res, next) => {
  try {
    if (req.isAuthenticated()) {
      if (req.path === "/login") {
        res.redirect("/");
      }
      next();
    } else {
      if (req.path === "/login") {
        next();
      } else {
        res.redirect("/login");
      }
    }
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  isLogin,
};
