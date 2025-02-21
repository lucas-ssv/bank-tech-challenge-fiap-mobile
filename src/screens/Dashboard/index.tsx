import { NewTransaction, Welcome } from './components'
import { VStack } from '@/components/ui'
import { Extract } from '@/components'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScrollView } from 'react-native'

export function Dashboard() {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <VStack className="flex-1 bg-custom-my-light-green px-6">
        <SafeAreaView>
          <Welcome />
          <NewTransaction className="mt-6" />
          <Extract className="mt-6" />
        </SafeAreaView>
      </VStack>
    </ScrollView>
  )
}
