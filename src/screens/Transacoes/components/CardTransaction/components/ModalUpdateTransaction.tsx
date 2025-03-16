import { useState } from 'react'
import {
  Box,
  Button,
  ButtonText,
  FormControl,
  FormControlLabel,
  FormControlLabelText,
  Heading,
  Input,
  InputField,
  Modal,
  ModalBackdrop,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicator,
  SelectDragIndicatorWrapper,
  SelectIcon,
  SelectInput,
  SelectItem,
  SelectPortal,
  SelectTrigger,
  Text,
  VStack,
} from '@/components/ui'
import { InputDate, ModalImage } from '@/components'
import Pencil from '@/assets/lapis.svg'
import Close from '@/assets/close-black.svg'
import ArrowDropdown from '@/assets/arrow-dropdown.svg'

export function ModalUpdateTransaction() {
  const [isOpen, setIsOpen] = useState(false)
  const [date, setDate] = useState(new Date())

  return (
    <>
      <Button
        className="h-12 w-12 bg-custom-my-dark-green rounded-full p-0"
        onPress={() => setIsOpen(true)}
      >
        <Pencil />
      </Button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} size="lg">
        <ModalBackdrop />
        <ModalContent>
          <ModalHeader>
            <Heading className="text-lg">Editar transação</Heading>
            <ModalCloseButton>
              <Close />
            </ModalCloseButton>
          </ModalHeader>
          <ModalBody
            automaticallyAdjustKeyboardInsets
            showsVerticalScrollIndicator={false}
          >
            <FormControl className="mt-4">
              <Select>
                <SelectTrigger
                  variant="outline"
                  size="xl"
                  className="h-12 bg-white border border-custom-my-dark-green rounded-lg"
                >
                  <SelectInput
                    className="flex-1 text-md placeholder:text-custom-my-placeholder"
                    placeholder="Selecione o tipo de transação"
                  />
                  <SelectIcon className="mr-3" size="sm" as={ArrowDropdown} />
                </SelectTrigger>
                <SelectPortal>
                  <SelectBackdrop />
                  <SelectContent>
                    <SelectDragIndicatorWrapper>
                      <SelectDragIndicator />
                    </SelectDragIndicatorWrapper>
                    <SelectItem label="UX Research" value="ux" />
                    <SelectItem label="Web Development" value="web" />
                    <SelectItem
                      label="Cross Platform Development Process"
                      value="Cross Platform Development Process"
                    />
                    <SelectItem
                      label="UI Designing"
                      value="ui"
                      isDisabled={true}
                    />
                    <SelectItem label="Backend Development" value="backend" />
                  </SelectContent>
                </SelectPortal>
              </Select>
            </FormControl>

            <FormControl className="mt-4">
              <FormControlLabel>
                <FormControlLabelText className="text-md text-black">
                  Data da transação
                </FormControlLabelText>
              </FormControlLabel>
              <InputDate
                className="bg-white border border-custom-my-dark-green text-black"
                textColor="text-black"
                date={date}
                setDate={setDate}
              />
            </FormControl>

            <FormControl className="mt-4">
              <FormControlLabel>
                <FormControlLabelText className="text-md text-black">
                  Valor
                </FormControlLabelText>
              </FormControlLabel>
              <Input className="h-12 bg-white border border-custom-my-dark-green rounded-lg">
                <InputField
                  keyboardType="numeric"
                  className="text-black"
                  placeholder="R$ 00,00"
                />
              </Input>
            </FormControl>

            <VStack className="gap-1 mt-4">
              <Text className="text-md text-black">
                Documentos relacionados
              </Text>
              <Box className="border border-dashed border-custom-my-dark-green rounded-lg p-2">
                <ModalImage uri="https://images.unsplash.com/photo-1472214103451-9374bd1c798e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" />
              </Box>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button
              className="flex-1 h-12 bg-custom-my-dark-green rounded-lg"
              variant="solid"
            >
              <ButtonText className="text-md">Editar transação</ButtonText>
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
