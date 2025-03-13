import React, { useState } from 'react'
import {
  Modal,
  ModalBackdrop,
  ModalContent,
  ModalHeader,
  ModalBody,
  FormControl,
  FormControlLabel,
  FormControlLabelText,
  Box,
  Button,
  ButtonText,
  CloseIcon,
  Heading,
  Icon,
  Text,
  Input,
  InputField,
  VStack,
} from '@/components/ui'

import BannerLogin from '@/assets/login.svg'
import { login } from '@/firebase/auth'
import { View } from 'react-native'

export function ModalLogin() {
  const [showModal, setShowModal] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async () => {
    try {
      const user = await login(email, password)
      console.log(user)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Box className="flex-1">
      <Button
        variant="outline"
        className="h-12 w-full border-2 border-black rounded-lg"
        onPress={() => setShowModal(true)}
      >
        <ButtonText className="text-md text-black">Já tenho conta</ButtonText>
      </Button>

      <Modal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false)
        }}
        size="lg"
      >
        <ModalBackdrop />

        <ModalContent>
          <ModalHeader className="w-full flex justify-end">
            <Text
              onPress={() => {
                setShowModal(false)
              }}
            >
              <Icon
                as={CloseIcon}
                size="md"
                className="stroke-background-400 group-[:hover]/modal-close-button:stroke-background-700 group-[:active]/modal-close-button:stroke-background-900 group-[:focus-visible]/modal-close-button:stroke-background-900"
              />
            </Text>
          </ModalHeader>

          <ModalBody
            automaticallyAdjustKeyboardInsets
            showsVerticalScrollIndicator={false}
          >
            <View className="self-center">
              <BannerLogin width={293} height={216} />
            </View>

            <Heading className="text-center mt-8">Login</Heading>

            <VStack className="w-full mt-8">
              <FormControl>
                <FormControlLabel>
                  <FormControlLabelText className="text-md font-bold">
                    Email
                  </FormControlLabelText>
                </FormControlLabel>
                <Input className="h-12 bg-white border border-custom-my-input-border rounded-lg mt-2">
                  <InputField
                    className="text-md"
                    onChangeText={setEmail}
                    value={email}
                    placeholder="Digite seu email"
                  />
                </Input>
                <FormControlLabel className="mt-6">
                  <FormControlLabelText className="text-md font-bold">
                    Senha
                  </FormControlLabelText>
                </FormControlLabel>

                <Input className="h-12 bg-white border border-custom-my-input-border rounded-lg mt-2">
                  <InputField
                    className="text-md"
                    type="password"
                    placeholder="Digita sua senha"
                    value={password}
                    onChangeText={setPassword}
                  />
                </Input>

                <Button variant="link" className="self-start mt-2">
                  <ButtonText className="text-md !font-body text-custom-my-green underline">
                    Esqueci a senha!
                  </ButtonText>
                </Button>
              </FormControl>
              <Button
                className="h-12 bg-custom-my-orange rounded-lg mt-8"
                onPress={handleLogin}
              >
                <ButtonText className="text-md">Entrar</ButtonText>
              </Button>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  )
}
