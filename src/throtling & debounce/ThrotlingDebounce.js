import axios from 'axios'
import { View, TextInput } from 'react-native-web'

const instance = axios.create({
	withCredentials: true,
	baseURL: 'https://google.com',
	headers: {
		'API-KEY': '..........',
	},
})

const apiRequest = {
	getRezult(valueInput) {
		return instance
			.get(`someRezult?valueInput=${valueInput}`)
			.then(rez => rez.data)
	},
}

const deb = (fn, ms) => {
	let timeout
	return function () {
		const fnCall = () => {
			fn.apply(this, arguments)
		}
		clearTimeout(timeout)
		timeout = setTimeout(fnCall, ms)
	}
}

const Input = () => {
	return (
		<View>
			<TextInput onChangeText={deb(apiRequest.getRezult(this.value), 300)} />
		</View>
	)
}
