import { Box, Text } from '@/components/ui'
import { BarChart } from 'react-native-chart-kit'
import { LinearGradient } from 'expo-linear-gradient'
import { Dimensions } from 'react-native'
import { ComponentProps } from 'react'

type Props = ComponentProps<typeof Box>

export function FinancialFlowChart({ ...rest }: Props) {
  const screenWidth = Dimensions.get('window').width

  return (
    <Box className="flex-1 mx-auto shadow-hard-3" {...rest}>
      <LinearGradient
        start={[-0.5, 0]}
        end={[1, 0]}
        style={{
          borderRadius: 8,
        }}
        colors={['#fb8c00', '#ffa726']}
      >
        <Text className="text-white text-xl text-center font-heading m-4">
          Fluxo Financeiro
        </Text>
        <BarChart
          data={{
            labels: ['Depósito', 'DOC/TED'],
            datasets: [
              {
                data: [Math.random() * 100, Math.random() * 100],
              },
            ],
          }}
          width={screenWidth - 48}
          height={280}
          yAxisLabel="$"
          yAxisSuffix="k"
          yAxisInterval={1}
          chartConfig={{
            backgroundColor: '#e26a00',
            backgroundGradientFrom: '#fb8c00',
            backgroundGradientTo: '#ffa726',
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 8,
            },
            propsForDots: {
              r: '6',
              strokeWidth: '2',
              stroke: '#ffa726',
              fill: '#FF0000',
            },
          }}
          fromZero
          style={{
            borderRadius: 8,
          }}
        />
      </LinearGradient>
    </Box>
  )
}
