import { useState } from 'react'
import {
  Button,
  ButtonSpinner,
  ButtonText,
  Divider,
  FormControl,
  FormControlError,
  FormControlErrorText,
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
  Text,
  VStack,
} from '@/components/ui'
import { InputDate, ModalImage } from '@/components'
import Pencil from '@/assets/lapis.svg'
import Close from '@/assets/close-black.svg'
import ArrowDropdown from '@/assets/arrow-dropdown.svg'
import { Transaction, TransactionDocument, TransactionType } from '@/models'
import { TextInputMask } from 'react-native-masked-text'
import { z } from 'zod'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { formattedMoney } from '@/utils'
import Feather from '@expo/vector-icons/Feather'
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '@/firebase/config'
import { transactionConverter } from '@/firebase/converters'

type Props = {
  transaction: Transaction & {
    documents?: TransactionDocument[]
    type: string
  }
}

type UpdateTransactionData = z.infer<typeof schema>

const schema = z.object({
  transactionType: z.nativeEnum(TransactionType).nullish(),
  value: z
    .string()
    .min(1, 'O valor é obrigatório')
    .refine((value) => {
      const numericValue = Number(
        value.replace(/[^0-9,]/g, '').replace(',', '.'),
      )
      return numericValue >= 1
    }, 'O valor mínimo é R$1,00')
    .nullish(),
})

export function ModalUpdateTransaction({ transaction }: Props) {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      transactionType: transaction.transactionType,
      value: formattedMoney.format(transaction.value),
    },
  })
  const [isOpen, setIsOpen] = useState(false)
  const [date, setDate] = useState(transaction.date.toDate())

  const onUpdateTransaction = async (data: UpdateTransactionData) => {
    try {
      const { transactionType, value } = data
      console.log(date)
      const numericValue = Number(
        value!.replace(/[^0-9,]/g, '').replace(',', '.'),
      )
      const transactionRef = doc(
        db,
        'transactions',
        transaction.id!,
      ).withConverter(transactionConverter)
      await updateDoc(transactionRef, {
        transactionType,
        value: numericValue,
        date,
      })
    } catch (error) {
      console.error(error)
    }
  }

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
              <Controller
                control={control}
                name="transactionType"
                render={({ field: { onChange, value } }) => (
                  <Select
                    initialLabel={transaction.transactionType}
                    selectedValue={value}
                    onValueChange={onChange}
                  >
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
              {errors.transactionType && (
                <FormControlError>
                  <FormControlErrorText>
                    {errors.transactionType.message}
                  </FormControlErrorText>
                </FormControlError>
              )}
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
              <Controller
                control={control}
                name="value"
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

            {transaction.documents && transaction.documents.length > 0 && (
              <VStack className="gap-1 mt-4">
                <Text className="text-md text-black">
                  Documentos relacionados
                </Text>
                <HStack className="border border-dashed border-custom-my-dark-green items-center gap-2 rounded-lg p-2">
                  {transaction.documents?.map((document) =>
                    document.mimeType.includes('image') ? (
                      <ModalImage key={document.id} uri={document.uri} />
                    ) : (
                      <Feather key={document.id} name="file-text" size={32} />
                    ),
                  )}
                </HStack>
              </VStack>
            )}
          </ModalBody>
          <ModalFooter>
            <Button
              className="flex-1 h-12 bg-custom-my-dark-green rounded-lg"
              variant="solid"
              onPress={handleSubmit(onUpdateTransaction)}
              isDisabled={isSubmitting}
            >
              {isSubmitting && <ButtonSpinner className="text-white" />}
              <ButtonText className="text-md">Editar transação</ButtonText>
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
