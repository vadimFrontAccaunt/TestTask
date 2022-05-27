import { useState, useEffect } from 'react'
import * as LocalAuthentication from 'expo-local-authentication'
import { View, Text } from 'react-native'
import LoginScreen from './LoginScreen'

export const FaceId = () => {
	const [isBioSupported, setIsBioSupported] = useState(false)
	const [isAuthenticated, setIsAuthenticated] = useState(false)

	useEffect(() => {
		;(async () => {
			const compatible = await LocalAuthentication.hasHardwareAsync()
			setIsBioSupported(compatible)
		})()
	})

	function onAuthenticate() {
		const auth = LocalAuthentication.authenticateAsync({
			promptMessage: 'Auth with touch ID',
			fallbackLabel: 'Enter Password',
		})
		auth.then(result => {
			setIsAuthenticated(result.success)
			console.log(result)
		})
	}

	return (
		<View>
			{isAuthenticated ? (
				<Text style={{ fontSize: 20 }}>You allredy authenticated</Text>
			) : (
				<LoginScreen onAuthenticate={onAuthenticate} />
			)}
		</View>
	)
}
