// import React, { useEffect, useRef } from 'react'
import React from 'react'
import ScrollToBottom from 'react-scroll-to-bottom'
import Message from './Message'


const Messages = ({messages, nickname}) => {

    // THIS SECTION BELOW WAS TO USE TO SCROLL TO BOTTOM
    
    // const messagesEndRef = useRef(null)
    // const scrollToBottom = () => {
    //     messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    //   }
    //   useEffect(scrollToBottom, [messages]);

      return (
    <ScrollToBottom className="messages">
        {messages.map((message,i) => 
            <div key={i}><Message message={message} nickname={nickname} /></div>
            
        )}
        {/* <div ref={messagesEndRef} /> */}
    </ScrollToBottom>
      )

}
   


export default Messages
