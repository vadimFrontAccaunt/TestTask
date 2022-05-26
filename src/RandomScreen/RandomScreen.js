import { Text, View } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import { Context } from '../1-2 task/Context'

const RandomScreen = () => {
	const [randomNumber, setRandomNumber] = useState(0)
	const [statusError, setStatusError] = useState(false)
	const [context, setContext] = useContext(Context)

	useEffect(() => {
		const interval = setInterval(() => {
			let number = Math.random().toFixed(1) * 10
			console.log(number)
			if (number > 4) {
				setStatusError(false)
				setRandomNumber(randomNumber => randomNumber + 1)
			} else {
				setStatusError(true)
				setRandomNumber(0)
			}
		}, 2000)
		return () => clearInterval(interval)
	}, [])

	return (
		<View>
			{context ? (
				<Text style={{ textAlign: 'center', fontSize: 24, marginTop: 30 }}>
					Random Number
				</Text>
			) : (
				<Text style={{ textAlign: 'center', fontSize: 24, marginTop: 30 }}>
					Случайное Число
				</Text>
			)}
			<Text style={{ textAlign: 'center', fontSize: 24, marginTop: 10 }}>
				{statusError ? (
					<Text>{context ? 'Error' : 'Ошибка'}</Text>
				) : (
					randomNumber
				)}
			</Text>
		</View>
	)
}

export default RandomScreen
