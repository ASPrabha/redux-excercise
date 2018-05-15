import React from 'react';
import ReactDOM from 'react-dom';
import ChatWindow from './components/ChatWindow';

const chatState = require('./chatState.json');

ReactDOM.render(<ChatWindow data={chatState}/>, document.getElementById('root'));
