import React, { useState } from "react";

export interface TextFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
  type?: "text" | "number" | "email" | "password";
  placeholder?: string;
  validate?: (value: string) => string | undefined;
  multiline?: boolean;
  rows?: number;
  name?: string;
}

const TextField = ({
  label,
  value,
  onChange,
  className = "",
  type = "text",
  placeholder = "",
  validate = () => "",
  multiline = false,
  rows = 7,
  name = "",
}: TextFieldProps) => {
  const [error, setError] = useState<string | undefined>("");
  const [touched, setTouched] = useState(false);
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { value } = e.target;
    onChange(value);
    if (touched && validate) {
      setError(validate(value));
    }
  };
  const handleFocus = () => setTouched(true);
  const handleBlur = () => {
    if (validate) setError(validate(value));
  };
  return (
    <div className={`mb-4 ${className}`}>
      <label
        htmlFor={label}
        className="block text-sm font-medium text-theme-black"
      >
        {label}
      </label>
      {multiline ? (
        <textarea
          id={label}
          value={value}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
          rows={rows}
          name={name}
          className={`mt-2 block w-full px-4 py-2 border rounded-md focus:outline-none ${error ? "border-red-500" : "border-gray-300"} focus:ring-0`}
        />
      ) : (
        <input
          type={type}
          id={label}
          value={value}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          name={name}
          placeholder={placeholder}
          className={`mt-2 block w-full px-4 py-2 border rounded-md focus:outline-none ${error ? "border-red-500" : "border-gray-300"} focus:ring-0`}
        />
      )}
      {error && touched && <p className="mt-2 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default React.memo(TextField);
