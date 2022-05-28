import MapView, { Marker } from 'react-native-maps'
import { styles } from '../../styles'
import React, { useState, useEffect } from 'react'
import { Platform, Text, View, StyleSheet } from 'react-native'
import * as Location from 'expo-location'

export const Map = () => {
	const [location, setLocation] = useState(null)
	const [errorMsg, setErrorMsg] = useState(null)

	useEffect(() => {
		;(async () => {
			let { status } = await Location.requestForegroundPermissionsAsync()
			if (status !== 'granted') {
				setErrorMsg('Permission to access location was denied')
				return
			}

			let location = await Location.getCurrentPositionAsync({})
			setLocation(location.coords)
		})()
	}, [location])
	if (errorMsg) {
		alert(errorMsg)
	}

	return (
		<View style={styles.containerMap}>
			<MapView style={styles.map}>
				{location ? (
					<Marker
						coordinate={{
							latitude: location.latitude,
							longitude: location.longitude,
						}}
					/>
				) : (
					<></>
				)}
			</MapView>
		</View>
	)
}
