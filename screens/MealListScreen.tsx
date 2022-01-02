import React, { useContext, useLayoutEffect, useState, useRef } from 'react'
import { Box, VStack, Icon, IconButton, Center, Divider, Input } from 'native-base'
import { MaterialIcons } from '@expo/vector-icons'

import Colors from '../constants/Colors'
import useColorScheme from '../hooks/useColorScheme'
import { MealList, RootTabScreenProps, MealListMeta } from '../types'
import { useAppDispatch } from '../redux/hooks'
import { updateList, setDrawList } from '../redux/mealListSlice'
import { MealListItem } from '../components/MealListItem'
import { DrawListContext } from '../components/DrawListContext'

export default function MealListScreen({ navigation }: RootTabScreenProps<'MealList'>) {
	const context = useContext(DrawListContext)
	const colorScheme = useColorScheme()
	const dispatch = useAppDispatch()
	const [inputValue, setInputValue] = useState('')
	const filterdMeal = useRef(context.list)

	useLayoutEffect(() => {
		navigation.setOptions({
			headerRight: () => (
				<IconButton
					icon={
						<Icon
							as={MaterialIcons}
							name="add-circle-outline"
							size={25}
							color={Colors[colorScheme].text}
						/>
					}
					onPress={() => navigation.push('NewList')}
				/>
			),
		})
	}, [colorScheme, navigation])

	return (
		<Box my="3">
			<Center>
				<VStack space={3} width="90%">
					<Input
						onChangeText={(v) => {
							setInputValue(v)
							filterdMeal.current = context.list.filter((item) => item.title.includes(v))
						}}
						value={inputValue}
						InputLeftElement={
							<Icon as={<MaterialIcons name="search" />} size={5} mx="2" color="muted.400" />
						}
						placeholder="Search"
					/>
					<Divider />
					{inputValue.length === 0
						? context.list.map((item, index) => {
								return (
									<MealListItem
										mealListItem={item}
										itemI={index}
										onPress={handleDelete}
										onStatusChange={handleStatusChange}
										key={'MealListItem' + index.toString()}
									/>
								)
						  })
						: filterdMeal.current.map((item, index) => {
								return (
									<MealListItem
										mealListItem={item}
										itemI={index}
										onPress={handleDelete}
										onStatusChange={handleStatusChange}
										key={'MealListItem' + index.toString()}
									/>
								)
						  })}
				</VStack>
			</Center>
			{/* <Fab
				position="absolute"
				mb={24}
				size="sm"
				icon={<Icon color="white" as={<AntDesign name="plus" />} size="sm" />}
				onPress={() => navigation.push('NewList')}
			/> */}
		</Box>
	)

	function handleStatusChange(index: number) {
		const temp = context.list.map((item, itemI) =>
			itemI !== index ? item : { ...item, isSelected: !item.isSelected }
		)
		dispatch(updateList(temp))
		context.setList(temp)
		updateDrawList(temp)
	}

	function handleDelete(index: number) {
		const temp = context.list.filter((_, itemI) => itemI !== index)
		dispatch(updateList(temp))
		context.setList(temp)
	}

	function updateDrawList(temp: MealList[]) {
		const selectedList = temp.filter((item) => item.isSelected)
		console.log('selectedList')
		console.log(selectedList)

		const selectedItems: MealListMeta[] = []

		selectedList.forEach((seleList) =>
			seleList.items
				.filter((mealItem) => mealItem.isSelected)
				.forEach((selectedMeal) => selectedItems.push(selectedMeal))
		)
		console.log('selectedItems')
		console.log(selectedItems)

		const drawList = selectedItems.map((item) => ({ value: item.title }))

		dispatch(setDrawList(drawList))
		context.setDrawList(drawList)
		console.log('Going to set drawlist to storage')
		console.log(drawList)
	}
}
