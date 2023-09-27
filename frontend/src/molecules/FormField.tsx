import React from "react";

interface FormFieldInterface {
  label: string;
  name: string;
  type: string;
  placeholder: string;
  onChange: any;
}

const FormField = ({
  label,
  name,
  type,
  placeholder,
  onChange,
}: FormFieldInterface) => {
  return (
    <div className="m-3">
      <label htmlFor={name}>{label}</label>
      <input
        name={name}
        id={name}
        type={type}
        onChange={onChange}
        placeholder={placeholder}
        className="placeholder-gray-500 w-[60%] rounded-[5px] h-[30px] text-slate-800 pl-[14px]"
      />
    </div>
  );
};

export default FormField;
