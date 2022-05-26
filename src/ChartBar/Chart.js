import { LineChart } from 'react-native-chart-kit'

import { ScrollView } from 'react-native'

const Chart = () => {
	return (
		<ScrollView horizontal>
			<LineChart
				data={{
					labels: ['January', 'February', 'March', 'April', 'May', 'June'],
					datasets: [
						{
							data: [
								Math.random() * 100,
								Math.random() * 100,
								Math.random() * 100,
								Math.random() * 100,
								Math.random() * 100,
								Math.random() * 100,
							],
						},
					],
				}}
				width={1000}
				height={220}
				yAxisLabel='$'
				yAxisSuffix='k'
				yAxisInterval={1}
				chartConfig={{
					backgroundColor: '#e26a00',
					backgroundGradientFrom: '#fb8c00',
					backgroundGradientTo: '#ffa726',
					decimalPlaces: 2,
					color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
					labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
					style: {
						borderRadius: 16,
					},
					propsForDots: {
						r: '6',
						strokeWidth: '2',
						stroke: '#ffa726',
					},
				}}
				bezier
				style={{
					marginVertical: 8,
					borderRadius: 16,
				}}
			/>
		</ScrollView>
	)
}

export default Chart
