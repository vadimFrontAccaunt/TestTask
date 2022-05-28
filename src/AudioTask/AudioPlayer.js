import React, { useEffect, useRef, useState } from 'react'
import { Text, View, Pressable, Image, Animated } from 'react-native'
import { Audio } from 'expo-av'
import { styles } from '../../styles'

export const AudioPlayer = () => {
	const [sound, setSound] = useState()
	const [playPause, setPlayPause] = useState(false)
	const [isReplay, setIsReplay] = useState(false)
	const [status, setStatus] = useState(0)
	const [duration, setDuration] = useState()

	async function playSound() {
		if (!sound) {
			const { sound } = await Audio.Sound.createAsync(
				require('./../AudioTask/ac-dc.mp3'),
				{},
				status => {
					setStatus(status.positionMillis)
					setDuration(status.durationMillis)
				}
			)
			setSound(sound)
			await sound.playAsync()
			setPlayPause(!playPause)
			fadeStart()
		} else if (playPause) {
			await sound.pauseAsync()
			fadeStop()
			setPlayPause(!playPause)
		} else if (!playPause) {
			await sound.playAsync()
			setPlayPause(!playPause)
			fadeStart()
		}
	}

	async function replayStartStop() {
		await sound.replayAsync()
		setIsReplay(!isReplay)
	}
	useEffect(() => {
		return sound
			? () => {
					sound.unloadAsync()
			  }
			: undefined
	}, [sound])

	const fadeAnim = useRef(new Animated.Value(0)).current

	const fadeStart = () => {
		Animated.timing(fadeAnim, {
			toValue: 300,
			duration: 300000,
			useNativeDriver: false,
		}).start()
	}
	const fadeStop = () => {
		Animated.timing(fadeAnim, {
			toValue: 300,
			duration: 300000,
			useNativeDriver: false,
		}).stop()
	}
	return (
		<View>
			<View style={styles.audioContainer}>
				<Pressable onPress={playSound}>
					{playPause ? (
						<Image
							source={{
								uri: 'https://cdn-icons-png.flaticon.com/512/16/16427.png',
							}}
							style={{ width: 50, height: 50 }}
						/>
					) : (
						<Image
							source={{
								uri: 'https://cdn-icons-png.flaticon.com/512/49/49669.png',
							}}
							style={{ width: 50, height: 50 }}
						/>
					)}
				</Pressable>
				<Pressable onPress={replayStartStop}>
					{isReplay ? <Text>Replay stop</Text> : <Text>Replay start</Text>}
				</Pressable>
			</View>
			<View
				style={{
					marginLeft: 5,
					marginRight: 5,
					borderRadius: 15,
					backgroundColor: 'black',
					height: 20,
					width: 300,
					display: 'flex',
					alignSelf: 'center',
				}}
			>
				<Animated.View
					style={{
						backgroundColor: 'blue',
						width: fadeAnim,
						height: 20,
						top: 0,
						left: 0,
						position: 'absolute',
						borderRadius: 15,
					}}
				></Animated.View>
				<View style={[styles.flex, { marginLeft: 20, marginRight: 20 }]}>
					<Text style={{ color: 'white' }}>
						{status ? (status / 100000).toFixed(2) : '0.00'}
					</Text>
					<Text style={{ color: 'white' }}>
						{duration ? (duration / 100000).toFixed(2) : '0.00'}
					</Text>
				</View>
			</View>
		</View>
	)
}
