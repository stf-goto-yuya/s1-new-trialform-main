import React from 'react';

interface Props {
  children: React.ReactNode;
}

const FormRow: React.FC<Props> = ({ children }) => (
  <section className="flex flex-row flex-wrap">{children}</section>
);

export default FormRow;
