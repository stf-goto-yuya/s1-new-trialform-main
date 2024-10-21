import { Box, Container, Flex } from '@chakra-ui/react';
import React from 'react';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Box as="main" bg="gray.900" h="100vh">
    <Container maxW="container.xl" bg="gray.900" color="#262626" py={8}>
      <Flex
        justify="center"
        align="start"
        pt={{ base: 0, md: 8 }}
        direction="column"
      >
        {children}
      </Flex>
    </Container>
  </Box>
);

export default Layout;
