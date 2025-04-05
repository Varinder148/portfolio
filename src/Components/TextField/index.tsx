import React, { useState } from "react";

interface Props {
  label: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
  type?: "text" | "number" | "email" | "password";
  placeholder?: string;
  validate?: (value: string) => string | undefined;
  multiline?: boolean;
  rows?: number;
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
}: Props) => {
  const [error, setError] = useState<string | undefined>("");
  const [touched, setTouched] = useState(false);

  // Handle input change
  const handleChange = (e: any) => {
    const { value } = e.target;
    onChange(value);

    // Run validation function when the value changes, but only if the field is touched
    if (touched && validate) {
      const errorMessage = validate(value);
      setError(errorMessage); // Set the error state based on the validation result
    }
  };

  // Handle focus event
  const handleFocus = () => {
    setTouched(true);
  };

  // Handle blur event (validation happens after blur)
  const handleBlur = () => {
    if (validate) {
      const errorMessage = validate(value);
      setError(errorMessage); // Trigger validation on blur
    }
  };

  return (
    <div className={`mb-4 ${className}`}>
      {/* Label */}
      <label
        htmlFor={label}
        className="block text-sm font-medium text-theme-black"
      >
        {label}
      </label>

      {/* Input or Textarea */}
      {multiline ? (
        <textarea
          id={label}
          value={value}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
          rows={rows}
          className={`mt-2 block w-full px-4 py-2 border rounded-md focus:outline-none ${
            error ? "border-red-500" : "border-gray-300"
          } focus:ring-0`}
        />
      ) : (
        <input
          type={type}
          id={label}
          value={value}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
          className={`mt-2 block w-full px-4 py-2 border rounded-md focus:outline-none ${
            error ? "border-red-500" : "border-gray-300"
          } focus:ring-0`}
        />
      )}

      {/* Error Message */}
      {error && touched && <p className="mt-2 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default TextField;
