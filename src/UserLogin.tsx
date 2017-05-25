import * as React from 'react';

class UserLogin extends React.Component<{}, {value: string}> {
    constructor() {
        super();
        this.state = { value: ''};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    render() {
        return (
        <div>
            <h2>Web Chat Login</h2>

            <form name="login-form" id="loginForm" onSubmit={e => this.handleSubmit(e)}>
                <input 
                    id="user" 
                    type="text" 
                    value={this.state.value} 
                    onChange = {e => this.handleChange(e)}
                />
                <button>Login</button>
            </form>
            
        </div>
        );
    }

    handleChange(event: any): void {
        this.setState({value: event.target.value});
        // this.setState({value: 'bob'});
    }

    handleSubmit(event: any): void {
        alert('A username was submitted: ' + this.state.value);
        event.preventDefault();
    }
}

export default UserLogin;
