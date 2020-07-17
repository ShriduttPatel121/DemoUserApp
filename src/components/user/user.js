import React from 'react';
//import { connect } from 'react-redux';
import classes from './user.css';
const User =  (props) =>{
    return(
        <div className={classes.userCard}>
            <h2 className={classes.userName}>Username: {props.userName}</h2>
            <p className={classes.Email}>email: {props.email}</p>
            { props.isAd ? <p className={classes.IsAdmin}>Manager</p> : <p className={classes.IsAdmin}>Employee</p>}
        </div>
    );
};


export default  User;