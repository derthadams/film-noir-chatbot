import React from "react";

import Message from "./Message"

export default function ChatWindow({ messages }) {
    return (
        <div className="chat-window">
            {messages.map((message, index) =>
                <Message user={message.user} text={message.text} key={index}/>
            )}
        </div>
    )
}