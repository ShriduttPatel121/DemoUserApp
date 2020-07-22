import React from "react";
import './radioInput.css';
import { useField } from "formik";
const SelectInput = (props) => {
  const [field, meta] = useField(props);
  console.log(meta)
  return (
      
    <div className="Input">
      <p className="Label">Do you want to create this person as new manager? :</p>
        <select {...field} {...props} className="InputElement"/>
        {(meta.touched && meta.error) ? (
        <div>
          <span style={{ color: "red" }}>{meta.error}</span>
        </div>
      ) : null}
    </div>
  );
};
export default SelectInput;
