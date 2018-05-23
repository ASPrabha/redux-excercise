function sendNewMessage(state, action){
	const newMessage = { message: action.msg};
	const { currentRoom } = state;
	const roomData = [...state[currentRoom.roomType]];

	roomData.find(m => m.id === currentRoom.id).messages.push(newMessage);
	if(currentRoom.roomType === 'channels'){
		return Object.assign({}, state, {
			channels: roomData
		})
	}
	else{
		return Object.assign({}, state, {
			direct: roomData
		})
	}
	
}

module.exports = sendNewMessage;