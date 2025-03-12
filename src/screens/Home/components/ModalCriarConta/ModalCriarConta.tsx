import React, { useState } from 'react'
import {
  Modal,
  ModalBackdrop,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  ButtonText,
  Box,
  Heading,
  CloseIcon,
  Icon,
  Text,
  FormControl,
  FormControlLabel,
  FormControlLabelText,
  Input,
  InputField,
  VStack,
} from '@/components/ui'

import IluNovaConta from '@/assets/cadastro.svg'
import { signUp } from '@/firebase/auth'
import { View } from 'react-native'

const ModalCriarConta = () => {
  const [showModal, setShowModal] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSignUp = async () => {
    try {
      const credentials = await signUp(name, email, password)
      console.log(credentials)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Box className="flex-1">
      <Button
        className="h-12 w-full bg-black rounded-lg"
        onPress={() => setShowModal(true)}
      >
        <ButtonText className="text-md">Abrir conta</ButtonText>
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

          <ModalBody>
            <View className="self-center">
              <IluNovaConta width={293} height={216} />
            </View>

            <Heading className="text-left text-lg mt-8">
              Preencha os campos abaixo para criar sua conta corrente!
            </Heading>

            <VStack className="w-full mt-8">
              <FormControl>
                <FormControlLabel>
                  <FormControlLabelText className="text-md font-bold">
                    Nome
                  </FormControlLabelText>
                </FormControlLabel>
                <Input className="h-12 bg-white border border-custom-my-input-border rounded-lg mt-2">
                  <InputField
                    className="text-md"
                    onChangeText={setName}
                    value={name}
                    placeholder="Digite seu Nome"
                  />
                </Input>
                <FormControlLabel className="mt-6">
                  <FormControlLabelText className="font-bold">
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
                  <FormControlLabelText className="font-bold">
                    Senha
                  </FormControlLabelText>
                </FormControlLabel>

                <Input className="h-12 bg-white border border-custom-my-input-border rounded-lg mt-2">
                  <InputField
                    className="text-md"
                    type="password"
                    placeholder="Digita sua senha"
                    onChangeText={setPassword}
                    value={password}
                  />
                </Input>
              </FormControl>
              <Button
                className="h-12 bg-custom-my-orange rounded-lg mt-8"
                onPress={handleSignUp}
              >
                <ButtonText className="text-md">Criar conta</ButtonText>
              </Button>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  )
}

export default ModalCriarConta
