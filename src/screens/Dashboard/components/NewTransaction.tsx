import { ComponentProps, useState } from 'react'
import * as DocumentPicker from 'expo-document-picker'
import * as FileSystem from 'expo-file-system'
import {
  Box,
  Button,
  ButtonIcon,
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
import Pixels from '@/assets/pixels-servicos.svg'
import Illustration from '@/assets/ilustracao2.svg'
import ArrowDropdown from '@/assets/arrow-dropdown.svg'
import File from '@/assets/file.svg'
import { TextInputMask } from 'react-native-masked-text'
import { ModalImage } from '@/components'
import { Alert } from 'react-native'
import { addDoc, collection, Timestamp } from 'firebase/firestore'
import { useAuth } from '@/contexts'
import { useToast } from '@/hooks'
import { TransactionDocument, TransactionType } from '@/models'
import Feather from '@expo/vector-icons/Feather'
import { z } from 'zod'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { randomUUID } from 'expo-crypto'
import { uploadFile } from '@/firebase/storage'
import { db } from '@/firebase/config'
import {
  transactionConverter,
  transactionDocumentConverter,
} from '@/firebase/converters'

type Props = ComponentProps<typeof Box>

type CreateTransactionData = z.infer<typeof schema>

const schema = z.object({
  transactionType: z.nativeEnum(TransactionType, {
    message: 'O tipo da transação é obrigatório',
  }),
  value: z
    .string()
    .min(1, 'O valor é obrigatório')
    .refine((value) => {
      const numericValue = Number(
        value.replace(/[^0-9,]/g, '').replace(',', '.'),
      )
      return numericValue >= 1
    }, 'O valor mínimo é R$1,00'),
})

export function NewTransaction({ className, ...rest }: Props) {
  const { user } = useAuth()
  const toast = useToast()
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      value: 'R$0,00',
    },
  })
  const [transactionDocuments, setTransactionDocuments] = useState<
    Omit<TransactionDocument, 'transactionId'>[]
  >([])

  const handlePickerDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        multiple: true,
      })

      if (result.canceled) return

      const assets = result.assets
      if (assets && assets.length > 0) {
        for (const asset of assets) {
          const assetInfo = await FileSystem.getInfoAsync(asset.uri)
          if (assetInfo.exists) {
            const assetSizeInMb = assetInfo.size / (1024 * 1024)
            const limitSize = 10

            if (assetSizeInMb > limitSize) {
              return Alert.alert(
                'Tamanho excedido',
                `O tamanho máximo de arquivo é de até ${limitSize}MB`,
              )
            }

            setTransactionDocuments((prevState) => [
              ...prevState,
              {
                name: asset.name,
                uri: assetInfo.uri,
                mimeType: asset.mimeType!,
                createdAt: Timestamp.now(),
                updatedAt: Timestamp.now(),
              },
            ])
          }
        }
      }
    } catch (error) {
      toast('error', 'Ocorreu um erro ao inserir o(s) documento(s)', error.code)
    }
  }

  const onCreateTransaction = async (data: CreateTransactionData) => {
    try {
      const { transactionType, value } = data
      const numericValue = Number(
        value.replace(/[^0-9,]/g, '').replace(',', '.'),
      )

      const transactionRef = await addDoc(
        collection(db, 'transactions').withConverter(transactionConverter),
        {
          userUid: user?.uid!,
          transactionType,
          date: Timestamp.now(),
          value: numericValue,
          createdAt: Timestamp.now(),
          updatedAt: Timestamp.now(),
        },
      )

      if (transactionDocuments.length > 0) {
        for (const document of transactionDocuments) {
          const fileName = randomUUID()
          const documentUrl = (await uploadFile(
            document.uri,
            fileName,
          )) as string

          await addDoc(
            collection(db, 'transaction-documents').withConverter(
              transactionDocumentConverter,
            ),
            {
              transactionId: transactionRef.id,
              name: fileName,
              mimeType: document.mimeType,
              uri: documentUrl,
              createdAt: Timestamp.now(),
              updatedAt: Timestamp.now(),
            },
          )
        }
      }

      toast('success', 'Transação realizada com sucesso!')
      clearTransactionData()
    } catch (error) {
      toast('error', 'Ocorreu um erro ao realizar a transação.', error.code)
    }
  }

  const clearTransactionData = () => {
    reset()
    setTransactionDocuments([])
  }

  const handleRemoveDocument = (documentUri: string) => {
    const newTransactionDocuments = transactionDocuments.filter(
      (document) => document.uri !== documentUri,
    )
    setTransactionDocuments(newTransactionDocuments)
  }

  return (
    <Box
      className={`min-h-[655px] bg-custom-my-gray-box py-8 px-4 rounded-lg overflow-hidden mt-6 ${className}`}
      {...rest}
    >
      <Pixels
        style={{
          position: 'absolute',
        }}
      />
      <Pixels
        style={{
          position: 'absolute',
          bottom: 0,
          right: 0,
          transform: [{ rotate: '180deg' }],
        }}
      />
      <Heading className="text-black text-center text-xl font-heading">
        Nova transação
      </Heading>
      <FormControl className="mt-8" isInvalid={!!errors.transactionType}>
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
                <SelectIcon className="mr-3" size="sm" as={ArrowDropdown} />
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

      <VStack>
        <FormControl isInvalid={!!errors.value}>
          <FormControlLabel className="justify-center mt-4">
            <FormControlLabelText className="text-md font-semibold">
              Valor
            </FormControlLabelText>
          </FormControlLabel>
          <Controller
            control={control}
            name="value"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input className="h-12 bg-white border border-custom-my-dark-green rounded-lg mt-2">
                <TextInputMask
                  type="money"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  style={{
                    flex: 1,
                    height: '100%',
                    textAlign: 'center',
                    fontSize: 16,
                  }}
                  includeRawValueInChangeText
                />
              </Input>
            )}
          />
          {errors.value && (
            <FormControlError>
              <FormControlErrorText>
                {errors.value.message}
              </FormControlErrorText>
            </FormControlError>
          )}
        </FormControl>

        <FormControl>
          <FormControlLabel className="justify-center mt-4">
            <FormControlLabelText className="text-md font-semibold">
              Documentos relacionados
            </FormControlLabelText>
          </FormControlLabel>
          <Button
            className="h-auto flex-col bg-white active:!bg-custom-my-services-card-bg rounded-lg border border-dashed border-custom-my-dark-green p-6 mt-2"
            onPress={handlePickerDocument}
          >
            <ButtonIcon
              as={File}
              className="h-8 w-8 fill-custom-my-dark-green"
            />
            <Box className="flex flex-col items-center">
              <Text className="text-md font-medium text-custom-my-dark-green">
                Escolher documentos
              </Text>
              <Text className="text-sm text-center leading-5 font-body text-custom-my-gray mt-1">
                (Opcional) {'\n'} Selecione recibos ou documentos relacionado a
                transação.
              </Text>
            </Box>
          </Button>
        </FormControl>

        {transactionDocuments.map((document) => (
          <Box
            key={document.uri}
            className="bg-custom-my-light-gray rounded-lg p-2 pr-4 mt-2"
          >
            <HStack className="items-center justify-between">
              <HStack className="items-center gap-4">
                {document.mimeType.includes('image') ? (
                  <ModalImage uri={document.uri} />
                ) : (
                  <Feather name="file-text" size={24} />
                )}
                <Text className="text-sm text-custom-my-gray font-body">
                  {document.name}
                </Text>
              </HStack>
              <Button
                variant="link"
                onPress={() => handleRemoveDocument(document.uri)}
              >
                <Feather name="x" size={24} color="#000000" />
              </Button>
            </HStack>
          </Box>
        ))}

        <Button
          className="h-12 bg-custom-my-dark-green rounded-lg mt-8"
          onPress={handleSubmit(onCreateTransaction)}
          isDisabled={isSubmitting}
        >
          {isSubmitting && <ButtonSpinner className="text-white" />}
          <ButtonText className="text-white text-md font-semibold">
            Concluir transação
          </ButtonText>
        </Button>
      </VStack>
      <Illustration
        style={{
          marginTop: 32,
          alignSelf: 'center',
          marginHorizontal: 16,
        }}
      />
    </Box>
  )
}
