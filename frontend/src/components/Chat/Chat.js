import React, { useState, useEffect } from 'react'
import InfoBar from './InfoBar'
import Input from './Input'
import io from 'socket.io-client'
const ENDPOINT = 'http://localhost:4000'

let socket;

const Chat = ({nickname, room}) => {
    console.log(nickname)
    const [msg, setMsg] = useState('')
    const [msgs, setMsgs] = useState([])

    useEffect(()=> {
        socket = io(ENDPOINT, {
            withCredentials: true,
            extraHeaders: {
              "my-custom-header": "abcd"
        }})
        socket.emit('join', { nickname, room }, ()=>{
    
        })

        return () => {
            // socket.emit('disconnect')
            socket.off()
        }

    },[nickname])
  
   useEffect(()=>{
    socket.on('message',(msg)=>{
        setMsgs([...msgs,msg])
    })
   },[msg])

   const sendMessage = (event) => {
       event.preventDefault();
        if(msg) {
            socket.emit('sendMessage', msg, ()=>{
                setMsg('')
            })
        }
   }

   console.log({msg},{msgs})
    return (
        // <div className="chatOuterContainer">
         <div className="chatContainer"> 
   
                <InfoBar room={room} nickname={nickname} />
                <Input msg={msg} setMsg={setMsg} sendMessage={sendMessage} />       
            
            </div>
        //  </div>
        
    )
}

export default Chat
