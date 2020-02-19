import React from 'react';
import App from './App';
import { BrowserRouter, Route, Switch, Link, NavLink, Redirect} from 'react-router-dom';
import Login from './Components/Login/Login';

class AppRouter extends React.Component {

    state = {
        nameLogin: ''
    }

    onClick = (nameLogin) => {
        this.setState(({ nameLogin }), () => {
            // console.log(nameLogin)
        })
    }

    render() {
        return (
    <BrowserRouter>
    <Switch>
        <Route path='/' exact={true} render={props => <Login {...props} onClick={this.onClick} /> } />
        <Route path='/app' render={props => <App {...props} nameLogin={this.state.nameLogin} /> }/>
    </Switch>
</BrowserRouter>
)
        }
}

export default AppRouter;
