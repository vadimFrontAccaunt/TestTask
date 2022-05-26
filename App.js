import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { useState } from 'react'
import { Provider } from 'react-redux'
import { Context } from './src/1-2 task/Context'
import MainScreen from './src/1-2 task/MainScreen'
import { store } from './src/1-2 task/store'
import ThecondScreen from './src/1-2 task/ThecondScreen'
import { CameraOpen } from './src/Camera/Camera'

const Stack = createStackNavigator()

export default function App() {
	const [lang, setLang] = useState(true) // true - eng
	return (
		<Provider store={store}>
			<Context.Provider value={[lang, setLang]}>
				<NavigationContainer>
					<Stack.Navigator>
						<Stack.Screen
							options={{ headerTitle: '' }}
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
					</Stack.Navigator>
				</NavigationContainer>
			</Context.Provider>
		</Provider>
	)
}
