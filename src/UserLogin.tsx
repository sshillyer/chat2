import * as React from 'react';

interface UserLoginProps {
    handleLoginSubmit: (e: any, v: string) => void;
}

class UserLogin extends React.Component<UserLoginProps, {value: string}> {
    constructor() {
        super();
        this.state = { value: ''};

        this.handleChange = this.handleChange.bind(this);
        // this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    render() {
        return (
        <div className="userlogin">
            <h2>Web Chat Login</h2>
            <form name="login-form" id="loginForm" onSubmit={e => this.props.handleLoginSubmit(e, this.state.value)}>
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
    }

    // handleSubmit(event: any): void {
    //     alert('Username submitted: ' + this.state.value);
    //     event.preventDefault();
    // }
}

export default UserLogin;
