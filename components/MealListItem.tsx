import React from 'react'
import { HStack, Checkbox, Text, Icon, IconButton } from 'native-base'
import { Entypo } from '@expo/vector-icons'

import { MealList } from '../types'

interface Props {
	mealListItem: MealList
	itemI: number
	onPress: (itemI: number) => void
	onStatusChange: (itemI: number) => void
	key: React.Key
}

export function MealListItem({ mealListItem, itemI, onPress, onStatusChange }: Props) {
	return (
		<HStack
			w="100%"
			justifyContent="space-between"
			alignItems="center"
			// key={mealListItem.title + itemI.toString() + 'HStack'}
			space={2}
		>
			<Checkbox
				isChecked={mealListItem.isSelected}
				onChange={() => onStatusChange(itemI)}
				accessibilityLabel="Select meal list to draw"
				value={mealListItem.title}
				// key={mealListItem.title + itemI.toString() + 'Checkbox'}
			/>
			<Text
				mx="2"
				_light={{
					color: 'coolGray.800',
				}}
				_dark={{
					color: 'coolGray.50',
				}}
				// key={mealListItem.title + itemI.toString() + 'Text'}
			>
				{mealListItem.title}
			</Text>
			<IconButton
				size="sm"
				colorScheme="trueGray"
				icon={<Icon as={Entypo} name="minus" size="xs" color="trueGray.400" />}
				onPress={() => onPress(itemI)}
				// key={mealListItem.title + itemI.toString() + 'IconBtn'}
			/>
		</HStack>
	)
}
