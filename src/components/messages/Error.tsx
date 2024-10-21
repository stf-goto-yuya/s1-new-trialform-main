import React from 'react';

interface Props {
  error: string;
}

const Error: React.FC<Props> = ({ error }) => (
  <section className="bg-pink-200 w-full py-4 px-6 text-pink-600 mb-8 rounded">
    {error}
  </section>
);

export default Error;
