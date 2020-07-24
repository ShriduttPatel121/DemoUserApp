/* eslint-disable react/jsx-no-duplicate-props */
import React from "react";
import classes from'./inouttext.css'
import { useField } from "formik";
const CustomeInputText = (props) => {
    const [field, meta] = useField(props);
  return (
      <div className={classes.Input}>
        <label className={classes.Label} htmlFor={props.id || props.name}>{props.label}</label>
        <input className={meta.touched && meta.error ? [classes.InputElement, classes.Invalid].join(' '): classes.InputElement} {...field} {...props}></input>
        { meta.touched && meta.error ? (
          <div>
            <span style={{color:'red'}}>{meta.error}</span>
          </div>
        ) : null}
      </div>
  );
};
export default CustomeInputText;