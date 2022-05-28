import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
	flex: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	closed: {
		textAlign: 'right',
		marginTop: 30,
		marginRight: 30,
		color: 'red',
		fontSize: 20,
		position: 'absolute',
		bottom: 150,
		right: 0,
	},
	input: {
		borderWidth: 2,
		marginRight: 'auto',
		marginLeft: 'auto',
		width: '80%',
		fontSize: 20,
		marginTop: 20,
	},
	changeLang: {
		borderWidth: 2,
		textAlign: 'center',
		marginLeft: '40%',
		marginRight: '40%',
		marginTop: 30,
	},
	mainScreenButtons: {
		fontSize: 18,
		width: 100,
		textAlign: 'center',
		borderWidth: 2,
		height: 60,
		paddingTop: 7,
	},
	audioContainer: {
		flexDirection: 'row',
		justifyContent: 'space-evenly',
		backgroundColor: '#ecf0f1',
		alignItems: 'center',
		padding: 10,
	},
	containerQR: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center',
	},
})
