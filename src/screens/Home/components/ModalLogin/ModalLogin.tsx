import React, { useState } from 'react'
import {
  Modal,
  ModalBackdrop,
  ModalContent,
  ModalHeader,
  ModalBody,
} from '@/components/ui/modal'

import {
  Box,
  Button,
  ButtonText,
  CloseIcon,
  Heading,
  Icon,
  Text,
} from '@/components/ui'

import {
  FormControl,
  FormControlLabel,
  FormControlLabelText,
  FormControlHelper,
  FormControlHelperText,
} from '@/components/ui/form-control'

import { Input, InputField } from '@/components/ui/input'
import { VStack } from '@/components/ui/vstack'

import BannerLogin from '@/assets/login.svg'
import { login } from '@/firebase/auth'

import { Alert } from "react-native";

const ModalLogin = () => {
  const [showModal, setShowModal] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async () => {
    try {
      const user = await login(email, password)
      console.log(user)
    } catch (error) {
      console.error(error)
      Alert.alert("Erro", "E-mail ou senha inválido. Tente novamente.");
    }
  }

  return (
    <Box>
      <Button
        size="lg"
        variant="outline"
        action="primary"
        className="text-black border-black h-16 rounded-lg"
        onPress={() => setShowModal(true)}
      >
        <ButtonText className='text-black'>Ja tenho conta</ButtonText>
      </Button>

      <Modal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false)
        }}
        size="md"
      >
        <ModalBackdrop />

        <ModalContent className={'absolute top-20'}>
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
            <BannerLogin width='auto'/>

            <Heading className="text-center">Login</Heading>

            <VStack className="w-full mt-6">
              <FormControl>
                <FormControlLabel>
                  <FormControlLabelText className="font-bold">
                    Email
                  </FormControlLabelText>
                </FormControlLabel>
                <Input variant="outline" size="md">
                  <InputField
                    onChangeText={setEmail}
                    value={email}
                    placeholder="Digite seu email"
                  />
                </Input>
                <FormControlLabel className="mt-8">
                  <FormControlLabelText className="font-bold">
                    Senha
                  </FormControlLabelText>
                </FormControlLabel>

                <Input className="my-1">
                  <InputField
                    type="password"
                    placeholder="Digita sua senha"
                    value={password}
                    onChangeText={setPassword}
                  />
                </Input>
                <FormControlHelper>
                  <FormControlHelperText className="text-custom-my-green underline">
                    Esqueci a senha!
                  </FormControlHelperText>
                </FormControlHelper>
              </FormControl>
              <Button
                className="w-fit self-center mt-4"
                size="sm"
                onPress={handleLogin}
              >
                <ButtonText>Entrar</ButtonText>
              </Button>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  )
}

export default ModalLogin
