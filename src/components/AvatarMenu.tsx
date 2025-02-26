import React from 'react'
import { Pressable } from 'react-native'
import { Menu, Icon, MenuItem, MenuItemLabel } from './ui'
import Feather from '@expo/vector-icons/Feather'
import Avatar from '@/assets/avatar.svg'

export function AvatarMenu() {
  return (
    <Menu
      placement="bottom"
      offset={5}
      trigger={({ ...triggerProps }) => {
        return (
          <Pressable {...triggerProps}>
            <Icon as={Avatar} className="w-10 h-10 text-typography-[#FF5031]" />
          </Pressable>
        )
      }}
    >
      <MenuItem key="Minha conta" textValue="Minha conta">
        <Feather name="user" size={16} className="mr-2" />
        <MenuItemLabel size="sm">Minha conta</MenuItemLabel>
      </MenuItem>
      <MenuItem key="Configurações" textValue="Configurações">
        <Feather name="settings" size={16} className="mr-2" />
        <MenuItemLabel size="sm">Configurações</MenuItemLabel>
      </MenuItem>
      <MenuItem key="Sair" textValue="Sair">
        <Feather name="log-out" size={16} className="mr-2" />
        <MenuItemLabel size="sm">Sair</MenuItemLabel>
      </MenuItem>
    </Menu>
  )
}
