import React, { Component } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import './My-form.css';
import CustomeInputText from '../FormElements/inputText/cutomeInputText'
import SelectInput from '../FormElements/RadioInput/RadioInput';
import { connect } from 'react-redux'
import { postNewSimpleUser, postNewAdminUser } from '../../store/actions/index';

class MyForm extends Component {
 
    render() {
        return (
            <div className="form">
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
                isManager : Yup.string()
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
                    this.props.history.push('/your-users');
                } else {
                    this.props.onPostNewAdminUser(values);
                    this.props.history.push('/all-users');
                }
            }}
            >
                {props =>{
                    return(
                    <form className="signup-form" onSubmit={props.handleSubmit}>
                        <CustomeInputText  label="Username" name="name" type="text" placeholder="entrer you username"/>
                        <CustomeInputText  label="Email" name="email" type="email" placeholder="entrer you email"/>
                        <CustomeInputText  label="Password" name="password" type="password" />
                        <SelectInput name="isAdmin">
                            <option value="true">True</option>
                            <option value='false'>False</option>
                        </SelectInput>
                        <button className="Btn" type="submit" disabled={!props.isValid || props.isSubmitting}>{!props.isSubmitting?"Submit" : "Loading..."}</button>
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