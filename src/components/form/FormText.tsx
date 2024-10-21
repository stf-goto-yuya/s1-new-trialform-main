import React from 'react';

interface Props {
  name: string;
  value: string;
  onChange: any;
  hasError: boolean;
}

const FormText: React.FC<Props> = ({ name, value, onChange, hasError }) => (
  <input
    className={`
        mb-2
        border
        ${hasError ? 'border-pink-400' : 'border-gray-900'}
        ${hasError ? 'text-pink-400' : 'text-purple-400'}
        text-sm p-2 focus:border-purple-400 rounded
      `}
    style={{ backgroundColor: '#262e4a' }}
    type="text"
    name={name}
    value={value}
    onChange={onChange}
  />
);

export default FormText;
