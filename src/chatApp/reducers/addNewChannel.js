function addNewChannel(state, action) {
	const newChannel = {
		name: action.name,
		id: action.id,
		messages: []
	};

	return Object.assign({}, state, {
		channels: [newChannel, ...state.channels]
	});
}

module.exports = addNewChannel;
