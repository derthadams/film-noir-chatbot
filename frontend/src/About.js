import React from "react"

import Col from "react-bootstrap/Col";

export default function About() {
    return (
            <Col className="message-container saved-chats-background mx-auto rounded-3"
                 xs={9} md={6}>
                <div className="p-3 typewriter">
                    <p>
                        <span className="big-font"><strong>Film Noir Chatbot </strong></span>is
                        powered by DialoGPT, a natural language processing model designed by
                        Microsoft
                        to engage in multi-turn conversations with a human end-user. DialoGPT is
                        based on OpenAI's language model GPT-2.
                    </p>

                    <p>
                        To develop this chatbot, I fine-tuned DialoGPT using over 10,000 lines of
                        dialogue from classic Film Noir screenplays from the 1940's.
                    </p>

                    <p>
                        Film Noir Chatbot is a generative chatbot, so what it says can be highly
                        unpredictable - have fun talking with it!
                    </p>

                    <p>
                        If you want to save any of your chats, you can do so with the Save Chat
                        button in the upper-right corner of the chat window. To view and re-load
                        your saved chats, go to the Saved Chats page.
                    </p>

                </div>
            </Col>
    )
}