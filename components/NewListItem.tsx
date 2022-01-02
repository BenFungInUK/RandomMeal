import React from 'react'
import { HStack, Checkbox, Text, Icon, IconButton } from 'native-base'
import { Entypo } from '@expo/vector-icons'

import { MealListMeta } from '../types'

interface Props {
	newListItem: MealListMeta
	itemI: number
	onPress: (itemI: number) => void
	onStatusChange: (itemI: number) => void
	key: React.Key
}

export function NewListItem({ newListItem, itemI, onPress, onStatusChange }: Props) {
	return (
		<HStack
			w="100%"
			justifyContent="space-between"
			alignItems="center"
			// key={newListItem.title + itemI.toString() + 'HStack'}
			space={2}
		>
			<Checkbox
				isChecked={newListItem.isSelected}
				onChange={() => onStatusChange(itemI)}
				accessibilityLabel="Select meal to draw"
				value={newListItem.title}
				// key={newListItem.title + itemI.toString() + 'CheckBox'}
			/>
			<Text
				mx="2"
				_light={{
					color: 'coolGray.800',
				}}
				_dark={{
					color: 'coolGray.50',
				}}
				// key={newListItem.title + itemI.toString() + 'Text'}
			>
				{newListItem.title}
			</Text>
			<IconButton
				size="sm"
				colorScheme="trueGray"
				icon={<Icon as={Entypo} name="minus" size="xs" color="trueGray.400" />}
				onPress={() => onPress(itemI)}
				// key={newListItem.title + itemI.toString() + 'IconBtn'}
			/>
		</HStack>
	)
}
