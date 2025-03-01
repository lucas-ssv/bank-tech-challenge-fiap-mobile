import { Icon, Pressable, Text, VStack } from '@/components/ui'
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer'
import Avatar from '@/assets/avatar.svg'
import { SafeAreaView } from 'react-native-safe-area-context'

type Props = DrawerContentComponentProps

export function Drawer(props: Props) {
  return (
    <DrawerContentScrollView
      bounces={false}
      contentContainerStyle={{
        marginLeft: 0,
        paddingStart: 0,
        paddingEnd: 0,
        paddingTop: 0,
      }}
      {...props}
    >
      <SafeAreaView className="bg-custom-my-dark-green">
        <VStack className="bg-custom-my-dark-green my-4 px-4">
          <Pressable>
            <Icon as={Avatar} className="w-12 h-12 text-typography-[#FF5031]" />
          </Pressable>
          <Text className="text-white text-lg font-medium mt-2">John Due</Text>
          <Text className="text-white text-sm font-body mt-1">
            johndue@email.com
          </Text>
        </VStack>
      </SafeAreaView>

      <VStack className="p-4">
        <DrawerItemList {...props} />
      </VStack>
    </DrawerContentScrollView>
  )
}
