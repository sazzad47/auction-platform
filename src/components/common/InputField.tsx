import React, { ChangeEvent } from 'react';

interface InputFieldProps {
    type: string;
    id: string;
    value: any;
    placeholder: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const InputField: React.FC<InputFieldProps> = ({ type, id, value, placeholder, onChange }) => (
    <input
        type={type}
        id={id}
        className="py-3 px-4 block w-full rounded-md text-sm border border-gray-300 focus:outline-fuchsia-400"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
    />
);

export default InputField;
