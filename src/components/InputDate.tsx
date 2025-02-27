import { PressableProps } from 'react-native'
import Feather from '@expo/vector-icons/Feather'
import {
  DateTimePickerAndroid,
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker'
import { HStack, Pressable, Text } from './ui'

type Props = PressableProps & {
  date: Date
  setDate: React.Dispatch<React.SetStateAction<Date>>
}

export function InputDate({ date, setDate, className, ...rest }: Props) {
  const handleSelectedDate = (event: DateTimePickerEvent, date?: Date) => {
    if (date && event.type === 'set') {
      setDate(date)
    }
  }

  const handleDatePicker = () => {
    DateTimePickerAndroid.open({
      value: date,
      onChange: handleSelectedDate,
    })
  }

  return (
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
  )
}
