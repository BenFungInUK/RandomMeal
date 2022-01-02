import React, { useContext } from 'react'
import { Button, Icon, VStack, Input, Text, Center } from 'native-base'
import { SimpleLineIcons, MaterialIcons } from '@expo/vector-icons'

import { DrawListContext } from '../components/DrawListContext'
import { RootStackScreenProps, MealListMeta } from '../types'
import { useAppDispatch } from '../redux/hooks'
import { addItem } from '../redux/mealListSlice'
import { NewListItem } from '../components/NewListItem'
import { NewListItemModal } from '../components/NewListItemModal'

export default function NewListScreen({ navigation }: RootStackScreenProps<'NewList'>) {
	const context = useContext(DrawListContext)
	const dispatch = useAppDispatch()
	const [list, setList] = React.useState<MealListMeta[]>([])
	const [listName, setListName] = React.useState('')
	const [modalVisible, setModalVisible] = React.useState<boolean>(false)
	const initialRef = React.useRef(null)
	const finalRef = React.useRef(null)

	React.useLayoutEffect(() => {
		navigation.setOptions({
			headerRight: () => (
				<Button
					variant="unstyled"
					endIcon={<Icon as={<MaterialIcons name="save" />} name="save-item-button" size="sm" />}
					onPress={() => {
						dispatch(addItem({ title: listName, items: list, isSelected: false }))
						context.setList([...context.list, { title: listName, items: list, isSelected: false }])
						navigation.goBack()
					}}
				/>
			),
		})
	})

	return (
		<Center>
			<VStack space={2} w="90%">
				<Text mt="2">List Details</Text>
				<Input
					InputLeftElement={
						<Icon as={<SimpleLineIcons name="list" />} size={5} mr="2" color="muted.400" />
					}
					mx="6"
					variant="underlined"
					placeholder="List Name"
					onChangeText={(text) => setListName(text)}
					value={listName}
				/>
				<Text m="2" ml="0">
					Meal List
				</Text>
				{list.map((item, index) => {
					return (
						<NewListItem
							newListItem={item}
							itemI={index}
							onPress={handleDelete}
							onStatusChange={handleStatusChange}
							key={'NewListItem' + index.toString()}
						/>
					)
				})}
				<Button
					mt={4}
					leftIcon={<Icon as={<MaterialIcons name="add" />} name="add-item-button" size="sm" />}
					onPress={() => {
						setModalVisible(true)
						console.log('add')
					}}
				>
					Add New Meal
				</Button>
			</VStack>
			<NewListItemModal
				modalVisible={modalVisible}
				setModalVisible={setModalVisible}
				addMeal={addMeal}
				initialRef={initialRef}
				finalRef={finalRef}
			/>
		</Center>
	)

	function handleStatusChange(index: number) {
		const temp = list.map((item, itemI) =>
			itemI !== index ? item : { ...item, isSelected: !item.isSelected }
		)
		setList(temp)
	}

	function handleDelete(index: number) {
		const temp = list.filter((_, itemI) => itemI !== index)
		setList(temp)
	}

	function addMeal(meal: MealListMeta) {
		setList([...list, meal])
	}
}
