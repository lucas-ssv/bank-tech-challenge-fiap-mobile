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

import { View, TouchableOpacity } from "react-native";

import { Input, InputField } from '@/components/ui'
import { VStack } from '@/components/ui'
import IluNovaConta from '@/assets/cadastro.svg'
import { signUp } from '@/firebase/auth'

const ModalCriarConta = () => {
  const [showModal, setShowModal] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isChecked, setIsChecked] = useState(false);

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
        className="bg-black h-16 rounded-lg"
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
            <IluNovaConta  width='100%'/>

            <Heading className="text-left text-lg mt-5">
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
                <FormControlLabel className="mt-3">
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
                <FormControlLabel className="mt-3">
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

                <TouchableOpacity
                  onPress={() => setIsChecked(!isChecked)}
                  className='mt-5'
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <View
                    className='border-custom-my-green'
                    style={{
                      width: 24,
                      height: 24,
                      borderRadius: 5,
                      borderWidth: 2,
                      alignItems: "center",
                      justifyContent: "center",
                      marginRight: 8,
                      backgroundColor: isChecked ? "#4CAF50" : "transparent",
                    }}
                  >
                    {isChecked && <Text style={{ color: "#fff" }}>✓</Text>}
                  </View>
                  <Text>Li e estou ciente quanto às condições de tratamento dos meus dados conforme descrito na Política de Privacidade do banco.</Text>
                </TouchableOpacity>
              </FormControl>
              <Button
                className="w-fit self-center mt-4 bg-custom-my-orange"
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
