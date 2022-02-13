import React from "react";

import Col from "react-bootstrap/Col";
import SavedChat from "./SavedChat"

const chats = [{
        date: "2022-02-12",
        subject: "General",
        history: [
            {user: true, text: "Hello"},
            {user: false, text: "Hello. How's the General this morning?"},
            {user: true, text: "I don't know, I haven't seen him"},
            {user: false, text: "Well, this is awkward."},
            {user: true, text: "Yes it is"},
            {user: false, text: "How did you get into this slimy business, then?"}
            ]
    },
    {
        date: "2022-02-11",
        subject: "Missing brother",
        history: [
            {user: true, text: "Your name?"},
            {user: false, text: "Reilly -- Doghouse Reilly."},
            {user: true, text: "What do you do for a living?"},
            {user: false, text: "I'm a private detective."},
            {user: true, text: "Can you help me? My brother has been missing for three weeks."},
            {user: false, text: "For how long?"},
            {user: true, text: "Three weeks"},
            {user: false, text: "And you didn't worry."}
    ]
},
    {
        date: "2022-02-10",
        subject: "Pistol-packing",
        history: [
            {user: true, text: "Hello"},
            {user: false, text: "Hello. How's the pistol-packing business up here?"},
            {user: true, text: "Going pretty well, you?"},
            {user: false, text: "Better. We don't have so many amateurs around."},
            {user: true, text: "If you want a job done right, give it to the professionals."},
            {user: false, text: "What do you mean, done right?"}
        ],
}
]



export default function SavedChats() {

    return (
        <Col className="message-container saved-chats-background mx-auto rounded-3 mb-5" xs={9} md={6}>
            <div>
            {chats.map(
                    (chat) =>
                <SavedChat subject={chat.subject}
                           date={chat.date}
                           history={chat.history}
                           key={chat.subject + chat.date}/>
            )}
            </div>
        </Col>
    )
}