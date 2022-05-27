import * as React from 'react'

import { StyleSheet, View, Text } from 'react-native'
import Constants from 'expo-constants'
import WebView from 'react-native-webview'

export default function Browser() {
	return (
		<View style={styling.container}>
			<WebView source={{ uri: 'https://google.com' }} />
		</View>
	)
}

const styling = StyleSheet.create({
	container: {
		flex: 1,
		height: Constants.statusBarHeight,
	},
})
