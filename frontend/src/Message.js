import React from "react"

export default function Message({ user, text }) {
    return (
            <div className={`content ${user ? "user-content" : "bot-content"}`}>
                <div className={`message ${user ? "user-message": "bot-message"}`}>
                    <div className={`message-text ${user ? "user-message-text" : "bot-message-text"}`}>
                        { text }
                    </div>
                </div>

            </div>
    )
}