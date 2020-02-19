import React from 'react';
import { Link } from 'react-router-dom';

class Login extends React.Component {

    state = {
        loginName: ''
    }

    onChange = (e) => {
        const loginName = e.target.value;
        this.setState({ loginName });
    }

    onClick = (e) => {
        this.props.onClick(this.state.loginName)
        this.props.history.push('/app')
    }
    render() {
        return (<div className='login-page'>
                <div className="login-form">
                <form onSubmit={this.onClick}>
                <input className="login-input" type="text" placeholder="Login Name" value={this.state.loginName} onChange={this.onChange}></input>
                <button className="login-button" type="submit">Login</button>
                </form>
                </div>
            </div>)
    }
}

export default Login;

