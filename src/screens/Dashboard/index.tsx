import { FinancialFlowChart, NewTransaction } from './components'
import { VStack } from '@/components/ui'
import { Extract, Welcome } from '@/components'
import { ScrollView } from 'react-native'

export function Dashboard() {
  return (
    <ScrollView
      className="bg-custom-my-light-green"
      showsVerticalScrollIndicator={false}
    >
      <VStack className="flex-1 p-6">
        <Welcome />
        <NewTransaction />
        <FinancialFlowChart />
        <Extract />
      </VStack>
    </ScrollView>
  )
}
