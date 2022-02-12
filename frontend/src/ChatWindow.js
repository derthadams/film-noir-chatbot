import React, { useEffect, useRef } from "react";

import Message from "./Message"

export default function ChatWindow({ messages }) {
    const endRef = useRef(null);

    const scrollToBottom = () => {
        endRef.current?.scrollIntoView({behavior: "smooth"})
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages])

    return (
        <div className="chat-window">
            {messages.map((message, index) =>
                <Message user={message.user} text={message.text} key={index}/>
            )}
            <div ref={endRef}/>
        </div>
    )
}