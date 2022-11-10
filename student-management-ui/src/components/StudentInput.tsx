import React, { useState } from 'react';

interface Props {
  type: string;
  name: string;
  value: string;
  placeholder: string;
  required: boolean;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function StudentInput(props: Props) {


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
        onChange={props.handleChange}
      />
    </div>
  );
}

export default StudentInput;
