import { Button } from "@/components/ui/button";
import { Menu, MenuItem, MenuItemLabel } from "@/components/ui/menu";
import Feather from '@expo/vector-icons/Feather'

export function MainMenu () {
  return (
    <Menu
      className={'bg-black border-0 text-white flex justify-center align-middle'}
        placement="bottom left" 
        trigger={({ ...triggerProps }) => {
          return (
            <Button {...triggerProps} className="bg-transparent">
              <Feather
              name="menu"
              color={'#47A138'}
              size={32}
            />
            </Button>
          );
        }}
      >
        <MenuItem key="myAccount" className="bg-black text-center w-full flex justify-center" textValue="myAccount">
          <MenuItemLabel size="lg" className="text-custom-my-green border-b-2 border-custom-my-green pb-4">Minha conta</MenuItemLabel>
        </MenuItem>
        <MenuItem key="config" className="bg-black text-center w-full flex justify-center" textValue="config">
          <MenuItemLabel size="lg" className="text-white border-b-2 border-white pb-4">Configurações</MenuItemLabel>
        </MenuItem>
        <MenuItem key="sair" className="bg-black text-center w-full flex justify-center pb-5" textValue="sair">
          <MenuItemLabel size="lg" className="text-white ">Sair</MenuItemLabel>
        </MenuItem>
      </Menu>
  );
}