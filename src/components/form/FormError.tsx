import React from 'react';

interface Props {
  error: string;
}

const FormError: React.FC<Props> = ({ error }) => (
  <small className="mb-4 text-pink-400 text-xs">{error}</small>
);

export default FormError;
