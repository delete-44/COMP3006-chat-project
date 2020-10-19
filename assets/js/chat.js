$(window).on('load', function() {
  if(localStorage.history === undefined) {
    // Create demo user & store current user
    let user = new User('Oats')

    // And one default message
    let message = new Message('Hi there!', new Date(), user)
    message.send()
    localStorage.history = []
  }

  // Initialise stored messages
  // Iterate over history & send each message

  $('#message-form').submit((e) => {
    // Retrieve message value
    let text = $('#message-box').val();

    // If message is valid (ie is not empty or just whitespace)...
    if (text !== '' && text.trim()) {
      // Clear message field
      $('#message-box').val('');

      // Add new message to chat history
      let message = new Message(text, new Date(), new User('Wheaty'))
      message.send()
    }

    e.preventDefault();
  })

  $('#message-box').keypress(function (e) {
    // Submit the form when enter is pressed. For shift + enter, add a newline to message
    if(e.which == 13 && !e.shiftKey) {
      $('#message-form').submit();
      e.preventDefault();
    }
  });
});

function User(name) {
  this.name = name;
}

function Message(text, date, user) {
  this.text = text;
  this.date = date;
  this.user = user;
}

// Function to send a message & append it to the HTML
Message.prototype.send = function() {
  // Add to history
  // localStorage.history.append(this)

  // Create new element
  this.createBubble()
}

Message.prototype.createBubble = function() {
  // Create new HTML element
  let htmlElement = ''

  htmlElement += `<div class="message ${this.isSent() ? 'sent' : 'received'}">`
  htmlElement += `<div class="chat-bubble">${this.text}</div>`
  htmlElement += `<p class="signature">${this.user.name} &middot; ${this.dateString()}</p>`
  htmlElement += '</div>'

  // ...and add it to page
  $('#history').append(htmlElement)
}

// Returns nicely formatted date & time stamp for message
Message.prototype.dateString = function() {
  return `${this.date.getHours()}:${this.date.getMinutes()} &middot; ${this.date.getDate()}/${this.date.getMonth()}`
}

// Returns whether the message is sent (true) or received (false)
Message.prototype.isSent = function() {
  return this.user.name === 'Wheaty';
}
