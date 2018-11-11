import React from 'react';
import MessagesList from './componentes/messages';
import Login from './componentes/login';
import Signup from "./componentes/signup";
import SearchContacts from "./componentes/searchContacts";
import { BrowserRouter as Router, Route, Redirect, Link } from 'react-router-dom';
import { Menu, Icon, Tab } from "semantic-ui-react";

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

const App = () => {
    var divMargin = { marginTop: '50px' };
    if (checkAuth())
        divMargin = null;
    return (
        <div style={divMargin} >
            <Router>
                <div>
                    <PrivateMenu>
                        <Menu.Item>
                            <Link to="/">
                                <Icon name="home" link={true} size="large" />Home
                            </Link>
                        </Menu.Item>
                        <Menu.Item>
                            <Link to="/messages">
                                <Icon name="mail" size="large" />Messages
                            </Link>
                        </Menu.Item>
                        <Menu.Item>
                            <Link to="/search">
                                Search Contacts
                            </Link>
                        </Menu.Item>
                    </PrivateMenu>
                    
                    <Route exact path="/" render={() => <Redirect to="/messages" />}></Route>
                    <PrivateRoute path="/messages" component={MessagesList}></PrivateRoute>
                    <Route path="/signin" component={Login}></Route>
                    <Route exact path="/signup" component={Signup}></Route>
                    <PrivateRoute exact path="/search" component={SearchContacts} />

                </div>
            </Router>
        </div >)
};

export default App;

