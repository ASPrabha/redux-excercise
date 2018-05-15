import React from 'react';
import ReactDOM from 'react-dom';
import ChatWindow from './components/ChatWindow';
import {createStore} from 'redux';
import ChatApp from './chatApp/reducers';

const chatState = require('./chatState.json');

const store = createStore(ChatApp, chatState);

store.subscribe(() => {
	console.log('state', store.getState());
	// ReactDOM.render(<ChatWindow store={store}/>, document.getElementById('root'));	
});

const mapStateToProps = state => {
	return {
		currentRoom: store.getState().currentRoom,
		channels: store.getState().channels,
		direct: store.getState().channels
	}
}

ReactDOM.render(<ChatWindow store={store}/>, document.getElementById('root'));

setTimeout(() => {
	/*store.dispatch({
		type: 'CHANGE_CURRENT_ROOM',
		roomType: 'channels',
		id: '0001'
	});*/
	store.dispatch({
		type: 'ADD_NEW_CHANNEL',
		name: '#casual',
		id: '003'
	});
}, 5000);
