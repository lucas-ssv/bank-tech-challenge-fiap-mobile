import { ComponentProps } from 'react'
import {
  Box,
  Button,
  ButtonIcon,
  ButtonText,
  FormControl,
  FormControlLabel,
  FormControlLabelText,
  Heading,
  HStack,
  Icon,
  Image,
  Input,
  InputField,
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
import { TouchableOpacity } from 'react-native'

type Props = ComponentProps<typeof Box>

export function NewTransaction({ className, ...rest }: Props) {
  return (
    <Box
      className={`min-h-[655px] bg-custom-my-gray-box py-8 px-4 rounded-lg overflow-hidden ${className}`}
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
              <SelectItem label="UX Research" value="ux" />
              <SelectItem label="Web Development" value="web" />
              <SelectItem
                label="Cross Platform Development Process"
                value="Cross Platform Development Process"
              />
              <SelectItem label="UI Designing" value="ui" isDisabled={true} />
              <SelectItem label="Backend Development" value="backend" />
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
            <InputField
              className="text-md text-center"
              inputMode="numeric"
              placeholder="00.00"
            />
          </Input>

          <FormControlLabel className="justify-center mt-4">
            <FormControlLabelText className="text-md font-semibold">
              Documentos relacionados
            </FormControlLabelText>
          </FormControlLabel>
          <Button className="h-auto flex-col bg-white active:!bg-custom-my-services-card-bg rounded-lg border border-dashed border-custom-my-dark-green p-6 mt-2">
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

          <Box className="bg-custom-my-light-gray rounded-lg p-2 pr-6 mt-2">
            <HStack className="items-center justify-between">
              <HStack className="items-center gap-4">
                <Image
                  size="xs"
                  source={{
                    uri: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
                  }}
                  className="rounded-md object-cover"
                  alt="image"
                />
                <Text className="text-sm text-custom-my-gray font-body">
                  Nome da Imagem
                </Text>
              </HStack>
              <TouchableOpacity>
                <Icon as={CloseBlack} size="sm" />
              </TouchableOpacity>
            </HStack>
          </Box>

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
