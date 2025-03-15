import React, { ComponentProps } from 'react'
import { Pressable } from 'react-native'
import { Menu, Icon, MenuItem, MenuItemLabel } from '@/components/ui'
import Feather from '@expo/vector-icons/Feather'
import Avatar from '@/assets/avatar.svg'
import { useNavigation } from '@react-navigation/native'
import { logout } from "@/firebase/auth";

type Props = Omit<ComponentProps<typeof Menu>, 'trigger'>

export function AvatarMenu({ ...rest }: Props) {
  const navigation = useNavigation()

  const handleLogout = async () => {
    await logout();
    navigation.navigate('StackRoutes', { screen: 'Home' });
  };

  return (
    <Menu
      placement="left bottom"
      className="border border-custom-my-dark-green bg-black rounded-lg z-50 ios:mt-20 ios:ml-10"
      offset={5}
      trigger={({ ...triggerProps }) => {
        return (
          <Pressable {...triggerProps}>
            <Icon as={Avatar} className="w-10 h-10 text-typography-[#FF5031]" />
          </Pressable>
        )
      }}
      {...rest}
    >
      <MenuItem
        key="Minha conta"
        className="active:!bg-custom-my-placeholder"
        textValue="Minha conta"
        onPress={() =>
          navigation.navigate('StackRoutes', { screen: 'Profile' })
        }
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
        onPress={handleLogout}
      >
        <Feather name="log-out" color="#47A138" size={16} className="mr-2" />
        <MenuItemLabel className="text-white" size="sm">
          Sair
        </MenuItemLabel>
      </MenuItem>
    </Menu>
  )
}
