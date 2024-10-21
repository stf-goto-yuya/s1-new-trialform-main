import React from 'react';

interface Props {
  column: string;
  label: string;
  hasError: boolean;
}

const FormLabel: React.FC<Props> = ({ column, label, hasError }) => (
  <label
    className={`text-xs mb-2 ${hasError ? 'text-pink-400' : 'text-purple-300'}`}
    htmlFor={column}
  >
    {label}
  </label>
);

export default FormLabel;
