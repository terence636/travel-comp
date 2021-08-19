import React, { useState, useEffect } from 'react'
import InfoBar from './InfoBar'
import Input from './Input'
import Messages from './Messages'
import io from 'socket.io-client'
// const ENDPOINT = 'http://localhost:4000'


let socket;
const Chat = ({nickname, room}) => {
    
    const [msg, setMsg] = useState('')
    const [msgs, setMsgs] = useState([])

    useEffect(()=> {
            // console.log(nickname)
            socket = io('/', {
            withCredentials: true,
            extraHeaders: {
              "my-custom-header": "abcd"
        }})
        socket.emit('join', { nickname, room }, ()=>{})

        // check is it existing room
        // if not create room
        // if yes, get all messages from the room
        
        return () => {
            socket.emit('disconnectUser')
            console.log("unmount", nickname)
            socket.off()
        }

    // },[nickname])
    },[])


    // RECEIVE MSG FROM SERVER
   useEffect(()=>{
        socket.on('message',(newMsg)=>{
        setMsgs(prev=>[...prev,newMsg])
        // update DB with newMsg
    })
   },[])

   // SEND MESSAGE TO SERVER
   useEffect(()=>{
        if(msg !== '') {
            socket.emit('sendMessage', msg, ()=>{
            setMsg('')
            })
        }
        // update DB with newMsg
   },[msg])

   // SET MSG STATE TO SEND OUT
   const sendMessage = (event, msgToSend) => {
       event.preventDefault();
       setMsg(msgToSend)
   }

//    console.log({msg},{msgs})
    return (
         <div className="chatContainer"> 
                <InfoBar room={room} nickname={nickname} />
                <Messages messages={msgs} nickname={nickname}/>
                <Input msg={msg} setMsg={setMsg} sendMessage={sendMessage} />            
            </div>  
    )
}

export default Chat
