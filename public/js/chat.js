const socket = io()

let user;
let chatBox = document.getElementById("chatBox")


Swal.fire({
    title: "Identificate con tu email",
    input: "text",
    inputValidator: value=>{
        return !value && "Necesita un mail"
    },
    allowOutsideClick: false
}).then (result =>{
    //set user
    user= result.value
    let userMail = document.getElementById("user")
    userMail.innerHTML= user
    socket.emit("authenticated", user)
})

// evento escribir en el campo
chatBox.addEventListener("keyup", event =>{
    if (event.key == "Enter"){
        if(chatBox.value.trim().length > 0){
            socket.emit("message", {
                user, 
                message: chatBox.value
            })
            chatBox.value = ""
        }
    }
})

// Cuando alguien emite un msje
socket.on("messageLogs", data =>{
    let log = document.getElementById("messageLogs")

    let messages = ""

    data.forEach(message => {
        messages += `<b>${message.user}</b>:${message.message}<br>` 
    });
    log.innerHTML = messages
})

socket.on("newUser", user =>{
    let log = document.getElementById("newUser")

    Swal.fire({
        text: `Nuevo usuario conectado ${user}` ,
        toast: true,
        position: "top-right"
    })
})