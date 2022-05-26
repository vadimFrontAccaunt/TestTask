import React, { useState, useRef, useEffect } from 'react'
import {
	StyleSheet,
	Dimensions,
	View,
	Text,
	TouchableOpacity,
	Button,
	Image,
	Platform,
	Pressable,
} from 'react-native'
import { Camera } from 'expo-camera'
import * as ImagePicker from 'expo-image-picker'

const WINDOW_WIDTH = Dimensions.get('window').width

export const CameraOpen = () => {
	const cameraRef = useRef()
	const [image, setImage] = useState(null)
	const [hasPermission, setHasPermission] = useState(null)
	const [cameraType, setCameraType] = useState(Camera.Constants.Type.back)
	const [isPreview, setIsPreview] = useState(false)
	const [isCameraReady, setIsCameraReady] = useState(false)

	const pickImage = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1,
		})

		console.log(result)

		if (!result.cancelled) {
			setImage(result.uri)
		}
	}

	useEffect(() => {
		onHandlePermission()
	}, [])

	const onHandlePermission = async () => {
		const { status } = await Camera.requestCameraPermissionsAsync()
		setHasPermission(status === 'granted')
	}
	const onCameraReady = () => {
		setIsCameraReady(true)
	}
	const switchCamera = () => {
		if (isPreview) {
			return
		}
		setCameraType(prevCameraType =>
			prevCameraType === Camera.Constants.Type.back
				? Camera.Constants.Type.front
				: Camera.Constants.Type.back
		)
	}
	const onSnap = async () => {
		if (cameraRef.current) {
			const options = { quality: 0.7, base64: true }
			const data = await cameraRef.current.takePictureAsync(options)
			const source = data.base64

			if (source) {
				await cameraRef.current.pausePreview()
				setIsPreview(true)
			}
		}
	}
	const cancelPreview = async () => {
		await cameraRef.current.resumePreview()
		setIsPreview(false)
	}

	if (hasPermission === null) {
		return <View />
	}
	if (hasPermission === false) {
		return <Text style={styles.text}>No access to camera</Text>
	}
	return (
		<View style={styles.container}>
			<Camera
				ref={cameraRef}
				style={styles.container}
				type={cameraType}
				onCameraReady={onCameraReady}
			/>
			<View style={styles.container}>
				{isPreview && (
					<TouchableOpacity
						onPress={cancelPreview}
						style={styles.closeButton}
						activeOpacity={0.7}
					>
						<Text style={styles.text}>X</Text>
					</TouchableOpacity>
				)}
				{!isPreview && (
					<View style={styles.bottomButtonsContainer}>
						<TouchableOpacity disabled={!isCameraReady} onPress={switchCamera}>
							<Text style={styles.text}>Switch</Text>
						</TouchableOpacity>
						<TouchableOpacity
							activeOpacity={0.7}
							disabled={!isCameraReady}
							onPress={onSnap}
							style={styles.capture}
						/>
						<View>
							<Pressable onPress={pickImage}>
								<Text style={styles.text}>Gallery</Text>
							</Pressable>
							{image && (
								<Image
									source={{ uri: image }}
									style={{ width: 200, height: 200 }}
								/>
							)}
						</View>
					</View>
				)}
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		...StyleSheet.absoluteFillObject,
	},
	text: {
		color: '#fff',
	},
	bottomButtonsContainer: {
		position: 'absolute',
		bottom: 30,
		left: 0,
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-evenly',
		width: WINDOW_WIDTH,
		alignItems: 'center',
	},
	capture: {
		height: 60,
		width: 60,
		backgroundColor: 'white',
		borderRadius: 30,
		borderColor: 'purple',
		borderWidth: 10,
	},
	text: {
		color: 'white',
		fontSize: 20,
	},
	closeButton: {
		position: 'absolute',
		top: 40,
		right: 40,
	},
})
