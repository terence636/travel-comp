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
        console.log(nickname)
        // socket = io(ENDPOINT, {
            socket = io('/', {
            withCredentials: true,
            extraHeaders: {
              "my-custom-header": "abcd"
        }})
        socket.emit('join', { nickname, room }, ()=>{})

        return () => {
            socket.emit('disconnectUser')
            console.log("unmount", nickname)
            socket.off()
        }

    },[nickname])
  

    // useEffect(()=> {
    //     console.log("room change")
    //     socket.emit('disconnectUser')
    //     console.log("unmount", nickname)
    //     socket.off()
        
    //     socket = io(ENDPOINT, {
    //         withCredentials: true,
    //         extraHeaders: {
    //           "my-custom-header": "abcd"
    //     }})
    //     socket.emit('join', { nickname, room }, ()=>{
    //     })
    // },[room])

   useEffect(()=>{
        // console.log("HEY")
        socket.on('message',(newMsg)=>{
        // console.log("socket-newmsg", newMsg)
        // console.log(newMsg)
        setMsgs(prev=>[...prev,newMsg])
    })
   },[])

   useEffect(()=>{
        
        if(msg !== '') {
            socket.emit('sendMessage', msg, ()=>{
            setMsg('')
            })
        }
   },[msg])

   const sendMessage = (event, msgToSend) => {
       event.preventDefault();
    // console.log(msgToSend)
       setMsg(msgToSend)
   }

   console.log({msg},{msgs})
    return (
         <div className="chatContainer"> 
                <InfoBar room={room} nickname={nickname} />
                <Messages messages={msgs} nickname={nickname}/>
                <Input msg={msg} setMsg={setMsg} sendMessage={sendMessage} />            
            </div>  
    )
}

export default Chat
