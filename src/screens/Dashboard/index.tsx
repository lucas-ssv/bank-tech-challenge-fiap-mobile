import { FinancialFlowChart, NewTransaction, Welcome } from './components'
import { VStack } from '@/components/ui'
import { Extract } from '@/components'
import { ScrollView } from 'react-native'

export function Dashboard() {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <VStack className="flex-1 bg-custom-my-light-green p-6">
        <Welcome />
        <NewTransaction className="mt-6" />
        <FinancialFlowChart className="mt-6" />
        <Extract className="mt-6" />
      </VStack>
    </ScrollView>
  )
}
