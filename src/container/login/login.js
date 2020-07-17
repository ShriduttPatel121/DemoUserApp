import React, { Component } from 'react';
import classes from './login.css';
import { connect } from 'react-redux'
import { auth } from '../../store/actions/index'
import Spinner from '../../components/UI/spinner/Spinner';
class LoginForm extends Component {

    emailRegx = RegExp(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/);
    state = {
        email : '',
        password : '',
        formErrorMessages : {
            email : true,
            password : true
        }
    }

    formSubmitHandler = (event) => {
        event.preventDefault();
        if (this.validateForm(this.state.formErrorMessages)) {
            this.props.onAuth(this.state.email, this.state.password);
        }
    }

    validateForm = (formErrorMessages) => {
        let valid = true;
        Object.values(formErrorMessages).forEach( val => !val && (valid = false))
        return valid;
    }
    
    componentDidUpdate() {
        if (this.props.isAuth) {
            this.props.history.push('/your-users');
        }
    }

    ipChangeHandler = event => {
        let formErrorMessages = {...this.state.formErrorMessages};
        const { name , value} = event.target ;
        switch (name) {
            case 'email':
                this.emailRegx.test(value) ? formErrorMessages.email = true : formErrorMessages.email = false
                this.setState({email : value, formErrorMessages : formErrorMessages})
                break;
            
            case 'password':
                !(value.length > 0) ? formErrorMessages.password = false :formErrorMessages.password = true
                this.setState({password : value, formErrorMessages : formErrorMessages});

                break;

            default:
                break;
        }


    }
    render() {
        let form = <Spinner bColor="#f5f3f3"/>
        if (!this.props.loading) {
            form = (
                <form className={classes.LoginForm} onSubmit={this.formSubmitHandler}>
                {this.props.authFailMessage.length !== 0 ? <p style={{color: 'red', textAlign: 'center'}}>{this.props.authFailMessage}</p> : null}
                        <label className={classes.Lable} >Email: </label>
                        <input required={true} className={this.state.formErrorMessages.email ?classes.Input : [classes.Input, classes.Invalid].join(' ')} type="text" name="email" value={this.state.email} onChange={this.ipChangeHandler}></input>
                        {/* {this.state.formErrorMessages.email.length > 0 ? <span style={{color : 'red'}}>{this.state.formErrorMessages.email}</span> : null} */}

                        <label className={classes.Lable}>Password: </label>
                        <input value={this.state.password} className={classes.Input} type="password" name="password" onChange={this.ipChangeHandler} required={true}></input>
                    <button className={classes.Btn}>Login</button>
                </form>
            );
        }
        return (
            <div className={classes.Login}>
                {form}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuth : state.isAutneticated,
        authuccess : state.authuccess,
        authFailMessage : state.authFailMessage,
        loading : state.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth : (email, password) => dispatch(auth(email, password)),
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(LoginForm);