import React from 'react';
import classes from './adminUser.css';
import User from '../user/user';
import { connect } from 'react-redux';

const AdminUser = (props) =>{
   let simpleUsers = props.simpleUserList.map(simpleUser => <User key={simpleUser.Id} 
        userName={simpleUser.UserName} 
        email={simpleUser.Email} 
        isAd={false}/>);
   
    return(
        <React.Fragment>
            <div onClick={props.getClickedManagersEmployees} className={classes.userCard}>
            <h2 className={classes.userName}>Username: {props.userName}</h2>
            <p className={classes.Email}>email: {props.email}</p>
            <p className={classes.IsAdmin}>Manager</p>
        </div>
        {simpleUsers}
        </React.Fragment>
    );
};

const mapStateToProps = state => {
    return {
        loading : state.loading
    }
}
export default connect(mapStateToProps,null)(AdminUser);