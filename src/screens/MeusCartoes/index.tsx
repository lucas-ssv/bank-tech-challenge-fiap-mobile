import { Extract, Welcome } from '@/components'
import { VStack } from '@/components/ui'
import { ScrollView } from 'react-native-gesture-handler'

export function MeusCartoes() {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <VStack className="flex-1 bg-custom-my-light-green p-6">
        <Welcome />
        <Extract />
      </VStack>
    </ScrollView>
  )
}
