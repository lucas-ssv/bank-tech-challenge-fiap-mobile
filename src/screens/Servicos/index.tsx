import { Extract, Welcome } from '@/components'
import { VStack } from '@/components/ui'
import { Services } from './components'
import { ScrollView } from 'react-native'

export function Servicos() {
  return (
    <ScrollView
      className="bg-custom-my-light-green"
      showsVerticalScrollIndicator={false}
    >
      <VStack className="flex-1 p-6">
        <Welcome />
        <Services />
        <Extract />
      </VStack>
    </ScrollView>
  )
}
