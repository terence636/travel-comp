const users = []

const addUser = ({id,nickname,room}) => {
    nickname = nickname.trim().toLowerCase ();

    const existinguser = users.find((user) => user.room === room && user.nickname === nickname);

    if(existinguser) {
        // return { error: 'Username is taken' };
        // return { user: existinguser}
        removeUser(id)
    }

    const colourList = ["blue", "green", "red", "orange"]
    const colour = colourList[users.length % 4] 
    const user = { id, nickname, room, colour};
    users.push(user);
    return { user }

}

const removeUser = (id) => {
    const index = users.findIndex((user) => user.id === id)
    // const newUsers = users.filter(user=> user.id !== id)

    if(index !== -1) {
        return users.splice(index,1)[0]
    }

}

const getUser = (id) => users.find((user) => user.id === id)

const getUsersInRoom = (room) => users.filter(user=> user.room === room)

module.exports = { addUser, removeUser, getUser, getUsersInRoom }

