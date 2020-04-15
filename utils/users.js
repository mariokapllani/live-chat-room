const users=[];

//join user to chat
function userJoin(id, username, room){
    const user={id, username, room};
    console.log(user);
    users.push(user);
    return user;
}

function getCurrentUser(id){
    return user.find(user=>user.id==id);
}

module.exports={
    userJoin,
    getCurrentUser
}