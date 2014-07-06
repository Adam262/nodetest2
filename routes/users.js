var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/users', function(req, res) {
    var db = req.db;
    db.collection('userlist').find().toArray(function (err, items) {
        res.json(items);
    });
});

/* Add user. POST to new addusers route. On submit, insert req.body to userlist collection. If no error, return empty string */
router.post ('/adduser', function (req,res){
    var db = req.db;
    db.collection('userlist').insert(req.body, function (err, result){
      res.send(
        // ternary operator as if/else
        (err === null) ? {msg:''} : {msg: err}
        );
    });
});
// Delete user. 
router.delete ('/deleteuser/:id', function (req,res){
var db = req.db;
var userToDelete = req.params.id
db.collection('userlist').removeById(userToDelete, function(err, result){
    res.send(
      (result === 1) ? {msg: ''} : {msg: 'error ' + err}
      );
  });
});

module.exports = router;
