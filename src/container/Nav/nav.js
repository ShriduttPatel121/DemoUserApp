import React, { Component } from 'react';
import {Route, NavLink, Switch, Redirect} from 'react-router-dom';
import AllUsers from '../AllUsers/AllUsers';
import YourUsers from '../YourUsers/YourUsers';
import NewUser from '../NewUser/newUser';
import classes from './nav.css';
import LoginForm from '../login/login';
import { connect } from 'react-redux'
import { setAuthtoFalse } from '../../store/actions/index'
class Navbar extends Component {
        
    state = {
        isAutneticated : false
    }
    logOutHandler = () => {
        this.setState({isAutneticated : false});
        this.props.onLogout();

    }

    logInHandler = () => {
        this.setState({isAutneticated : true});
        
    }
    render() {
        let links = null;
        let routes = null;
        if (this.props.isAuth){
            routes = (
                <Switch>
                        <Route path='/all-users' component={AllUsers} />
                        <Route path='/your-users' component={YourUsers} />
                        <Route path='/new-user' component={NewUser} />
                        <Route path='/login' component={LoginForm} />
                    </Switch>
            );
        } else {
            routes = (
                    <Switch>
                        <Route path='/login' component={LoginForm} />
                        <Redirect to="/login" />
                    </Switch>
            );
        }
        if (this.props.isAuth){
            links = (
            <div className={classes.link_list}>
                <ul className={classes.link_list}>
                    <li className={classes.NavLinks}><NavLink activeClassName={classes.active} to="/all-users">Managers</NavLink></li>
                    <li className={classes.NavLinks}><NavLink activeClassName={classes.active} to="/your-users">Your employees</NavLink></li>
                    <li className={classes.NavLinks}><NavLink activeClassName={classes.active} to="/new-user">New employee</NavLink></li>
                    <li className={classes.NavLinks_log}><NavLink activeClassName={classes.btn} onClick={this.logOutHandler}  to="/login">Logout</NavLink></li>
                </ul>
            </div>
            );
        } else {
            links = (
                <div className={classes.link_list}>
                    <ul className={classes.link_list}>
                        <li className={classes.NavLinks_log}><NavLink id="logBtn" onClick={this.logInHandler} to="/login" className={classes.btn}>Login</NavLink></li>
                    </ul>
                </div>
            );
        }
        return (
            <div>
                <header>
                    <nav>
                        {links}
                    </nav>
                </header>
                <main>
                    {routes}
                </main>
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        isAuth : state.isAutneticated
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLogout : () => dispatch(setAuthtoFalse())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Navbar);