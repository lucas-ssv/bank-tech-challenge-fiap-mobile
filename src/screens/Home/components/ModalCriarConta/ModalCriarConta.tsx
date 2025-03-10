import React, { useState } from "react";
import {
  Modal,
  ModalBackdrop,
  ModalContent,
  ModalHeader,
  ModalBody,
} from "@/components/ui/modal"

import { Button, ButtonText } from "@/components/ui/button";
import { Box } from "@/components/ui/box";
import { Heading } from "@/components/ui/heading";
import { CloseIcon, Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";

import {
  FormControl,
  FormControlLabel,
  FormControlLabelText,
} from "@/components/ui/form-control"

import { Input, InputField } from "@/components/ui/input"
import { VStack } from "@/components/ui/vstack"
import { CheckIcon } from "@/components/ui/icon"
import IluNovaConta from "@/assets/cadastro.svg";

const ModalCriarConta = () => {
  const [showModal, setShowModal] = useState(false)
  const [isInvalid, setIsInvalid] = useState(false)
  const [inputValue, setInputValue] = useState("12345")
  const handleSubmit = () => {
    if (inputValue.length < 6) {
      setIsInvalid(true)
    } else {
      setIsInvalid(false)
    }
  }
  return (
    <Box>
      <Button size="lg" variant="solid" action="primary" className='bg-black' onPress={() => setShowModal(true)}>
        <ButtonText>
          Abrir conta
        </ButtonText>
      </Button>

      <Modal isOpen={showModal} onClose={() => {setShowModal(false)}} size="lg">
        <ModalBackdrop />
        
        <ModalContent className={'absolute top-20'}>
          <ModalHeader className="w-full flex justify-end">
            <Text onPress={() => {setShowModal(false)}}>
              <Icon
                as={CloseIcon}
                size="md"
                className="stroke-background-400 group-[:hover]/modal-close-button:stroke-background-700 group-[:active]/modal-close-button:stroke-background-900 group-[:focus-visible]/modal-close-button:stroke-background-900"
                />
            </Text>
          </ModalHeader>

          <ModalBody>


            <Box className="w-[50px] max-w-[50px]">
              <IluNovaConta className="w-full"/>
            </Box>
            
            <Heading className="text-left text-lg">
              Preencha os campos abaixo para criar sua conta corrente!
            </Heading>

            <VStack className="w-full mt-6">

            <FormControl
                isInvalid={isInvalid}
                size="md"
                isDisabled={false}
                isReadOnly={false}
                isRequired={true}>
                   <FormControlLabel>
                <FormControlLabelText className="font-bold"> Nome</FormControlLabelText>
              </FormControlLabel>
              <Input
                variant="outline"
                size="md"
                isDisabled={false}
                isInvalid={false}
                isReadOnly={false}>
            <InputField placeholder="Digite seu Nome" />
              </Input>
              <FormControlLabel className="mt-8">
                <FormControlLabelText className="font-bold"> Email</FormControlLabelText>
              </FormControlLabel>
              <Input
                variant="outline"
                size="md"
                isDisabled={false}
                isInvalid={false}
                isReadOnly={false}>
            <InputField placeholder="Digite seu email" />
              </Input>
                <FormControlLabel className="mt-8">
                  <FormControlLabelText className="font-bold">Senha</FormControlLabelText>
                </FormControlLabel>
                
                <Input className="my-1">
                  <InputField
                    type="password"
                    placeholder="Digita sua senha"
                    value={inputValue}
                    onChangeText={(text) => setInputValue(text)}
                  />
                </Input>

              </FormControl>
              <Button className="w-fit self-center mt-4" size="sm" onPress={handleSubmit}>
                <ButtonText>Criar conta</ButtonText>
              </Button>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
  </Box>

  );
};

export default ModalCriarConta;