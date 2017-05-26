import * as React from 'react';
import UserLogin from './UserLogin';
import ChatInterface from './ChatInterface';
import * as io from 'socket.io-client';
import './App.css';

interface AppProps {
  // None
}

interface AppState {
  data: {};
  username: string;
  isLoggedIn: boolean;
  messageHistory: string[];
}

class App extends React.Component<AppProps, AppState> {
  private socket: SocketIOClient.Socket;

  constructor() {
    super();
    this.socket = io('http://localhost:8080');
    this.state = {data: {}, username: '', isLoggedIn: false, messageHistory: ['Empty'] };
    this.setState = this.setState.bind(this);
    this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
    this.handleMessageSubmit = this.handleMessageSubmit.bind(this);
    this.messageReceive = this.messageReceive.bind(this);
  }

  componentDidMount(this: App) {
    // Setup listeners to listen for messages emitted by the socket.io on server side
    this.socket.on('connect', function(data: string) {
      return; // Don't think I need this stub :)
    });

    // this.socket.on('message:received', this.messageReceive);
    this.socket.on('chat message', this.messageReceive);
  }

  // Client-side listener helpers
  messageReceive(this: App, msg: string) {
      let messages: string[] = this.state.messageHistory.slice();
      messages.push(msg);
      this.setState({messageHistory: messages});
      return;
  }



  // Client-side Emitters (passed down to components as props)
  handleLoginSubmit(e: any, v: string): void {
      e.preventDefault();
      // TODO: Validate the input before actually logging user in
      this.socket.emit('user login', v);
      this.setState({isLoggedIn: true, username: v});
      e.value = '';
  }

  handleMessageSubmit(e: any, m: string, uname: string): void {
    e.preventDefault();
    let msgJSONstring: string = '{"username":"' + uname + '","message":"' + m + '"}';
    this.socket.emit('chat message', msgJSONstring);
    let messages: string[] = this.state.messageHistory.slice();
    messages.push(m);
    this.setState({messageHistory: messages});
    e.value = '';
    alert(this.state.messageHistory);
  }
  
  render(this: App) {
    if (this.state.isLoggedIn) {
      return (
      <div className="App">
        <script src="/socket.io/socket.io.js" />
        <ChatInterface 
          username={this.state.username} 
          messages={this.state.messageHistory}
          handleMessageSubmit={this.handleMessageSubmit}
        />
      </div>
      );
    } else {
    return (
      <div className="App" >
        <script src="/socket.io/socket.io.js" />
        <UserLogin 
          handleLoginSubmit={this.handleLoginSubmit}
        />
      </div>
    );
    }
  }
}

export default App;
