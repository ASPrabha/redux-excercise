function changeCurrentRoom(state, action) {
	const {type, roomType, id} = action;

	return Object.assign({}, state, { currentRoom: { id, roomType } })
}

module.exports = changeCurrentRoom;