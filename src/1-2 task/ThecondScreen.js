import { View } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import ThecondScreenElement from './ThecondScreenElement'

const ThecondScreen = () => {
	const id = useSelector(state => state.opendCartoon)
	const prod = useSelector(state => state.cartoons[id].products)
	let empty
	if (prod.length === 0) {
		empty = false
	} else {
		empty = true
	}
	return (
		<View>
			{empty ? (
				prod.map(el => (
					<ThecondScreenElement
						key={el.productID}
						productID={el.productID}
						productColor={el.productColor}
						productSize={el.productSize}
						productCount={el.productCount}
						productPicture={el.productPicture}
					/>
				))
			) : (
				<Text style={{ textAlign: 'center', marginTop: 50 }}>
					Sorry, my state is empty
				</Text>
			)}
		</View>
	)
}

export default ThecondScreen
