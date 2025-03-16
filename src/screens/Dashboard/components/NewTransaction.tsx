import { ComponentProps, useCallback, useEffect, useState } from 'react'
import * as DocumentPicker from 'expo-document-picker'
import * as FileSystem from 'expo-file-system'
import {
  Box,
  Button,
  ButtonIcon,
  ButtonText,
  Divider,
  FormControl,
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
import CloseBlack from '@/assets/close-black.svg'
import { TextInputMask } from 'react-native-masked-text'
import { ModalImage } from '@/components'
import { Alert } from 'react-native'
import {
  addDoc,
  collection,
  getDocs,
  query,
  Timestamp,
  where,
} from 'firebase/firestore'
import { db } from '@/firebase/config'
import { transactionDocumentConverter } from '@/firebase/converters'
import { useAuth } from '@/contexts'
import { useToast } from '@/hooks'
import { TransactionDocument } from '@/models'
import Feather from '@expo/vector-icons/Feather'

type Props = ComponentProps<typeof Box>

export function NewTransaction({ className, ...rest }: Props) {
  const { user } = useAuth()
  const toast = useToast()
  const [transactionDocuments, setTransactionDocuments] = useState<
    TransactionDocument[]
  >([])
  const [value, setValue] = useState('R$0,00')

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

            await addDoc(
              collection(db, 'transaction-documents').withConverter(
                transactionDocumentConverter,
              ),
              {
                userUid: user?.uid!,
                name: asset.name,
                uri: assetInfo.uri,
                mimeType: asset.mimeType!,
                createdAt: Timestamp.now(),
                updatedAt: Timestamp.now(),
              },
            )
          }
        }
      }
    } catch (error) {
      toast('error', 'Ocorreu um erro ao inserir o(s) documento(s)', error.code)
    }
  }

  const fetchTransactionDocuments = useCallback(async () => {
    try {
      const q = query(
        collection(db, 'transaction-documents').withConverter(
          transactionDocumentConverter,
        ),
        where('userUid', '==', user!.uid),
      )
      const querySnapshot = await getDocs(q)
      const transactionDocuments: TransactionDocument[] = []

      querySnapshot.forEach((doc) => {
        const transactionDocument = doc.data()
        transactionDocuments.push(transactionDocument)
      })

      setTransactionDocuments(transactionDocuments)
    } catch (error) {
      console.error(error)
    }
  }, [user])

  useEffect(() => {
    fetchTransactionDocuments()
  }, [fetchTransactionDocuments])

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
      <FormControl className="mt-8">
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

        <VStack>
          <FormControlLabel className="justify-center mt-4">
            <FormControlLabelText className="text-md font-semibold">
              Valor
            </FormControlLabelText>
          </FormControlLabel>
          <Input className="h-12 bg-white border border-custom-my-dark-green rounded-lg mt-2">
            <TextInputMask
              type="money"
              value={value}
              onChangeText={(text, rawText) => {
                console.log(rawText)
                setValue(text)
              }}
              style={{
                flex: 1,
                height: '100%',
                textAlign: 'center',
                fontSize: 16,
              }}
              includeRawValueInChangeText
            />
          </Input>

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

          {transactionDocuments.map((document) => (
            <Box
              key={document.id}
              className="bg-custom-my-light-gray rounded-lg p-2 pr-6 mt-2"
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
                <Button variant="link">
                  <CloseBlack />
                </Button>
              </HStack>
            </Box>
          ))}

          <Button className="h-12 bg-custom-my-dark-green rounded-lg mt-8">
            <ButtonText className="text-white text-md font-semibold">
              Concluir transação
            </ButtonText>
          </Button>
        </VStack>
      </FormControl>
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
