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
  VStack,
} from '@/components/ui'
import Pixels from '@/assets/pixels-servicos.svg'
import Illustration from '@/assets/ilustracao2.svg'
import ArrowDropdown from '@/assets/arrow-dropdown.svg'

export function NewTransaction() {
  return (
    <Box className="h-[655px] bg-custom-my-gray-box py-8 px-4 rounded-lg overflow-hidden">
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
      <Illustration
        style={{
          position: 'absolute',
          bottom: 34,
          alignSelf: 'center',
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

        <VStack className="mx-[84px]">
          <FormControlLabel className="justify-center mt-8">
            <FormControlLabelText className="text-md font-semibold">
              Valor
            </FormControlLabelText>
          </FormControlLabel>
          <Input className="h-12 bg-white border border-custom-my-dark-green rounded-lg mt-4">
            <InputField
              className="text-md text-center"
              inputMode="numeric"
              placeholder="00.00"
            />
          </Input>
          <Button className="h-12 bg-custom-my-dark-green rounded-lg mt-8">
            <ButtonText className="text-white text-md font-semibold">
              Concluir transação
            </ButtonText>
          </Button>
        </VStack>
      </FormControl>
    </Box>
  )
}
