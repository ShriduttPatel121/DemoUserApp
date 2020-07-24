import React, { Component } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import classes from './My-form.css';
import CustomeInputText from '../FormElements/inputText/CustomeInputText'
import SelectInput from '../FormElements/RadioInput/RadioInput';
import { connect } from 'react-redux'
import { postNewSimpleUser, postNewAdminUser } from '../../store/actions/index';
import Spinner from '../../components/UI/spinner/Spinner';

class MyForm extends Component {
 
    render() {
        let form = (<div>
        <CustomeInputText  label="Username" name="name" type="text" placeholder="entrer you username"/>
        <CustomeInputText  label="Email" name="email" type="email" placeholder="entrer you email"/>
        <CustomeInputText  label="Password" name="password" type="password" />
        <SelectInput name="isAdmin">
            <option value="true">True</option>
            <option value='false'>False</option>
        </SelectInput>
        </div>
        );
    if (this.props.loading) {
        form = <Spinner bColor='#f5f3f3'/>
    }
        return (
            <div className={classes.form}>
            <Formik
                initialValues = {{
                    name : '',
                    email : '',
                    password : '',
                    isAdmin : 'true'
            }}
            
            validationSchema={Yup.object({
                name : Yup.string()
                    .min(4, '4 characters or more')
                    .max(25, '25 characters or less')
                    .required('This field is required'),
                email : Yup.string()
                .max(30, '30 characters or less')
                .matches(RegExp(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/), 'Invalid email.')
                .required('This field is required'),
                password : Yup.string()
                .min(6, 'password must have atleast 6 or more characters')
                .required('This field is required')
                .matches(RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})"), 'Must haveatleast one captal letter and spacial letter'),
                isAdmin : Yup.string()
                .oneOf(['true', 'false'],'You have to select either of this options')
                .required('This field is required')
                
            })}
            
            onSubmit= {(values, {setSubmitting, resetForm}) => {
                /* setTimeout(() => {
                    alert(JSON.stringify(values));
                    resetForm();
                    setSubmitting(false)
                },3000) */
                if (values.isAdmin === 'false') {
                    this.props.onPostNewSimpleUser(values, this.props.currentUserId)
                    resetForm();
                    setSubmitting(false)
                    this.props.history.push('/your-users');
                } if (values.isAdmin === 'true') {
                    this.props.onPostNewAdminUser(values);
                    resetForm();
                    setSubmitting(false)
                    setTimeout(() => {
                        this.props.history.push('/all-users');
                    },50)
                }
            }}
            >
                {props =>{
                    return(
                    <form className="signup-form" onSubmit={props.handleSubmit}>
                        {form}
                    <button className={classes.Btn} type="submit" disabled={!props.isValid || props.isSubmitting}>{!props.isSubmitting?"Submit" : "Loading..."}</button>
                    </form>
                )}}
            </Formik>
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

export default connect(mapStateToProps, mapDispatchToProps)(MyForm);