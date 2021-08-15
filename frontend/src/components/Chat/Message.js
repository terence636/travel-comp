import React from 'react'
// inport ReactEmoji from ''

const Message = ({message, nickname}) => {
    let isSentByCurrentUser = false
    const trimmedName = nickname.trim().toLowerCase()
    const { user, text, colour} = message

    if(user === trimmedName)
        isSentByCurrentUser = true

    return (
        isSentByCurrentUser
        ? (
            <div className="messageContainer justifyEnd">
                {/* <p className="sendText pr-10">{trimmedName}</p> */}
                <div className="messageBox backgroundBlue">
                    <p className="messageText colorWhite">{text}</p>
                </div>
            </div>
        ) : (
            <div className="MessageContainer justifyStart">
                <div className="messageBox backgroundLight">
                    <p style={user!=="ADMIN"?{color:`${colour}`}:{color:'purple'}}>{user.toUpperCase()}</p>
                    <p className="messageText colorDark">{text}</p>
                </div>
                
            </div>


        )
    )
}

export default Message
