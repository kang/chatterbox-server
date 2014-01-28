var messageArray = [
  {
    "username":"your mom",
    "text":"eat your vegetables",
    "roomname":"main"
  },
  {
    "username":"your dad",
    "text":"eat it",
    "roomname":"main"
  },
  {
    "username":"your brother",
    "text":"bitch please",
    "roomname":"main"
  },
  {
    "username":"your hot sister",
    "text":"what doe u tak to me",
    "roomname":"main"  
  }
];

var messages = { 'results': messageArray };

var getLatest = function(){
  return messages;
};

var postMessage = function(request, response){
  var temp = "";

  request.on('data', function(data) {
    temp += data;
  });

  request.on('end', function() {
    var entry = JSON.parse(temp);
    if (!entry.roomname) entry.roomname = 'main';
    messageArray.unshift(entry);
    response.end();
  });

};

module.exports.getLatest = getLatest;
module.exports.postMessage = postMessage;