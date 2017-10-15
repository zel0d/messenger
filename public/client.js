// Make connection
var socket = io.connect('http://localhost:4000');

// // let's assume that the client page, once rendered, knows what room it wants to join
// var room = "abc123";
//


// Query DOM
var message = document.getElementsByClassName('conversation-composer')[0],
      username = document.getElementsByClassName('header-name-body')[0],
      usernameIcon = document.getElementsByClassName('header-name-icon')[0],
      conversation = document.getElementsByClassName('conversation-messages')[0],
      newConversation = document.getElementsByClassName('header-add')[0],
      favicon = document.getElementById('favicon');


socket.on('connect', function() {
    favicon.setAttribute('href', 'favicon_connected.png');
    username.value =  Math.floor(Math.random()*16777215).toString(16);
    changeColorIcon();
});

// Listen for click on new room
newConversation.addEventListener('click', function() {
  // Let's sign-up for to receive messages for this room
  socket.emit('room', usernameIcon.value);
}, false);


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

  updateScroll();
};


// Scroll to the bottom of the conversation
var updateScroll = function(){
  conversation.scrollTop = conversation.scrollHeight;
};


////////////////////////////////////FUN////////////////////////////////

// var i = 0;
//
// setInterval(function() {
//     count();
//   }, 1000);
//
//   function count() {
//     if (message.value != ''){
//       return false;
//     }
//     message.value = i;
//     i++;
//     submit();
//   }
