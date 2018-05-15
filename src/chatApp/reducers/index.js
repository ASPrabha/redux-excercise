const changeCurrentRoom = require('./changeCurrentRoom');
const addNewChannel = require('./addNewChannel');

function ChatApp(state, action) {
	console.log('oldState:', state);
	switch(action.type) {
		case 'CHANGE_CURRENT_ROOM':
			return changeCurrentRoom(state, action);
		case 'ADD_NEW_CHANNEL':
			return addNewChannel(state, action);
		default:
			return state;
	}
}

module.exports = ChatApp;