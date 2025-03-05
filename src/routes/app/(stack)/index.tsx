import { MeusCartoes, Servicos } from '@/screens'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { AvatarMenu } from '@/routes/app/(drawer)/components'
import Feather from '@expo/vector-icons/Feather'
import { HStack } from '@/components/ui'
import { SafeAreaView } from 'react-native-safe-area-context'
import { DrawerActions } from '@react-navigation/native'
import { RectButton } from 'react-native-gesture-handler'

type StackParamList = {
  MeusCartoes: undefined
  Servicos: undefined
}

type DrawerParamList = {
  StackRoutes: {
    screen: keyof StackParamList
  }
}

declare global {
  namespace ReactNavigation {
    interface RootParamList extends DrawerParamList {}
  }
}

const { Navigator, Screen } = createNativeStackNavigator()

export function StackRoutes() {
  return (
    <Navigator
      screenOptions={{
        title: '',
        headerStyle: {
          backgroundColor: '#004D61',
        },
        headerTintColor: '#FF5031',
        header({ navigation }) {
          return (
            <SafeAreaView className="bg-custom-my-dark-green elevation-lg">
              <HStack className="items-center justify-between px-6 py-4">
                <HStack className="items-center gap-4">
                  <Feather
                    name="menu"
                    color="#FF5031"
                    size={20}
                    onPress={() =>
                      navigation.dispatch(DrawerActions.openDrawer())
                    }
                  />
                  {navigation.canGoBack() && (
                    <RectButton onPress={() => navigation.goBack()}>
                      <Feather name="arrow-left" color="#FF5031" size={20} />
                    </RectButton>
                  )}
                </HStack>
                <AvatarMenu />
              </HStack>
            </SafeAreaView>
          )
        },
      }}
    >
      <Screen name="Servicos" component={Servicos} />
      <Screen name="MeusCartoes" component={MeusCartoes} />
    </Navigator>
  )
}
