import React, { Component } from 'react';
import classes from './newUser.css';
import { connect } from 'react-redux'
import { postNewSimpleUser, postNewAdminUser } from '../../store/actions/index';
import Spinner from '../../components/UI/spinner/Spinner';
//formik and redux forms....
class NewUser extends Component {
    emailRegx = RegExp(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/);
    tempArray = [false, false, false];
    state = {
        email : '',
        name : '',
        password : '',
        isAdmin : 'false',
        formErrorMessages : {
            email : true,
            password : true,
            name : true
        },
        btnDisabled : true
    }

    validateForm = (formErrorMessages) => {
        let valid = true;
        Object.values(formErrorMessages).forEach( val => !val && (valid = false))
        return valid;
    }

    formValidation = (e) => {
        let validity = false;
        const { name, value } = e.target;
        console.log(name + ' ' + value);
        for(let i=0; i <=2; i++) {          
            switch (name) {
                case 'email':
                    console.log('in email');
                    this.emailRegx.test(value) ? this.tempArray[0] = true : this.tempArray[0] = false
                    break
                case 'password':
                    console.log('in password');
                    value.length > 4 ? this.tempArray[1] = true : this.tempArray[1] = false
                    break
                case 'name':
                    console.log('in name');
                    value.length > 4 ? this.tempArray[2] = true : this.tempArray[2] = false
                    break
                default:
                    break;
            }
        }
        for( let i of this.tempArray) {
            if (i === false) {
                validity = i;
                break;
            } else {
                validity = true;
            }
        }

        this.setState({btnDisabled : !validity});
    }
    
    formSubmitHandler = (e) => {
        e.preventDefault();
        const userInfo = { ...this.state};
        if(this.state.isAdmin === 'false'){
            this.props.onPostNewSimpleUser(userInfo, this.props.currentUserId)
            this.props.history.push('/your-users');
        } else {
            this.props.onPostNewAdminUser(userInfo);
            this.props.history.push('/all-users');
        }
    }
    inputChangeHandle = (e) => {
       
        const { name, value } = e.target;
        let formErrorMessages = {...this.state.formErrorMessages};
        switch (name) {
            case 'email':
                this.emailRegx.test(value) ? formErrorMessages.email = true : formErrorMessages.email = false
                this.setState({email : value, formErrorMessages : formErrorMessages})
                break;
            case 'name':
                !(value.length > 4) ? formErrorMessages.name = false :formErrorMessages.name = true
                this.setState({name : value, formErrorMessages : formErrorMessages});
                break;
            case 'password':
                !(value.length > 4) ? formErrorMessages.password = false :formErrorMessages.password = true
                this.setState({password : value, formErrorMessages : formErrorMessages});
                break
            case 'isAdmin':
                console.log(e.target.value);
                this.setState({[name] : e.target.value})
                break;
            default:
                break;
        }
        this.formValidation(e);
    }
    render() {
        let form = <Spinner bColor="#f5f3f3"/>;
        if (!this.props.loading) {
             form = (
                <form onSubmit={this.formSubmitHandler}>
                        <label className={classes.Lable} htmlFor="email">Email: </label>{this.state.formErrorMessages.email ? null : <span style={{textAlign: 'center', color : 'red'}}>Invalid Email</span>}
                        <input required={true} value={this.state.email} onChange={this.inputChangeHandle} className={ this.state.formErrorMessages.email? classes.Input : [classes.Input, classes.Invalid].join(' ')} name="email" type="email"></input>
    
                        <label className={classes.Lable} htmlFor="name">Username: </label>{this.state.formErrorMessages.name ? null : <span style={{textAlign: 'center', color : 'red'}}>Username must have atleast 5 characters</span>}
                        <input required={true} value={this.state.name} onChange={this.inputChangeHandle} className={ this.state.formErrorMessages.name? classes.Input : [classes.Input, classes.Invalid].join(' ')} name="name" type="text"></input>
    
                        <label className={classes.Lable} htmlFor="password">Password: </label>{this.state.formErrorMessages.password ? null : <span style={{textAlign: 'center', color : 'red'}}>Password must have atleast 5 characters</span>}
                        <input required={true} value={this.state.password} onChange={this.inputChangeHandle} className={ this.state.formErrorMessages.password? classes.Input : [classes.Input, classes.Invalid].join(' ')} name="password" type="password"></input>
                        
                        <p className={classes.radioLable}>Do you want to create this person as new manager? :</p>
                        
                        <div className={classes.radioInput}>
                            <input name="isAdmin" type="radio" value='true' checked={this.state.isAdmin === 'true'} onChange={this.inputChangeHandle}></input>
                            <label className={classes.radioBtnLable} htmlFor="isAdmin">True: </label>
                        </div>
                        <div className={classes.radioInput}>
                            <input name="isAdmin" type="radio" value='false' checked={this.state.isAdmin === 'false'} onChange={this.inputChangeHandle}></input>
                            <label className={classes.radioBtnLable} htmlFor="isAdmin">False: </label>
                        </div>
                        <button disabled={this.state.btnDisabled} className={classes.Btn}>Add user</button>
                    </form>);
        }
        
        return (
            <div className={classes.NewUserForm}>
                {form}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        currentUserId : state.currentUser.Id,
        loading : state.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onPostNewSimpleUser : (formData, currentUserId) => dispatch(postNewSimpleUser(formData, currentUserId)),
        onPostNewAdminUser : (formData) => dispatch(postNewAdminUser(formData))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(NewUser);