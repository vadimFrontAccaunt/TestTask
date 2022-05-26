import { Formik } from 'formik'
import { Pressable, Text, View, TextInput } from 'react-native'
import * as yup from 'yup'
import React from 'react'
import { styles } from '../../styles'

const LoginScreen = () => {
	const valid = yup.object().shape({
		login: yup
			.string()
			.min(7)
			.typeError('Должно быть строкой')
			.required('Обязательно'),
		pass: yup
			.string()
			.min(7)
			.typeError('Должно быть строкой')
			.required('Обязательно')
			.matches(/[A-Z]/, 'must contain one uppercase')
			.matches(/([a-z])/, 'must contain one lowercase')
			.matches(/(\d)/, 'must contain one number')
			.matches(/(\W)/, 'must contain one special character'),
	})

	return (
		<View>
			<Formik
				initialValues={{ login: '', pass: '' }}
				validateOnBlur
				onSubmit={values =>
					alert('login :' + values.login + ' password :' + values.pass)
				}
				validationSchema={valid}
			>
				{({
					handleChange,
					handleBlur,
					handleSubmit,
					values,
					errors,
					isValid,
					touched,
				}) => (
					<View>
						<Text style={[styles.input, { borderWidth: 0 }]}>Login</Text>
						<TextInput
							style={styles.input}
							onChange={handleChange('login')}
							value={values.login}
							onBlur={handleBlur('login')}
						/>
						{touched.login && errors.login && (
							<Text style={{ textAlign: 'center', color: 'red' }}>
								{errors.login}
							</Text>
						)}
						<Text style={[styles.input, { borderWidth: 0 }]}>Password</Text>
						<TextInput
							style={styles.input}
							onChange={handleChange('pass')}
							value={values.pass}
							onBlur={handleBlur('pass')}
						/>
						{touched.pass && errors.pass && (
							<Text style={{ textAlign: 'center', color: 'red' }}>
								{errors.pass}
							</Text>
						)}
						<Pressable onPress={handleSubmit} disabled={!isValid}>
							<Text
								style={{ fontSize: 20, textAlign: 'center', marginTop: 20 }}
							>
								Send
							</Text>
						</Pressable>
					</View>
				)}
			</Formik>
		</View>
	)
}

export default LoginScreen
