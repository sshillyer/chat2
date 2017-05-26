import * as React from 'react';
import UserLogin from './UserLogin';
import * as io from 'socket.io-client';
import './App.css';

interface AppProps {
  // isLoggedIn: boolean;
}

interface AppState {
  data: {};
  isLoggedIn: boolean;
}

class App extends React.Component<AppProps, AppState> {
  private socket: SocketIOClient.Socket;

  constructor() {
    super();
    this.socket = io('http://localhost:8080');
    this.state = {data: {}, isLoggedIn: false };
    this.setState = this.setState.bind(this);
    this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
  }
  
  componentDidMount() {
    // let socket = io('http://localhost:8080');
    this.socket.on('connect', function(this: App, data: string) {
      alert('Connected!?');
    });

    this.socket.on('chat message', function(msg: string) {
      alert(msg);
    });
  }

  handleLoginSubmit(e: any, v: string): void {
      alert('Username submitted: ' + v);
      e.preventDefault();
      this.setState({isLoggedIn: true});
  }
  
  render(this: App) {
    if (this.state.isLoggedIn) {
      return (
      <div className="App">
        <script src="/socket.io/socket.io.js" />
        <h1 />Logged in!
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
