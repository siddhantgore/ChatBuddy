const socket = io('http://localhost:8000');

const form = document.getElementById('send-container');
const messageInp = document.getElementById('messageInp');
const messageContainer = document.querySelector(".container");

var ring=new Audio('/Client/Audio/ring.mp3');

const append=(message,position)=>{
    const messageElement=document.createElement('div');
    messageElement.innerText=message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if(position=='Left'){
    ring.play();
    }
}

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message=messageInp.value;
    append(`You: ${message} `,'Right');
    socket.emit('send',message);
    messageInp.value="";
})

const username = prompt("Enter Your Name to Join");
socket.emit('new-user-joined', username);

socket.on('user-joined',newuser =>{
    append(`${newuser} joined the chat`,'Right');
})

socket.on('receive', data =>{
    append(`${data.name} : ${data.message}`,'Left');
})

socket.on('left', username =>{
    append(`${username} left`,'Left');
})