import React, { useState } from 'react'
import {
  Modal,
  ModalBackdrop,
  ModalContent,
  ModalHeader,
  ModalBody,
} from '@/components/ui/modal'

import { Box, Button, ButtonText, Heading } from '@/components/ui'

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

const ModalLogin = () => {
  const [showModal, setShowModal] = useState(false)
  const [isInvalid, setIsInvalid] = useState(false)
  const [inputValue, setInputValue] = useState('12345')
  const handleSubmit = () => {
    if (inputValue.length < 6) {
      setIsInvalid(true)
    } else {
      setIsInvalid(false)
    }
  }
  return (
    <Box>
      <Button
        size="lg"
        variant="outline"
        action="primary"
        className="text-black border-black"
        onPress={() => setShowModal(true)}
      >
        <ButtonText>Ja tenho conta</ButtonText>
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
            {/* <Text onPress={() => {setShowModal(false)}}>
              <Icon
                as={CloseIcon}
                size="md"
                className="stroke-background-400 group-[:hover]/modal-close-button:stroke-background-700 group-[:active]/modal-close-button:stroke-background-900 group-[:focus-visible]/modal-close-button:stroke-background-900"
                />
            </Text> */}
          </ModalHeader>

          <ModalBody>
            <BannerLogin />

            <Heading className="text-center">Login</Heading>

            <VStack className="w-full mt-6">
              <FormControl
                isInvalid={isInvalid}
                size="md"
                isDisabled={false}
                isReadOnly={false}
                isRequired={true}
              >
                <FormControlLabel>
                  <FormControlLabelText className="font-bold">
                    {' '}
                    Email
                  </FormControlLabelText>
                </FormControlLabel>
                <Input
                  variant="outline"
                  size="md"
                  isDisabled={false}
                  isInvalid={false}
                  isReadOnly={false}
                >
                  <InputField placeholder="Digite seu email" />
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
                    value={inputValue}
                    onChangeText={(text) => setInputValue(text)}
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
                onPress={handleSubmit}
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
