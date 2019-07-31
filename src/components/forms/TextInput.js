import React from "react";

/**
 * Logic to render single label and text input
 */
export default ({ input, label, meta: { error, touched }, placeholder, type }) => {
  return (
    <div>
      <label>{label}</label>
      <input
        {...input}
        style={{ marginBottom: "5px" }}
        placeholder={placeholder}
        type={type ? type : "text"}
      />
      <div className='red-text' style={{ marginBottom: "5px" }}>
        {touched && error}
      </div>
    </div>
  );
};
