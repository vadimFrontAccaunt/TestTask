import React, { useContext, useState } from 'react'
import { Text, View, Pressable, ScrollView } from 'react-native'
import { useSelector } from 'react-redux'
import { styles } from '../../styles'
import Chart from '../ChartBar/Chart'
import RandomScreen from '../RandomScreen/RandomScreen'
import ElementOfCartoon from './ElementOfCartoon'
import { Context } from './Context'
import Modal from 'react-native-modal'
import { FaceId } from '../LoginScreen/FaceId'

const MainScreen = ({ navigation }) => {
	const state = useSelector(state => state.cartoons)
	const [loginStatus, setLoginStatus] = useState(false)
	const [context, setContext] = useContext(Context)

	let empty
	if (state.length === 0) {
		empty = false
	} else {
		empty = true
	}
	return (
		<ScrollView>
			{context ? (
				<View
					style={[
						styles.flex,
						{ marginLeft: 30, marginRight: 30, marginTop: 20 },
					]}
				>
					<Text style={{ color: 'grey' }}>CARTON №</Text>
					<Text style={{ color: 'grey' }}>ACT.</Text>
				</View>
			) : (
				<View
					style={[
						styles.flex,
						{ marginLeft: 30, marginRight: 30, marginTop: 20 },
					]}
				>
					<Text style={{ color: 'grey' }}>НОМЕР №</Text>
					<Text style={{ color: 'grey' }}>КОЛИЧЕСТВО</Text>
				</View>
			)}
			{empty ? (
				state.map(el => (
					<ElementOfCartoon
						key={el.cartonNumber}
						cartonNumber={el.cartonNumber}
						count={el.count}
						navigation={navigation}
					/>
				))
			) : (
				<View>
					{context ? (
						<Text style={{ textAlign: 'center', marginTop: 50 }}>
							Sorry, my state is empty
						</Text>
					) : (
						<Text style={{ textAlign: 'center', marginTop: 50 }}>
							Извини, мой стэйт пуст
						</Text>
					)}
				</View>
			)}
			<Pressable
				onPress={() => setLoginStatus(!loginStatus)}
				style={{ marginTop: 20 }}
			>
				<View>
					{context ? (
						<Text style={{ textAlign: 'center', fontSize: 24, color: 'grey' }}>
							Login
						</Text>
					) : (
						<Text style={{ textAlign: 'center', fontSize: 24, color: 'grey' }}>
							Логин
						</Text>
					)}
				</View>
			</Pressable>
			<Modal visible={loginStatus} transparent={false}>
				<View>
					<Pressable onPress={() => setLoginStatus(!loginStatus)}>
						<Text style={styles.closed}>X</Text>
					</Pressable>
					<FaceId />
				</View>
			</Modal>
			<Chart />
			<RandomScreen />
			<Pressable onPress={() => setContext(!context)}>
				{context ? (
					<Text style={styles.changeLang}>Change Language</Text>
				) : (
					<Text style={styles.changeLang}>Сменить язык</Text>
				)}
			</Pressable>
			<Pressable
				style={{ marginTop: 20 }}
				onPress={() => navigation.navigate('Camera')}
			>
				{context ? (
					<Text style={{ textAlign: 'center' }}>Open Camera</Text>
				) : (
					<Text style={{ textAlign: 'center' }}>Открыть камеру</Text>
				)}
			</Pressable>
		</ScrollView>
	)
}

export default MainScreen
