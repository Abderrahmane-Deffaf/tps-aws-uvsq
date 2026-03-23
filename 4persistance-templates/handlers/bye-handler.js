

function byeHandler(req, res) {
  //const name = req.query.nickName ;
  const name = req.body.nickName;
  res.render("bye.html", { name: name || "world" });
}

module.exports = byeHandler;