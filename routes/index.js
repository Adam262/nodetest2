var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

/* GET users page w. db*/
router.get('/', function(req,res){
  var db = req.db;
  var users = db.get('userlist');
  users.find({}, function(err, docs){
      res.render('index', {
        "userlist": docs
      });
  });
});


module.exports = router;
