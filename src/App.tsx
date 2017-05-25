import * as React from 'react';
import UserLogin from './UserLogin';
import './App.css';

class App extends React.Component<{}, null> {
  render() {
    return (
      <div className="App">
        <UserLogin />
      </div>
    );
  }
}

export default App;
