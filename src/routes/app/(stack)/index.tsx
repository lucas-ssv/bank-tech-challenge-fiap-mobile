import { Dashboard, MeusCartoes, Profile, Servicos } from '@/screens'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Feather from '@expo/vector-icons/Feather'
import { DrawerActions } from '@react-navigation/native'
import { DrawerScreenProps } from '@react-navigation/drawer'
import { DrawerParamList } from '@/@types/navigation'
import { AvatarMenu } from './components'

type Props = DrawerScreenProps<DrawerParamList, 'StackRoutes'>

const { Navigator, Screen } = createNativeStackNavigator()

export function StackRoutes({ navigation }: Props) {
  return (
    <Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#004D61',
        },
        headerTitleAlign: 'center',
        headerTintColor: '#FF5031',
        headerBackButtonDisplayMode: 'minimal',
        headerBackVisible: true,
        headerRight() {
          return <AvatarMenu />
        },
      }}
    >
      <Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          title: 'Início',
          headerLeft() {
            return (
              <Feather
                name="menu"
                color="#FF5031"
                size={20}
                onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
              />
            )
          },
        }}
      />
      <Screen
        name="Servicos"
        component={Servicos}
        options={{
          title: 'Serviços',
        }}
      />
      <Screen
        name="MeusCartoes"
        component={MeusCartoes}
        options={{
          title: 'Meus cartões',
        }}
      />
      <Screen
        name="Profile"
        component={Profile}
        options={{
          title: 'Meu perfil',
        }}
      />
    </Navigator>
  )
}
