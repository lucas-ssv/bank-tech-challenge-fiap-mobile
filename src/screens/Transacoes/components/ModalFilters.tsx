import { useState } from 'react'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import {
  Button,
  ButtonText,
  FormControl,
  FormControlLabel,
  FormControlLabelText,
  Heading,
  HStack,
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
} from '@/components/ui'
import Close from '@/assets/close-black.svg'
import ArrowDropdown from '@/assets/arrow-dropdown.svg'
import { InputDate } from '@/components'

export function ModalFilters() {
  const [isOpen, setIsOpen] = useState(false)
  const [date, setDate] = useState(new Date())

  return (
    <>
      <Button
        className="h-12 w-12 bg-custom-my-dark-green rounded-full p-0"
        onPress={() => setIsOpen(true)}
      >
        <MaterialIcons name="tune" color="#FFFFFF" size={24} />
      </Button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} size="lg">
        <ModalBackdrop />
        <ModalContent>
          <ModalHeader>
            <Heading className="text-lg">Filtrar por transações</Heading>
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

            <HStack className="gap-4 mt-4">
              <FormControl className="flex-1">
                <FormControlLabel>
                  <FormControlLabelText className="text-md text-black">
                    Valor mínimo
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
              <FormControl className="flex-1">
                <FormControlLabel>
                  <FormControlLabelText className="text-md text-black">
                    Valor máximo
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
            </HStack>
          </ModalBody>
          <ModalFooter>
            <HStack className="gap-4">
              <Button
                className="flex-1 h-12 bg-custom-my-extract-date-color rounded-lg"
                variant="solid"
              >
                <ButtonText className="text-md">Limpar</ButtonText>
              </Button>
              <Button
                className="flex-1 h-12 bg-custom-my-dark-green rounded-lg"
                variant="solid"
              >
                <ButtonText className="text-md">Filtrar</ButtonText>
              </Button>
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
