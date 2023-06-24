const socket=io('http://localhost:8000')
const form = document.getElementById('send-container');
const messageInput= document.getElementById('messageimp')
var audio=new Audio('ting.mp3');
const append= (message,position)=>{
    const messageelement=document.createElement('div');
    messageelement.innerText=message;
    messageelement.classList.add('message')
    messageelement.classList.add(position);
    messagecontainer.append(messageelement);
    if (position=='left'){
        audio.play();
    }
}
const messagecontainer=document.querySelector(".container")
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message=messageInput.value;
    append(`You: ${message}`,'right');
    socket.emit('send',message);
    messageInput.value=''
})
const nameuser= prompt("enter your name to join");
socket.emit('new-user-joined', nameuser);

socket.on('user-joined', name=>{
append(`${name} joined the chat`,'right')
})

socket.on('recieve', data =>{
    append(`${data.name}:${data.message}`,'left')
    })
socket.on('left', name =>{
    append(`${name} left the chat`,'right')
    })
