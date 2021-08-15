import React from 'react'
import ScrollToBottom from 'react-scroll-to-bottom'


const Messages = ({messages, nickname}) => (
    <ScrollToBottom>
        {messages.map((message,i) => 
            <div key={i}>{message.text}</div>

        )}
    </ScrollToBottom>


)
   


export default Messages
