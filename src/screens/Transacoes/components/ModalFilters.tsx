import { useState } from 'react'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import {
  Button,
  ButtonSpinner,
  ButtonText,
  Divider,
  FormControl,
  FormControlLabel,
  FormControlLabelText,
  Heading,
  HStack,
  Input,
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
import { z } from 'zod'
import { TransactionType } from '@/models'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { TextInputMask } from 'react-native-masked-text'
import { useTransaction } from '@/contexts'
import { useToast } from '@/hooks'

type FilterTransactionData = z.infer<typeof schema>

const schema = z.object({
  transactionType: z.nativeEnum(TransactionType).nullish(),
  minValue: z.string().nullish(),
  maxValue: z.string().nullish(),
})

export function ModalFilters() {
  const { fetchTransactions, filterTransactions } = useTransaction()
  const toast = useToast()
  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      transactionType: TransactionType.CAMBIO_DE_MOEDA,
      minValue: 'R$0,00',
      maxValue: 'R$0,00',
    },
  })
  const [isOpen, setIsOpen] = useState(false)
  const [date, setDate] = useState<Date>(new Date())

  const onFilterTransaction = async (data: FilterTransactionData) => {
    try {
      const { transactionType, minValue, maxValue } = data
      const numericMinValue = Number(
        minValue!.replace(/[^0-9,]/g, '').replace(',', '.'),
      )
      const numericMaxValue = Number(
        maxValue!.replace(/[^0-9,]/g, '').replace(',', '.'),
      )

      await filterTransactions({
        transactionType,
        minValue: numericMinValue,
        maxValue: numericMaxValue,
        date,
      })

      setIsOpen(false)
    } catch (error) {
      toast('error', 'Ocorreu um erro ao filtrar pelas transações', error.code)
    }
  }

  const handleResetFields = () => {
    fetchTransactions()
    reset()
    setIsOpen(false)
  }

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
              <Controller
                control={control}
                name="transactionType"
                render={({ field: { onChange, value } }) => (
                  <Select onValueChange={onChange} selectedValue={value}>
                    <SelectTrigger
                      variant="outline"
                      size="xl"
                      className="h-12 bg-white border border-custom-my-dark-green rounded-lg"
                    >
                      <SelectInput
                        className="flex-1 text-md placeholder:text-custom-my-placeholder"
                        placeholder="Selecione o tipo de transação"
                      />
                      <SelectIcon
                        className="mr-3"
                        size="sm"
                        as={ArrowDropdown}
                      />
                    </SelectTrigger>
                    <SelectPortal>
                      <SelectBackdrop />
                      <SelectContent>
                        <SelectDragIndicatorWrapper>
                          <SelectDragIndicator />
                        </SelectDragIndicatorWrapper>
                        <Heading className="text-md my-4">
                          Escolha o tipo de transação
                        </Heading>
                        <Divider />
                        <SelectItem label="Câmbio de moeda" value="cambio" />
                        <SelectItem label="DOC/TED" value="doc/ted" />
                        <SelectItem
                          label="Empréstimo e Financiamento"
                          value="emprestimo"
                        />
                        <SelectItem label="Depósito" value="deposito" />
                        <SelectItem label="Débito" value="debito" />
                        <SelectItem label="Crédito" value="credito" />
                      </SelectContent>
                    </SelectPortal>
                  </Select>
                )}
              />
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
                <Controller
                  control={control}
                  name="minValue"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Input className="h-12 bg-white border border-custom-my-dark-green rounded-lg">
                      <TextInputMask
                        type="money"
                        value={value!}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        style={{
                          flex: 1,
                          height: '100%',
                          paddingHorizontal: 16,
                          fontSize: 16,
                        }}
                        includeRawValueInChangeText
                      />
                    </Input>
                  )}
                />
              </FormControl>
              <FormControl className="flex-1">
                <FormControlLabel>
                  <FormControlLabelText className="text-md text-black">
                    Valor máximo
                  </FormControlLabelText>
                </FormControlLabel>
                <Controller
                  control={control}
                  name="maxValue"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Input className="h-12 bg-white border border-custom-my-dark-green rounded-lg">
                      <TextInputMask
                        type="money"
                        value={value!}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        style={{
                          flex: 1,
                          height: '100%',
                          paddingHorizontal: 16,
                          fontSize: 16,
                        }}
                        includeRawValueInChangeText
                      />
                    </Input>
                  )}
                />
              </FormControl>
            </HStack>
          </ModalBody>
          <ModalFooter>
            <HStack className="gap-4">
              <Button
                className="flex-1 h-12 bg-custom-my-extract-date-color rounded-lg"
                variant="solid"
                onPress={handleResetFields}
              >
                <ButtonText className="text-md">Limpar</ButtonText>
              </Button>
              <Button
                className="flex-1 h-12 bg-custom-my-dark-green rounded-lg"
                variant="solid"
                onPress={handleSubmit(onFilterTransaction)}
                isDisabled={isSubmitting}
              >
                {isSubmitting && <ButtonSpinner className="text-white" />}
                <ButtonText className="text-md">Filtrar</ButtonText>
              </Button>
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
