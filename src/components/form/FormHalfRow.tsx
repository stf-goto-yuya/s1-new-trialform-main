import React from 'react';

interface Props {
  children: React.ReactNode;
}

const FormHalfRow: React.FC<Props> = ({ children }) => (
  <section className="w-full md:w-1/2 p-2">{children}</section>
);

export default FormHalfRow;
