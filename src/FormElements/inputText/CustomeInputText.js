/* eslint-disable react/jsx-no-duplicate-props */
import React from "react";
import './inouttext.css'
import { useField } from "formik";
const CustomeInputText = (props) => {
    const [field, meta] = useField(props);
  return (
      <div className="Input">
        <label className="Label" htmlFor={props.id || props.name}>{props.label}</label>
        <input className={meta.touched && meta.error ? "InputElement Invalid": "InputElement"} {...field} {...props}></input>
        { meta.touched && meta.error ? (
          <div>
            <span style={{color:'red'}}>{meta.error}</span>
          </div>
        ) : null}
      </div>
  );
};
export default CustomeInputText;