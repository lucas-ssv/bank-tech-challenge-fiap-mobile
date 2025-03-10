import { Box, HStack, Text, VStack } from '@/components/ui'
import { ScrollView } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'

import { Header } from './components/Header/Header'
import Footer from './components/Footer/Footer'
import ModalCriarConta from './components/ModalCriarConta/ModalCriarConta'
import ModalLogin from './components/ModalLogin/ModalLogin'

import IlustracaoBanner from '@/assets/ilustracao-banner.svg'
import Gift from '@/assets/presente.svg'
import Saque from '@/assets/saque.svg'
import Star from '@/assets/pontos.svg'
import Dispositivos from '@/assets/dispositivos.svg'

export function Home() {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <VStack className="bg-custom-my-light-green">
        <LinearGradient className="flex-1" colors={['#004D61', '#FFFFFF']}>
          <Header />
          <Box className="px-4 py-20">
            <Text size="4xl" className="text-black font-heading text-center">
              Experimente mais liberdade no controle da sua vida financeira.
              Crie sua conta com a gente!
            </Text>

            <IlustracaoBanner />

            <HStack className="w-full flex justify-center gap-8">
              <ModalCriarConta />

              <ModalLogin />
            </HStack>

            <Box>
              <Text
                size="3xl"
                className="mt-12 text-black font-heading text-center"
              >
                Vantagens do nosso banco:
              </Text>

              <Box className="flex justify-center items-center mt-20 gap-">
                <Gift />
                <Text
                  size="2xl"
                  className="mt-10 text-custom-my-green font-heading text-center"
                >
                  Conta e cartão gratuitos
                </Text>
                <Text
                  size="xl"
                  className="mt-6 text-custom-my-gray font-heading text-center"
                >
                  Isso mesmo, nossa conta é digital, sem custo fixo e mais que
                  isso: sem tarifa de manutenção.
                </Text>
              </Box>

              <Box className="flex justify-center items-center mt-20">
                <Saque />
                <Text
                  size="2xl"
                  className="mt-10 text-custom-my-green font-heading text-center"
                >
                  Saques sem custo
                </Text>
                <Text
                  size="xl"
                  className="mt-6 text-custom-my-gray text-center"
                >
                  Você pode sacar gratuitamente 4x por mês de qualquer Banco
                  24h.
                </Text>
              </Box>
              <Box className="flex justify-center items-center mt-20">
                <Star />
                <Text
                  size="2xl"
                  className="mt-10 text-custom-my-green font-heading text-center"
                >
                  Programa de pontos
                </Text>
                <Text
                  size="xl"
                  className="mt-6 text-custom-my-gray text-center"
                >
                  Você pode acumular pontos com suas compras no crédito sem
                  pagar mensalidade!
                </Text>
              </Box>
              <Box className="flex justify-center items-center mt-20">
                <Dispositivos />
                <Text
                  size="2xl"
                  className="mt-10 text-custom-my-green font-heading text-center"
                >
                  Seguro Dispositivos
                </Text>
                <Text
                  size="xl"
                  className="mt-6 text-custom-my-gray text-center"
                >
                  Seus dispositivos móveis (computador e laptop) protegidos por
                  uma mensalidade simbólica.
                </Text>
              </Box>
            </Box>
          </Box>
        </LinearGradient>

        <Footer />
      </VStack>
    </ScrollView>
  )
}
