const socket = io('http://localhost:8000');

const form = document.getElementById('send-container');
const messageInp = document.getElementById('messageInp');
const messageContainer = document.querySelector(".container");
const messageContainer2 = document.querySelector(".container2");

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

const append2=(message,position)=>{
    const messageElement=document.createElement('div');
    messageElement.innerText=message;
    messageElement.classList.add('message');
    messageElement.id=position;
    messageContainer2.append(messageElement);
}
function remove(username) {
    var myobj = document.getElementById(username);
    myobj.remove();
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

socket.on('user-joined',(newuser,users) =>{
    append(`${newuser} joined the chat`,'Right');
    append2(`${newuser}`,newuser);
    console.log(users);   
})
socket.on('online',(newuser,users) =>{
  
    console.log(users);
    for (var key in users) {
        if (users.hasOwnProperty(key)) {
          append2(`${users[key]}`,users[key]);
          console.log(users[key]); 
        }
      }   
})
socket.on('receive', data =>{
    append(`${data.name} : ${data.message}`,'Left');
})

socket.on('left', username =>{
    append(`${username} left`,'Left');
    remove(username);
})