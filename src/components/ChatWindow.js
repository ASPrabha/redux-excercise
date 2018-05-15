import React, {Component} from 'react';
import './chatWindow.css';

export default class ChatWindow extends Component {
	render() {
		return (
			<main>
				<section>
					<h2>Channels</h2>
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
