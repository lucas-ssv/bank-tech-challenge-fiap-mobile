import { ComponentProps } from 'react'
import { Box, Heading, VStack } from '@/components/ui'
import Pixels from '@/assets/pixels-servicos.svg'
import Emprestimo from '@/assets/icone-emprestimo.svg'
import Cartoes from '@/assets/cartoes.svg'
import Doacoes from '@/assets/doacoes.svg'
import Pix from '@/assets/pix.svg'
import Seguros from '@/assets/seguros.svg'
import CreditoCelular from '@/assets/credito-celular.svg'
import { ServiceCardButton } from './components'
import { useNavigation } from '@react-navigation/native'

type Props = ComponentProps<typeof Box>

export function Services({ className, ...rest }: Props) {
  const navigation = useNavigation()

  return (
    <Box
      className={`bg-custom-my-gray-box py-8 px-6 rounded-lg overflow-hidden mt-6 ${className}`}
      {...rest}
    >
      <Pixels
        style={{
          position: 'absolute',
        }}
      />
      <Pixels
        style={{
          position: 'absolute',
          bottom: 0,
          right: 0,
          transform: [{ rotate: '180deg' }],
        }}
      />
      <Heading className="text-black text-center text-xl font-heading">
        Serviços
      </Heading>
      <VStack className="gap-4 mt-10">
        <ServiceCardButton title="Empréstimo" Icon={Emprestimo} />
        <ServiceCardButton
          title="Meus cartões"
          Icon={Cartoes}
          onPress={() =>
            navigation.navigate('StackRoutes', { screen: 'MeusCartoes' })
          }
        />
        <ServiceCardButton title="Doações" Icon={Doacoes} />
        <ServiceCardButton title="Pix" Icon={Pix} />
        <ServiceCardButton title="Seguros" Icon={Seguros} />
        <ServiceCardButton title="Crédito celular" Icon={CreditoCelular} />
      </VStack>
    </Box>
  )
}
