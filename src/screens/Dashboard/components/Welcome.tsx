import { TouchableOpacity } from 'react-native'
import { Box, Divider, Heading, HStack, Text } from '@/components/ui'
import EyeIcon from '@/assets/olho.svg'
import Pixels from '@/assets/pixels.svg'
import Illustration from '@/assets/ilustracao.svg'

export function Welcome() {
  return (
    <Box className="h-[655px] bg-custom-my-dark-green py-10 px-[66px] rounded-lg overflow-hidden">
      <Pixels
        style={{
          position: 'absolute',
          top: 0,
          transform: [{ rotate: '180deg' }],
        }}
      />
      <Pixels
        style={{
          position: 'absolute',
          bottom: 0,
          right: 0,
        }}
      />
      <Illustration
        style={{
          position: 'absolute',
          bottom: 34,
          alignSelf: 'center',
        }}
      />
      <Heading className="text-white text-center font-semibold text-xl">
        Olá, Joana :)
      </Heading>
      <Text className="text-white text-center text-sm mt-6">
        Quinta-feira, 08/09/2022
      </Text>
      <HStack className="items-center gap-6 mt-10">
        <Heading className="text-white font-semibold text-lg">Saldo</Heading>
        <TouchableOpacity>
          <EyeIcon width={20} height={20} />
        </TouchableOpacity>
      </HStack>
      <Divider className="h-[2px] my-4" />
      <Text className="text-white text-md">Conta Corrente</Text>
      <Text className="text-white text-2xl font-body mt-2">R$ 2.500,00</Text>
    </Box>
  )
}
