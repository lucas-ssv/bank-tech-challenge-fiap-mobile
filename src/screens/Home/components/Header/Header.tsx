import React from 'react'
import { Box } from '@/components/ui/box'
import { HStack } from '@/components/ui/hstack'
import Logo from '@/assets/logo.svg'
import { MainMenu } from '../Menu/Menu'

export function Header() {
  return (
    <Box className="bg-black p-10 pt-24">
      <HStack className="w-full flex justify-between">
        <MainMenu/>
        <Logo />
      </HStack>
    </Box>
  )
}
