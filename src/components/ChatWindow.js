import React, {Component} from 'react';
import './chatWindow.css';

let newChannelInput;

export default class ChatWindow extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	handleNewChannelCreation(event) {
		event.preventDefault();
		console.log(newChannelInput.value);
		newChannelInput.value = "";
		this.setState({displayNewChannelInput: false});
	}

	render() {
		return (
			<main>
				<section>
					<h2>Channels {this.state.displayNewChannelInput ? <form onSubmit={this.handleNewChannelCreation.bind(this)}><input type="text" ref={node => newChannelInput = node} /></form> : <button onClick={() => {this.setState({displayNewChannelInput: true})}}>+</button>}</h2>
					<ul>
						{this.props.data.channels.map(channel => <li className={this.props.data.currentRoom.type==='channel' && this.props.data.currentRoom.id===channel.id ? 'active' : ''} key={channel.id}>{channel.name}</li>)}
					</ul>
				</section>
				<section>
					<h2>Direct Messages</h2>
					<ul>
						{this.props.data.direct.map(direct => <li className={this.props.data.currentRoom.type==='direct' && this.props.data.currentRoom.id===direct.id ? 'active' : ''} key={direct.id}>{direct.name}</li>)}
					</ul>
				</section>
				<section>
					<h2>Chat Area</h2>
					<section>
						<h3>Message History</h3>
						<ul>
							{this.props.data[this.props.data.currentRoom.type].find(m => m.id===this.props.data.currentRoom.id).messages.map(msg => <li key={msg.message}>{msg.message}</li>)}
						</ul>
					</section>
					<section>
						<form>
							<input type="text"/>
						</form>
					</section>
				</section>
			</main>
		);
	}
}
