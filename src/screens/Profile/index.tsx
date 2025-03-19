import { useState } from 'react'
import {
  Box,
  Button,
  ButtonText,
  FormControl,
  Heading,
  VStack,
} from '@/components/ui'
import Pixels from '@/assets/pixels-servicos.svg'
import Illustration from '@/assets/ilu-profile.svg'
import { ScrollView } from 'react-native'
import { Input } from './components'

import { useAuth } from '@/contexts'

export function Profile() {
  const { userData } = useAuth()
  const [name, setName] = useState(userData.name || '')
  const [email, setEmail] = useState(userData.email || '')

  return (
    <ScrollView
      className="bg-custom-my-light-green"
      showsVerticalScrollIndicator={false}
    >
      <VStack className="flex-1 p-6">
        <Box className="bg-custom-my-gray-box py-8 px-6 rounded-lg overflow-hidden mt-6">
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
            Minha conta
          </Heading>

          <FormControl>
            <Input
              label="Nome"
              type="text"
              value={name}
              onChangeText={setName}
              placeholder="Nome"
            />
            <Input
              label="E-mail"
              type="text"
              value={email}
              onChangeText={setEmail}
              placeholder="E-mail"
            />
            <Input label="Senha" type="password" placeholder="Senha" />
            <Button className="h-12 bg-custom-my-orange rounded-lg mt-6">
              <ButtonText className="text-md">Salvar alterações</ButtonText>
            </Button>
          </FormControl>
          <Illustration
            width={279}
            height={238}
            style={{
              marginTop: 24,
              alignSelf: 'center',
              marginHorizontal: 16,
            }}
          />
        </Box>
      </VStack>
    </ScrollView>
  )
}
