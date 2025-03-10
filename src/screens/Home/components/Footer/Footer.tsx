import React from "react";

import Logo from '@/assets/logo.svg'
import Insta from '@/assets/instagram.svg'
import Wpp from '@/assets/whatsapp.svg'
import Youtube from '@/assets/youtube.svg'


import { Linking } from "react-native";
import { Box, HStack, Text } from "@/components/ui";

const Footer = () => {
  return (
    <Box className='bg-black p-10'>

      <Text size="md" className="mt-4 text-white font-bold">
        Serviços
      </Text>
      <Text size="md" className="mt-4 text-white">
      Conta corrente
      </Text>
      <Text size="md" className="mt-4 text-white">
        Conta PJ
      </Text>
      <Text size="md" className="mt-4 text-white">
        Cartão de crédito
      </Text>

      <Text size="md" className="mt-8 text-white font-bold">
        Contato
      </Text>
      <Text size="md" className="mt-4 text-white">
        0800 004 250 08
      </Text>
      <Text size="md" className="mt-4 text-white">
        meajuda@bytebank.com.br
      </Text>
      <Text size="md" className="mt-4 mb-8 text-white">
        ouvidoria@bytebank.com.br
      </Text>
    
      <Logo/>
      <HStack className='w-full flex gap-8 mt-8'>
        <Text onPress={() => Linking.openURL('https://instagram.com')}>
          <Insta/>
        </Text>
        <Text onPress={() => Linking.openURL('https://web.whatsapp.com')}>
          <Wpp/>
        </Text>
        <Text onPress={() => Linking.openURL('https://youtube.com')}>
          <Youtube />
        </Text>
      </HStack>
    </Box>
  );
};

export default Footer;