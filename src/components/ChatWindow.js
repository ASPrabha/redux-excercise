import React, {Component} from 'react';
import './chatWindow.css';
import PropType from 'prop-types';

let newChannelInput;
let unsubscribe;
let newMessageInput;

export default class ChatWindow extends Component {
	constructor(props) {
		super(props);
		this.state = props.store.getState();
	}

	static get propTypes() {
		return {
			store: PropType.object.isRequired
		}
	}

	componentDidMount() {
		unsubscribe = this.props.store.subscribe(() => {
			console.log('newState:', this.props.store.getState());
			this.setState(this.props.store.getState());
		});
	}

	componentWillUnmount() {
		if(unsubscribe) {
			unsubscribe();
		}
	}

	handleNewChannelCreation(event) {
		event.preventDefault();
		// console.log(newChannelInput.value);
		let max = 0;
		max = this.state.channels.reduce((a, b) => Math.max(a.id, b.id));
		// console.log(max);
		this.props.store.dispatch({
			type: 'ADD_NEW_CHANNEL',
			name: `#${newChannelInput.value}`,
			id: `00${max + 1}`
		});
		newChannelInput.value = "";
		this.setState({displayNewChannelInput: false});
	}

	handleChangeCurrentRoom = (roomType, roomId) => {
		this.props.store.dispatch({
			type: 'CHANGE_CURRENT_ROOM',
			roomType: `${roomType}`,
			id: `${roomId}`
		});
	}

	handleNewMessage(event) {
		event.preventDefault();
		this.props.store.dispatch({
			type: 'SEND_NEW_MSG',
			msg: `${newMessageInput.value}`
		});
		newMessageInput.value = "";
	}

	render() {
		return (
			<main>
				<section>
					<h2>Channels {this.state.displayNewChannelInput ? <form onSubmit={this.handleNewChannelCreation.bind(this)}><input type="text" ref={node => newChannelInput = node} /></form> : <button onClick={() => {this.setState({displayNewChannelInput: true})}}>+</button>}</h2>
					<ul>
						{this.state.channels.map(channel => <li className={this.state.currentRoom.roomType==='channels' && this.state.currentRoom.id===channel.id ? 'active' : ''} key={channel.id}  onClick = {() => this.handleChangeCurrentRoom('channels', channel.id)}>{channel.name}</li>)}
					</ul>
				</section>
				<section>
					<h2>Direct Messages</h2>
					<ul>
						{this.state.direct.map(direct => <li className={this.state.currentRoom.roomType==='direct' && this.state.currentRoom.id===direct.id ? 'active' : ''} key={direct.id} onClick = {() => this.handleChangeCurrentRoom('direct', direct.id)}>{direct.name}</li>)}
					</ul>
				</section>
				<section>
					<h2>Chat Area</h2>
					<section>
						<h3>Message History</h3>
						<ul>
							{this.state[this.state.currentRoom.roomType].find(m => m.id === this.state.currentRoom.id).messages.map(msg => <li key={msg.message}>{msg.message}</li>)}
						</ul>
					</section>
					<section>
						<form onSubmit={this.handleNewMessage.bind(this)}>
							<input type="text"  ref={node => newMessageInput = node}/>
						</form>
					</section>
				</section>
			</main>
		);
	}
}
