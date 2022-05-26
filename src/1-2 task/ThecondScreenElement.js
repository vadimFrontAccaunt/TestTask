import React, { useState } from 'react'
import { Pressable, Text, View, Image } from 'react-native'
import { styles } from '../../styles'

const ThecondScreenElement = ({
	productID,
	productColor,
	productSize,
	productCount,
	productPicture,
}) => {
	const [deleteStatus, setDeleteStatus] = useState(true)
	return (
		<Pressable
			onPress={() => setDeleteStatus(!deleteStatus)}
			style={[
				styles.flex,
				{
					marginLeft: 40,
					marginRight: 40,
					marginTop: 30,
					alignItems: 'center',
					height: 100,
				},
			]}
		>
			{deleteStatus ? (
				<View>
					<Image
						style={{ height: 100, width: 80 }}
						source={{ uri: productPicture }}
					/>
				</View>
			) : (
				<></>
			)}
			<View style={{ width: '60%' }}>
				<Text>{productID}</Text>
				<View style={[styles.flex, { width: '20%', marginTop: 20 }]}>
					<Text>{productColor}</Text>
					<Text>{productSize}</Text>
				</View>
			</View>
			<View
				style={{
					backgroundColor: 'green',
					height: 20,
					width: '20%',
					borderRadius: 20,
				}}
			>
				<Text style={{ textAlign: 'center', color: 'white' }}>
					{productCount}
				</Text>
			</View>
			{deleteStatus ? (
				<></>
			) : (
				<Pressable
					style={{
						backgroundColor: 'red',
						height: '100%',
						marginLeft: 20,
						width: '20%',
						display: 'flex',
						justifyContent: 'center',
					}}
				>
					<Text style={{ color: 'white', textAlign: 'center' }}>Delete</Text>
				</Pressable>
			)}
		</Pressable>
	)
}

export default ThecondScreenElement
