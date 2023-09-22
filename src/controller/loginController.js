const getLoginPage = (req, res) => {
  let arrMessage = req.flash("data");
  let errMessage = arrMessage[0] ? arrMessage[0] : "";
  let userNameInput = arrMessage[1] ? arrMessage[1] : "";
  let errCodeMessage = arrMessage[2] ? arrMessage[2] : "";
  return res.render("login.ejs", {
    error: errMessage,
    userNameInput,
    errCodeMessage,
  });
};

module.exports = {
  getLoginPage,
};
