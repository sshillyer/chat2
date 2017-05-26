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
    this.state = {data: {}, username: '', isLoggedIn: false, messageHistory: ['Nothing here'] };
    this.setState = this.setState.bind(this);
    this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
  }
  
  componentDidMount() {
    // let socket = io('http://localhost:8080');
    this.socket.on('connect', function(this: App, data: string) {
      return; // Don't think I need this stub :)
    });

    this.socket.on('chat message', function(msg: string) {
      // alert(msg);
      return;
    });
  }

  handleLoginSubmit(e: any, v: string): void {
      e.preventDefault();
      // TODO: Validate the input before actually logging user in
      this.socket.emit('user login', v);
      this.setState({isLoggedIn: true});
  }
  
  render(this: App) {
    if (this.state.isLoggedIn) {
      return (
      <div className="App">
        <script src="/socket.io/socket.io.js" />
        <ChatInterface username={this.state.username} messages={this.state.messageHistory} />
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
