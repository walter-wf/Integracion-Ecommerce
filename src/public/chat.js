const socket = io();

socket.on("messages", (messages) => {
    renderMessages(messages);
});

const renderMessages = (messages) => {
    const messagesList = messages.map(message => {
        return(`
            <div class="message">
                <div>
                    <strong>${message.user}</strong>
                    <p>${message.message}</p>
                </div>
                <div class="deleteContainer">
                    <button class="buttonDelete" onclick="deleteMessage('${message._id}')">x</button>
                </div>
            </div>
        `);
    }).join("");

    const chatDiv = document.getElementById("chat");
    chatDiv.innerHTML = messagesList;
    chatDiv.scrollTop = chatDiv.scrollHeight;

    document.getElementById("user").value = "";
    document.getElementById("message").innerText = "";
};

document.getElementById("message").addEventListener("keydown", (event) => {
    if(event.key === "Enter"){
        document.getElementById("submitButton").click(SubmitEvent);
    };
});

const newMessage = () => {
    const message = {
        user: document.getElementById("user").value,
        message: document.getElementById("message").innerText
    };
    socket.emit("addMessage", message);
    return false;
};

const deleteMessage = (id) => {
    socket.emit("idDelete", id);
};