import { Heading } from '@chakra-ui/react';
import React from 'react';

interface Props {
  title: string;
}

const PageHeader: React.FC<Props> = ({ title }) => (
  <Heading
    w="full"
    textAlign="center"
    color="white"
    letterSpacing={2}
    fontSize={{ base: 20, md: 28 }}
    fontWeight="normal"
    my={6}
  >
    {title}
  </Heading>
);

export default PageHeader;
