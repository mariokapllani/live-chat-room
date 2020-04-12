const chatform=document.getElementById('chat-form');
const chatMessages=document.querySelector('.chat-messages');

//Get ussername and room from url
const { username, room }=Qs.parse(location.search, {
    igroneQueryPrefix:true
});

const socket=io()
//Join chat
socket.emit('joinRoom', {username, room});

socket.on('message', message=>{
    console.log(message);
    outputMessage(message);

    //Scroll down
    chatMessages.scrollTop=chatMessages.scrollHeight;
});

//message submit event

chatform.addEventListener('submit', (e)=>{
    e.preventDefault();

    //get message
    const msg=e.target.elements.msg.value;

    //emit chatMessage
    socket.emit('chatMessage',msg);

    //Clear input
    e.target.elements.msg.focus();
});

//output message function to DOM
function outputMessage(message){
    var div=document.createElement('div')
    div.classList.add('message');
    div.innerHTML=`<p class="meta">${message.username} <span>${message.time}</span></p>
    <p class="text">
        ${message.text}
    </p>`;
    document.querySelector('.chat-messages').appendChild(div);
}