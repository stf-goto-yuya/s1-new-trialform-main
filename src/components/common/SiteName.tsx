import { Heading } from '@chakra-ui/react';

const SiteName = () => (
  <Heading
    textAlign="center"
    color="white"
    fontSize={18}
    fontWeight="normal"
    className="w-full text-center text-white text-xs mb-4"
  >
    {process.env.SITE_NAME}
  </Heading>
);

export default SiteName;
