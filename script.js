  const socket=io('http://localhost:3000')
  const messageForm=document.querySelector('#send_container')
  const messageInput=document.querySelector('.chat_container .item2')
  const messageContainer=document.querySelector('.chat_container .item1')
  const name = prompt('What is your name?')
  var num=0;
appendMessage('You joined')
socket.emit('new-user', name)

socket.on('chat-message', data => {
  appendMessage(`${data.name}: ${data.message}`)
})

socket.on('user-connected', name => {
  num+=1
  appendMessage(`${name} connected 
  Number of Participants : ${num}`)
})

socket.on('user-disconnected', name => {
  appendMessage(`${name} disconnected`)
})

messageForm.addEventListener('submit', e => {
  e.preventDefault()
  const message = messageInput.value
  appendMessage(`You: ${message}`)
  socket.emit('send-chat-message', message)
  messageInput.value = ''
})

function appendMessage(message) {
  const messageElement = document.createElement('div')
  messageElement.innerText = message
  messageContainer.append(messageElement)
}