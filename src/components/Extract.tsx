import { ComponentProps } from 'react'
import {
  Box,
  Button,
  ButtonGroup,
  Divider,
  Heading,
  HStack,
  Text,
  VStack,
} from './ui'
import Pencil from '@/assets/lapis.svg'
import Trash from '@/assets/lixeira.svg'

type Props = ComponentProps<typeof Box>

export function Extract({ className, ...rest }: Props) {
  return (
    <Box
      className={`bg-white rounded-lg py-8 pl-6 pr-12 mt-6 ${className}`}
      {...rest}
    >
      <HStack className="items-center justify-between gap-12">
        <Heading className="text-xl font-heading">Extrato</Heading>
        <ButtonGroup className="flex-row gap-2">
          <Button className="h-12 w-12 bg-custom-my-dark-green rounded-full">
            <Pencil />
          </Button>
          <Button className="h-12 w-12 bg-custom-my-dark-green rounded-full">
            <Trash />
          </Button>
        </ButtonGroup>
      </HStack>
      <VStack className="gap-4 mt-4">
        <VStack className="gap-2">
          <Text className="text-sm font-semibold text-custom-my-green">
            Novembro
          </Text>
          <HStack className="items-center justify-between">
            <Text className="text-md font-body text-black">Depósito</Text>
            <Text className="text-sm font-body text-custom-my-extract-date-color">
              21/11/2022
            </Text>
          </HStack>
          <Text className="text-md font-semibold text-black">R$ 150</Text>
          <Divider className="w-3/4 border border-custom-my-green" />
        </VStack>
        <VStack className="gap-2">
          <Text className="text-sm font-semibold text-custom-my-green">
            Novembro
          </Text>
          <HStack className="items-center justify-between">
            <Text className="text-md font-body text-black">Depósito</Text>
            <Text className="text-sm font-body text-custom-my-extract-date-color">
              21/11/2022
            </Text>
          </HStack>
          <Text className="text-md font-semibold text-black">-R$ 150</Text>
          <Divider className="w-3/4 border border-custom-my-green" />
        </VStack>
      </VStack>
    </Box>
  )
}
