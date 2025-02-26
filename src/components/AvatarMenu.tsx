import React from 'react'
import { Pressable } from 'react-native'
import { Menu, Icon, MenuItem, MenuItemLabel } from './ui'
import Feather from '@expo/vector-icons/Feather'
import Avatar from '@/assets/avatar.svg'

export function AvatarMenu() {
  return (
    <Menu
      placement="bottom"
      className="border border-custom-my-dark-green bg-black rounded-lg"
      offset={5}
      trigger={({ ...triggerProps }) => {
        return (
          <Pressable {...triggerProps}>
            <Icon as={Avatar} className="w-10 h-10 text-typography-[#FF5031]" />
          </Pressable>
        )
      }}
    >
      <MenuItem
        key="Minha conta"
        className="active:!bg-custom-my-placeholder"
        textValue="Minha conta"
      >
        <Feather name="user" color="#47A138" size={16} className="mr-2" />
        <MenuItemLabel className="text-white" size="sm">
          Minha conta
        </MenuItemLabel>
      </MenuItem>
      <MenuItem
        key="Configurações"
        className="active:!bg-custom-my-placeholder"
        textValue="Configurações"
      >
        <Feather name="settings" color="#47A138" size={16} className="mr-2" />
        <MenuItemLabel className="text-white" size="sm">
          Configurações
        </MenuItemLabel>
      </MenuItem>
      <MenuItem
        key="Sair"
        className="active:!bg-custom-my-placeholder"
        textValue="Sair"
      >
        <Feather name="log-out" color="#47A138" size={16} className="mr-2" />
        <MenuItemLabel className="text-white" size="sm">
          Sair
        </MenuItemLabel>
      </MenuItem>
    </Menu>
  )
}
