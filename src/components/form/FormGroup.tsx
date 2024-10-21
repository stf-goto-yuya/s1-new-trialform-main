import React from 'react';

interface Props {
  children: React.ReactNode;
}

const FormGroup: React.FC<Props> = ({ children }) => (
  <section className="flex flex-col">{children}</section>
);

export default FormGroup;
