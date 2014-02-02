var db = require('./database');

var getLatest = function(cb){
  db.dbConnection.query('SELECT * FROM messages ORDER BY id DESC', cb);
};

var postMessage = function(request, response){
  var temp = "";

  request.on('data', function(data) {
    temp += data;
  });

  request.on('end', function() {
    var entry = JSON.parse(temp);

    if (typeof entry.roomname === 'undefined') entry.roomname = 'main';

    var insertInto = function(table) {
      return 'INSERT INTO '+table+' SET ?';
    };

    var select = function(table, attr, val) {
      return 'SELECT * FROM '+table+' WHERE '+attr+' = "'+val+'";';
    };

    var addUserInfo = function(cb){
      db.dbConnection.query(select('users', 'username', entry.username), function(err, data) {
        if (data.length === 0) {
          db.dbConnection.query(insertInto('users'), {username: entry.username});
        }
        cb();
      });
    };

    var addRoomInfo = function(cb){
      db.dbConnection.query(select('rooms', 'roomname', entry.roomname), function(err, data) {
        if (data.length === 0) {
          db.dbConnection.query(insertInto('rooms'), {roomname: entry.roomname});
        }
        cb();
      });
    };

    var addMessage = function(cb) {
      db.dbConnection.query(insertInto('messages'), {
        username: entry.username,
        roomname: entry.roomname,
        text: entry.text
      }, function() {
        cb();
      });
    };

    addUserInfo(function(){
      addRoomInfo(function(){
        addMessage(function(){
          response.end();
        });
      });
    });

  });
};

exports.getLatest = getLatest;
exports.postMessage = postMessage;