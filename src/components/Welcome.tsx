import { ComponentProps, useEffect, useState } from 'react'
import { TouchableOpacity, View } from 'react-native'
import { Box, Divider, Heading, HStack, Text } from '@/components/ui'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import Pixels from '@/assets/pixels.svg'
import Illustration from '@/assets/ilustracao.svg'
import { useAuth } from '@/contexts'
import { getFormattedDate } from '@/utils'
import { BlurView } from 'expo-blur'
import { getStorageBalanceBlurred, setStorageBalanceBlurred } from '@/storage'

type Props = ComponentProps<typeof Box>

export function Welcome({ ...rest }: Props) {
  const { user } = useAuth()
  const [balanceBlurred, setBalanceBlurred] = useState(true)

  const handleBlurredBalance = async () => {
    await setStorageBalanceBlurred(String(!balanceBlurred))
    setBalanceBlurred(!balanceBlurred)
  }

  useEffect(() => {
    async function loadBalanceBlurred() {
      const balanceBlurred = await getStorageBalanceBlurred()
      setBalanceBlurred(Boolean(balanceBlurred))
    }
    loadBalanceBlurred()
  }, [])

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
        <TouchableOpacity onPress={handleBlurredBalance}>
          {balanceBlurred ? (
            <MaterialIcons name="visibility" size={20} color="#FFFFFF" />
          ) : (
            <MaterialIcons name="visibility-off" size={20} color="#FFFFFF" />
          )}
        </TouchableOpacity>
      </HStack>
      <Divider className="h-[2px] my-4" />
      <Text className="text-white text-md">Conta Corrente</Text>
      <View>
        {balanceBlurred && (
          <BlurView
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              borderRadius: 8,
              zIndex: 1,
            }}
            intensity={50}
            tint="light"
          />
        )}
        <Text className="text-white text-2xl font-body mt-2">R$ 2.500,00</Text>
      </View>
    </Box>
  )
}
