import { Extract, Welcome } from '@/components'
import { Box, Heading, VStack } from '@/components/ui'
import PixelsServices from '@/assets/pixels-servicos.svg'
import { Card } from './components'
import { ScrollView } from 'react-native'

export function MeusCartoes() {
  return (
    <ScrollView
      className="bg-custom-my-light-green"
      showsVerticalScrollIndicator={false}
    >
      <VStack className="flex-1 p-6">
        <Welcome />
        <Box className="bg-custom-my-gray-box py-8 px-4 rounded-lg overflow-hidden mt-6">
          <PixelsServices
            style={{
              position: 'absolute',
            }}
          />
          <PixelsServices
            style={{
              position: 'absolute',
              bottom: 0,
              right: 0,
              transform: [{ rotate: '180deg' }],
            }}
          />
          <Heading className="text-black text-center text-xl font-heading">
            Meus cartões
          </Heading>

          <VStack className="gap-8 mt-8">
            <Card variant="unlocked" />
          </VStack>
        </Box>
        <Extract />
      </VStack>
    </ScrollView>
  )
}
