// Make connection
var socket = io.connect(location.host);

// Query DOM
var message = document.getElementsByClassName('conversation-composer')[0],
      username = document.getElementsByClassName('header-name-body')[0],
      usernameIcon = document.getElementsByClassName('header-name-icon')[0],
      conversation = document.getElementsByClassName('conversation-messages')[0],
      messages = document.getElementsByClassName('conversation-message'),
      status = document.getElementsByClassName('conversation-status')[0],
      favicon = document.getElementById('favicon');


socket.on('connect', function() {
    favicon.setAttribute('href', 'favicon_connected.png');
    username.value =  Math.floor(Math.random()*4095).toString(16);
    changeColorIcon();
});

// Listen for Enter press to change the icon color
username.addEventListener('keydown', function(e) {
  // Enter is pressed
  if (e.keyCode == 13) { changeColorIcon();}
}, false);

// Change username icon
var changeColorIcon = function() {
  usernameIcon.style.backgroundColor = '#' + username.value;
};


// Listen for the chat events
socket.on('chat', function(data){
  conversation.innerHTML +=
  '<div class="conversation-message"><div class="conversation-message-user-icon" style="background-color: #' + data.username + ';" ></div><div class="conversation-message-body">' + data.message + '</div></div>';
  updateConversationSize();
  updateScroll();
});


// Listen for Enter press to send the message
message.addEventListener('keydown', function(e) {
// Enter is pressed
  if (e.keyCode == 13) { submit(); }
}, false);


// Submit event
var submit = function(){

  // Submit only if the message isn't empty
  if (message.value == "") {
    return false;
  }

  // Prevents input from having injected markup
  message.value = message.value.replace(/</g, "&lt;").replace(/>/g, "&gt;");

  // Emit message
  socket.emit('chat', {
    message: message.value,
    username: username.value,
    room: usernameIcon.value
  });

  //Add message to author conversation
  conversation.innerHTML +=
  '<div class="conversation-message right"><div class="conversation-message-body right">' + message.value + '</div></div>';

  // Reset input
  message.value = "";

  updateConversationSize();
  updateScroll();
};


// Scroll to the bottom of the conversation
var updateScroll = function(){
  conversation.scrollTop = conversation.scrollHeight;
};

////////////////////////////////////////Tests/////////////////////////////////////

// Keep only 10 messages in the browser
function updateConversationSize() {
  if (messages.length <= 10) {
    return;
  }
  messages[0].remove();
}



function addParticipantsMessage (data) {
  var message = '';
  if (data.numUsers === 1) {
    message += "there's 1 participant";
  } else {
    message += "there are " + data.numUsers + " participants";
  }
  log(message);
}

// Whenever the server emits 'user joined', log it in the chat body
socket.on('user joined', function (data) {
  log(data.username + ' joined');
  addParticipantsMessage(data);
});

// Whenever the server emits 'user left', log it in the chat body
socket.on('user left', function (data) {
  log(data.username + ' left');
  addParticipantsMessage(data);
});

////////////////////////////////////FUN////////////////////////////////

// var i = 0;
//
// setInterval(function() {
//     count();
//   }, 500);
//
//   function count() {
//     if (message.value != ''){
//       return false;
//     }
//     message.value = i;
//     i++;
//     submit();
//   }
