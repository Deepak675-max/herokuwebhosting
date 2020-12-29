const socket = io()
let NAME;
let textarea =document.querySelector('#textarea')

let messageArea = document.querySelector('.message_area')

do{
    NAME = prompt('please enter your name: ')

}while(!NAME)

textarea.addEventListener('keyup', (e) => {
    if(e.key === 'Enter'){
        sendMessage(e.target.value)
    }
})

function sendMessage(message){
    let msg = {
        user: NAME,
        message: message.trim()
    }

    //Append

    appendMessage(msg, 'outgoing')

    textarea.value = ''
    scrollToBotom()

    //send to server

    socket.emit('message', msg)
}

function appendMessage(msg, type){
    let mainDiv = document.createElement('div')

    let className = type

    mainDiv.classList.add(className,'message')


    let markup = `

        <h4>${msg.user}</h4>
        <p>${msg.message}</p>
    
    `
    mainDiv.innerHTML = markup

    messageArea.appendChild(mainDiv)

}

// Receive message

socket.on('message', (msg) =>{
    appendMessage(msg,'incoming')
    scrollToBotom()

})

function scrollToBotom(){
    messageArea.scrollTop = messageArea.scrollHeight
}