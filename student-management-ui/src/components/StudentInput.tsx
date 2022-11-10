import React, { useState } from 'react';

interface Props {
  type: string;
  name: string;
  value: string;
  placeholder: string;
  required: boolean;
  pattern: string;
  errorMessage: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function StudentInput(props: Props) {
  const [focused, setFocused] = useState(false);

  function handleFocus() {
    setFocused(true);
  }

  return (
    <div className='w-9/12'>
      <label className='block font-light'>{props.placeholder}</label>
      <input
        className={`w-full rounded border bg-my-white py-0.5 pl-2 ${
          focused ? 'focused' : ''
        }`}
        type={props.type}
        name={props.name}
        value={props.value}
        placeholder={props.placeholder}
        required={props.required}
        pattern={props.pattern}
        onChange={props.handleChange}
        onBlur={handleFocus}
      />
      <span
        id='error-message'
        className='invisible inline-block h-16 py-2 text-xs text-red-500 md:text-sm'
      >
        {props.errorMessage}
      </span>
    </div>
  );
}

export default StudentInput;
