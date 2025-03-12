import React, { useState } from 'react'
import {
  Modal,
  ModalBackdrop,
  ModalContent,
  ModalHeader,
  ModalBody,
} from '@/components/ui'

import { Button, ButtonText } from '@/components/ui'
import { Box } from '@/components/ui'
import { Heading } from '@/components/ui'
import { CloseIcon, Icon } from '@/components/ui'
import { Text } from '@/components/ui'

import {
  FormControl,
  FormControlLabel,
  FormControlLabelText,
} from '@/components/ui'

import { Input, InputField } from '@/components/ui'
import { VStack } from '@/components/ui'
import IluNovaConta from '@/assets/cadastro.svg'
import { signUp } from '@/firebase/auth'

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
    <Box>
      <Button
        size="lg"
        variant="solid"
        action="primary"
        className="bg-black"
        onPress={() => setShowModal(true)}
      >
        <ButtonText>Abrir conta</ButtonText>
      </Button>

      <Modal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false)
        }}
        size="lg"
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
            <Box className="w-[50px] max-w-[50px]">
              <IluNovaConta />
            </Box>

            <Heading className="text-left text-lg">
              Preencha os campos abaixo para criar sua conta corrente!
            </Heading>

            <VStack className="w-full mt-6">
              <FormControl>
                <FormControlLabel>
                  <FormControlLabelText className="font-bold">
                    Nome
                  </FormControlLabelText>
                </FormControlLabel>
                <Input variant="outline" size="md">
                  <InputField
                    onChangeText={setName}
                    value={name}
                    placeholder="Digite seu Nome"
                  />
                </Input>
                <FormControlLabel className="mt-8">
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
                    onChangeText={setPassword}
                    value={password}
                  />
                </Input>
              </FormControl>
              <Button
                className="w-fit self-center mt-4"
                size="sm"
                onPress={handleSignUp}
              >
                <ButtonText>Criar conta</ButtonText>
              </Button>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  )
}

export default ModalCriarConta
