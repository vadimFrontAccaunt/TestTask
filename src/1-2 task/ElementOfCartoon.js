import React, { useContext } from 'react'
import { Pressable, Text, View } from 'react-native'
import { useDispatch } from 'react-redux'
import { styles } from '../../styles'
import { actions } from './store'
import { Context } from './Context'

const ElementOfCartoon = ({ cartonNumber, count, navigation }) => {
	const dispatch = useDispatch()
	const deleteCartoon = cartonNumber => {
		dispatch(actions.deleteCartoonFromList(cartonNumber))
	}

	const findIndex = cartonNumber => {
		dispatch(actions.findIndexOfCartoon(cartonNumber))
		navigation.navigate('Thecond')
	}
	const [context, setContext] = useContext(Context)

	return (
		<View style={[styles.flex, { height: 80 }]}>
			<Pressable
				style={[
					styles.flex,
					{
						width: '70%',
						marginLeft: 10,
						marginTop: 20,
						alignItems: 'center',
					},
				]}
				onPress={() => {
					findIndex(cartonNumber)
				}}
			>
				<Text>{cartonNumber}</Text>
				<Text
					style={{
						backgroundColor: 'grey',
						width: '25%',
						textAlign: 'center',
						color: 'white',
						borderRadius: 20,
						marginRight: '10%',
					}}
				>
					{count}
				</Text>
			</Pressable>
			<Pressable
				onPress={() => deleteCartoon(cartonNumber)}
				style={[
					{
						marginTop: 20,
						backgroundColor: 'red',
						width: '25%',
						display: 'flex',
						justifyContent: 'center',
					},
				]}
			>
				{context ? (
					<Text style={{ textAlign: 'center' }}>Delete</Text>
				) : (
					<Text style={{ textAlign: 'center' }}>Удалить</Text>
				)}
			</Pressable>
		</View>
	)
}

export default ElementOfCartoon
