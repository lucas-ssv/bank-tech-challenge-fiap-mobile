import { createDrawerNavigator } from '@react-navigation/drawer'
import { AvatarMenu, DrawerContent } from '@/routes/app/(drawer)/components'
import { StackRoutes } from '../(stack)'
import { Dashboard } from '@/screens'
import Feather from '@expo/vector-icons/Feather'
import { DrawerActions, useNavigation } from '@react-navigation/native'

const { Navigator, Screen } = createDrawerNavigator()

export function DrawerRoutes() {
  const navigation = useNavigation()

  return (
    <Navigator
      drawerContent={(props) => <DrawerContent {...props} />}
      screenOptions={{
        headerTitle: '',
        headerLeft({ tintColor }) {
          return (
            <Feather
              name="menu"
              color={tintColor}
              size={22}
              style={{ marginStart: 16 }}
              onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
            />
          )
        },
        headerStyle: {
          backgroundColor: '#004D61',
        },
        headerLeftContainerStyle: {
          paddingHorizontal: 8,
        },
        headerRightContainerStyle: {
          paddingHorizontal: 24,
        },
        headerTintColor: '#FF5031',
        headerRight() {
          return <AvatarMenu />
        },
        drawerItemStyle: {
          borderRadius: 8,
        },
        drawerActiveBackgroundColor: '#FFFFFF',
        drawerActiveTintColor: '#004D61',
        drawerStyle: {
          backgroundColor: '#E4EDE3',
        },
      }}
    >
      <Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          title: 'Início',
        }}
      />
      <Screen
        name="StackRoutes"
        component={StackRoutes}
        options={{ headerShown: false, title: 'Outros serviços' }}
      />
    </Navigator>
  )
}
