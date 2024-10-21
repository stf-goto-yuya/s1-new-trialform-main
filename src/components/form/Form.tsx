import { Box } from '@chakra-ui/react';
import React from 'react';

interface Props {
  children: React.ReactNode;
  handleSubmit: any;
}

const Form: React.FC<Props> = ({ children, handleSubmit }) => (
  <Box
    as="form"
    className="w-full rounded-lg py-8 pb-8 md:pb-32 px-2 sm:px-12 md:px-24 lg:px-64"
    style={{ backgroundColor: '#262e4a' }}
    onSubmit={handleSubmit}
  >
    {children}
  </Box>
);

export default Form;
