import React from 'react';

interface Props {
  creating: boolean;
}

const SubmitButton: React.FC<Props> = ({ creating }) => (
  <section className="w-full flex justify-center items-center">
    {creating ? (
      <span className="bg-gray-200 py-2 px-4 text-gray-600 rounded">
        送信中...
      </span>
    ) : (
      <button
        className="bg-purple-500 py-1 px-4 text-white text-sm rounded py-2 px-32"
        type="submit"
      >
        送信
      </button>
    )}
  </section>
);

export default SubmitButton;
