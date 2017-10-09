// Make connection
var socket = io.connect('http://128.179.166.16:4000');

// Query DOM
var message = document.getElementsByClassName('conversation-composer')[0],
      username = document.getElementsByClassName('header-name-body')[0],
      usernameIcon = document.getElementsByClassName('header-name-icon')[0],
      conversation = document.getElementsByClassName('conversation-messages')[0];


// Emit events
var submit = function(){

    // Emit message
    socket.emit('chat', {
      message: message.value,
      username: username.value
    });

    //Add message to author conversation
    conversation.innerHTML +=
    '<div class="conversation-message right"><div class="conversation-message-body right">' + message.value + '</div></div>';

    // Reset input
    message.value = "";

    updateScroll();
};


// Listen for a Enter press
message.addEventListener('keydown', function(e) {
  // Enter is pressed
  if (e.keyCode == 13) { submit(); }
  }, false);

username.addEventListener('keydown', function(e) {
  // Enter is pressed
  if (e.keyCode == 13) { changeColorIcon(); }
  }, false);


// Change username icon
var changeColorIcon = function() {
  usernameIcon.style.backgroundColor = '#' + username.value;
};


// Listen for events
socket.on('chat', function(data){
   conversation.innerHTML +=
   '<div class="conversation-message"><div class="conversation-message-user-icon" style="background-color: #' + data.username + ';" ></div><div class="conversation-message-body">' + data.message + '</div></div>';
   updateScroll();
});


// Scroll to the bottom of the conversation
var updateScroll = function(){
    conversation.scrollTop = conversation.scrollHeight;
}
