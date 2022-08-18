import React from "react";

function Input({ placeholder, name, onChange }) {
  return (
    <div className="input-type">
      <input
        type="text"
        placeholder={placeholder}
        name={name}
        onChange={(e) => onChange({ [name]: e.target.value })}
      />
    </div>
  );
}

export default Input;
