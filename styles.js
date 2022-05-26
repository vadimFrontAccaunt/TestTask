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
})
