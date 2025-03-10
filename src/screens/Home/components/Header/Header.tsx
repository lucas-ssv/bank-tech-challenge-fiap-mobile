import React from "react";
import { Box } from "@/components/ui/box";
import { HStack } from "@/components/ui/hstack";
import Logo from '@/assets/logo.svg';
// import Menu from "@/Menu/Menu";


const Header = () => {
  return (
    <Box className='bg-black p-10 pt-24'>
      <HStack className='w-full flex justify-between'>
        {/* <Menu/> */}
        <Logo/>
      </HStack>
    </Box>
  );
};

export default Header;