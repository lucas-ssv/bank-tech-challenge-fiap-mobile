import { ComponentProps, useContext } from 'react'
import { TouchableOpacity } from 'react-native'
import { Box, Divider, Heading, HStack, Text } from '@/components/ui'
import EyeIcon from '@/assets/olho.svg'
import Pixels from '@/assets/pixels.svg'
import Illustration from '@/assets/ilustracao.svg'
import { AuthContext } from '@/contexts'

type Props = ComponentProps<typeof Box>

export function Welcome({ ...rest }: Props) {
  const authContext = useContext(AuthContext)
  const { user } = authContext

  function getFormattedDate() {
    const date = new Date()
    const options: Intl.DateTimeFormatOptions = { weekday: "long", day: "2-digit", month: "2-digit", year: "numeric" }
    return date.toLocaleDateString("pt-BR", options)
  }

  return (
    <Box
      className="h-[655px] bg-custom-my-dark-green py-10 px-[66px] rounded-lg overflow-hidden"
      {...rest}
    >
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
          marginHorizontal: 16,
        }}
      />
      <Heading className="text-white text-center font-semibold text-xl">
        Olá, {user?.displayName} :)
      </Heading>
      <Text className="text-white text-center text-sm mt-6">
        {getFormattedDate()}
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
