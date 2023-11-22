import React, { ReactNode } from 'react';

interface InputLabelProps {
    htmlFor: string;
    children: ReactNode;
}

const InputLabel: React.FC<InputLabelProps> = ({ htmlFor, children }) => (
    <label htmlFor={htmlFor} className="text-lg font-medium">
        {children}
    </label>
);

export default InputLabel;
