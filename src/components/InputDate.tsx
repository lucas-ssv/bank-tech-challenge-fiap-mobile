import { Platform, PressableProps } from 'react-native'
import Feather from '@expo/vector-icons/Feather'
import DateTimePicker, {
  DateTimePickerAndroid,
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker'
import {
  Box,
  Button,
  ButtonText,
  CloseIcon,
  HStack,
  Icon,
  Modal,
  ModalBackdrop,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Pressable,
  Text,
} from './ui'
import { useState } from 'react'

type Props = PressableProps & {
  date: Date
  setDate: React.Dispatch<React.SetStateAction<Date>>
}

export function InputDate({ date, setDate, className, ...rest }: Props) {
  const [open, setOpen] = useState(false)

  const handleSelectedDate = (event: DateTimePickerEvent, date?: Date) => {
    if (date && event.type === 'set') {
      setDate(date)
    }
  }

  const handleDatePicker = () => {
    if (Platform.OS === 'android') {
      DateTimePickerAndroid.open({
        value: date,
        onChange: handleSelectedDate,
      })
    } else {
      setOpen(true)
    }
  }

  return (
    <>
      <Pressable
        className={`justify-center rounded-lg border border-white h-12 pl-3 ${className}`}
        onPress={handleDatePicker}
        {...rest}
      >
        <HStack className="items-center justify-between gap-4">
          <Text
            className="flex-1 text-white text-sm font-medium"
            numberOfLines={1}
          >
            {date.toISOString()}
          </Text>
          <Feather name="calendar" color="#FFFFFF" size={16} className="mr-2" />
        </HStack>
      </Pressable>

      {Platform.OS === 'ios' && (
        <Modal isOpen={open}>
          <ModalBackdrop onPress={() => setOpen(false)} />
          <ModalContent className="rounded-lg">
            <ModalHeader>
              <ModalCloseButton
                className="flex-1 justify-end items-end"
                onPress={() => setOpen(false)}
              >
                <Icon
                  as={CloseIcon}
                  size="xl"
                  className="text-custom-my-dark-green"
                />
              </ModalCloseButton>
            </ModalHeader>
            <ModalBody>
              <Box>
                <DateTimePicker
                  value={date}
                  mode="date"
                  display="spinner"
                  onChange={handleSelectedDate}
                />
              </Box>
            </ModalBody>
            <ModalFooter>
              <Button
                className="bg-custom-my-dark-green rounded-lg"
                onPress={() => setOpen(false)}
              >
                <ButtonText>Confirmar</ButtonText>
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </>
  )
}
