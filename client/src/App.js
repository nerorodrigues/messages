import React from 'react';
import MessagesList from './componentes/messages';
import Login from './componentes/login';
import Signup from "./componentes/signup";
import { BrowserRouter as Router, Route, Redirect, Link } from 'react-router-dom';
import { Menu, Icon } from "semantic-ui-react";

const checkAuth = () => {
    const token = localStorage.getItem('token');
    var isAuthenticated = token != null;
    return isAuthenticated;
}

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            checkAuth() ? (
                <Component {...props} />
            ) : (
                    <Redirect
                        to={{
                            pathname: "/signin",
                            state: { from: props.location }
                        }}
                    />
                )
        }
    />
);

const PrivateMenu = ({ children, ...props }) => (checkAuth() &&
    <Menu {...props}>
        {children}
    </Menu>
);



const App = () => (
    <div>
        <h3>Nero</h3>
        <Router>
            <div>
                <PrivateMenu>
                    <Menu.Item>
                        <Link to="/">
                            <Icon name="home" link={true} size="large" />Home
                            </Link>
                    </Menu.Item>
                    <Menu.Item>
                        <Link to="/signin">Signin</Link>
                    </Menu.Item>
                    <Menu.Item>
                        <Link to="/signup">signup</Link>
                    </Menu.Item>
                    <Menu.Item>
                        <Link to="/messages">
                            <Icon animated="fade" name="mail" size="large" />
                            Messages
                        </Link>
                    </Menu.Item>
                </PrivateMenu>
                <Route exact path="/" render={() => <Redirect to="/signin" />}></Route>
                <PrivateRoute path="/messages" component={MessagesList}></PrivateRoute>
                <Route path="/signin" component={Login}></Route>
                <Route exact path="/signup" component={Signup}></Route>
            </div>
        </Router>
    </div>);

export default App;

