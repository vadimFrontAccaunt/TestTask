import React, { useContext, useState, useEffect } from 'react'
import { Text, View, Pressable, ScrollView, SafeAreaView } from 'react-native'
import { useSelector } from 'react-redux'
import { styles } from '../../styles'
import Chart from '../ChartBar/Chart'
import RandomScreen from '../RandomScreen/RandomScreen'
import ElementOfCartoon from './ElementOfCartoon'
import { Context } from './Context'
import Modal from 'react-native-modal'
import { FaceId } from '../LoginScreen/FaceId'
import { showMessage } from 'react-native-flash-message'
import { PushNotification } from '../PushNotification/PushNotification'

const MainScreen = ({ navigation }) => {
	const state = useSelector(state => state.cartoons)
	const [loginStatus, setLoginStatus] = useState(false)
	const [context, setContext] = useContext(Context)
	const [browser, setBrowser] = useState(false)

	useEffect(() => {
		const interval = setInterval(() => {
			showMessage({
				message: 'Heelooo broth',
				type: 'info',
				duration: 3000,
				statusBarHeight: 20,
				titleStyle: { fontSize: 18, textAlign: 'center' },
			})
		}, 15000)
		return () => clearInterval(interval)
	}, [])

	let empty
	if (state.length === 0) {
		empty = false
	} else {
		empty = true
	}
	return (
		<SafeAreaView style={{ marginTop: 20 }}>
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
							<Text
								style={{ textAlign: 'center', fontSize: 24, color: 'grey' }}
							>
								Login
							</Text>
						) : (
							<Text
								style={{ textAlign: 'center', fontSize: 24, color: 'grey' }}
							>
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
				<View
					style={[
						styles.flex,
						{ alignItems: 'center', marginLeft: 5, marginRight: 5 },
					]}
				>
					<Pressable onPress={() => setContext(!context)}>
						{context ? (
							<Text style={styles.mainScreenButtons}>Change Language</Text>
						) : (
							<Text style={styles.mainScreenButtons}>Сменить язык</Text>
						)}
					</Pressable>
					<Pressable onPress={() => navigation.navigate('Browser')}>
						{context ? (
							<Text style={[styles.mainScreenButtons, { paddingTop: 17 }]}>
								Browser
							</Text>
						) : (
							<Text style={[styles.mainScreenButtons, { paddingTop: 17 }]}>
								Браузер
							</Text>
						)}
					</Pressable>
					<Pressable onPress={() => navigation.navigate('Camera')}>
						{context ? (
							<Text style={styles.mainScreenButtons}>Open Camera</Text>
						) : (
							<Text style={styles.mainScreenButtons}>Открыть камеру</Text>
						)}
					</Pressable>
				</View>
				<View
					style={[
						styles.flex,
						{
							alignItems: 'center',
							marginLeft: 5,
							marginRight: 5,
							marginTop: 25,
						},
					]}
				>
					<Pressable onPress={() => navigation.navigate('Audio')}>
						{context ? (
							<Text style={[styles.mainScreenButtons, { paddingTop: 17 }]}>
								Music
							</Text>
						) : (
							<Text style={[styles.mainScreenButtons, { paddingTop: 17 }]}>
								Музычка
							</Text>
						)}
					</Pressable>
					<Pressable onPress={() => navigation.navigate('QrCode')}>
						{context ? (
							<Text style={[styles.mainScreenButtons, { paddingTop: 17 }]}>
								QR code
							</Text>
						) : (
							<Text style={[styles.mainScreenButtons, { paddingTop: 17 }]}>
								QR код
							</Text>
						)}
					</Pressable>
					<Pressable onPress={() => navigation.navigate('Push')}>
						{context ? (
							<Text style={[styles.mainScreenButtons]}>Push notification</Text>
						) : (
							<Text style={[styles.mainScreenButtons]}>Пуш уведомление</Text>
						)}
					</Pressable>
				</View>
			</ScrollView>
		</SafeAreaView>
	)
}

export default MainScreen
