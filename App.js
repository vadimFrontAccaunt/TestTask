import React, { useCallback, useEffect, useState } from 'react'
import { View, Image, useWindowDimensions } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { Provider } from 'react-redux'
import { Context } from './src/1-2 task/Context'
import MainScreen from './src/1-2 task/MainScreen'
import { store } from './src/1-2 task/store'
import ThecondScreen from './src/1-2 task/ThecondScreen'
import { CameraOpen } from './src/Camera/Camera'
import * as SplashScreen from 'expo-splash-screen'
import { styles } from './styles'
import FlashMessage from 'react-native-flash-message'
import Browser from './src/Browser/Browser'
import { AudioPlayer } from './src/AudioTask/AudioPlayer'
import { PushNotification } from './src/PushNotification/PushNotification'
import { Map } from './src/MapGps/Map'
import QrCode from './src/QrCode/QrCode'
import LoginScreen from './src/LoginScreen/LoginScreen'

const Stack = createStackNavigator()

export default function App() {
	const [appIsReady, setAppIsReady] = useState(false)
	const [lang, setLang] = useState(true) // true - eng
	const windowWidth = useWindowDimensions().width
	const windowHeight = useWindowDimensions().height

	useEffect(() => {
		async function prepare() {
			try {
				await new Promise(resolve => setTimeout(resolve, 4000))
			} catch (e) {
				console.warn(e)
			} finally {
				setAppIsReady(true)
			}
		}

		prepare()
	}, [])

	const onLayoutRootView = useCallback(async () => {
		if (appIsReady) {
			await SplashScreen.hideAsync()
		}
	}, [appIsReady])

	if (appIsReady) {
		return (
			<Provider store={store}>
				<Context.Provider value={[lang, setLang]}>
					<NavigationContainer>
						<Stack.Navigator>
							<Stack.Screen
								options={{ headerTitle: '', headerShown: false }}
								name='Main'
								component={MainScreen}
							/>
							<Stack.Screen
								options={{ headerTitle: '' }}
								name='Thecond'
								component={ThecondScreen}
							/>
							<Stack.Screen
								options={{ headerTitle: '' }}
								name='Camera'
								component={CameraOpen}
							/>
							<Stack.Screen
								options={{ headerTitle: '' }}
								name='Browser'
								component={Browser}
							/>
							<Stack.Screen
								options={{ headerTitle: '' }}
								name='Audio'
								component={AudioPlayer}
							/>
							<Stack.Screen
								options={{ headerTitle: '' }}
								name='QrCode'
								component={QrCode}
							/>
							<Stack.Screen
								options={{ headerTitle: '' }}
								name='Push'
								component={PushNotification}
							/>
							<Stack.Screen
								options={{ headerTitle: '' }}
								name='Map'
								component={Map}
							/>
							<Stack.Screen
								options={{ headerTitle: '' }}
								name='Login'
								component={LoginScreen}
							/>
						</Stack.Navigator>
					</NavigationContainer>
					<FlashMessage position='top' />
				</Context.Provider>
			</Provider>
		)
	} else {
		return (
			<View
				style={[
					styles.flex,
					{
						justifyContent: 'center',
					},
				]}
				onLayout={onLayoutRootView}
			>
				<Image
					style={{ height: windowHeight, width: windowWidth }}
					source={{
						uri: 'https://selftaught.blog/wp-content/uploads/2019/10/ebfa9f1478f17a389c51b6b81c0ffbb2-300x300.png',
					}}
				/>
			</View>
		)
	}
}
