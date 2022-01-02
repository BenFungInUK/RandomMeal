import React, { useState } from 'react'
import { Modal, Input, Button, FormControl } from 'native-base'

import { MealListMeta } from '../types'

interface Props {
	modalVisible: boolean
	setModalVisible: (v: boolean) => void
	addMeal: (meal: MealListMeta) => void
	initialRef: React.RefObject<any>
	finalRef: React.RefObject<any>
}

export function NewListItemModal({
	modalVisible,
	setModalVisible,
	addMeal,
	initialRef,
	finalRef,
}: Props) {
	const [textInputValue, setTextInputValue] = useState('')

	return (
		<Modal
			isOpen={modalVisible}
			onClose={() => setModalVisible(false)}
			initialFocusRef={initialRef}
			finalFocusRef={finalRef}
		>
			<Modal.Content>
				<Modal.CloseButton />
				<Modal.Header>New Meal</Modal.Header>
				<Modal.Body>
					<FormControl>
						<FormControl.Label>Name</FormControl.Label>
						<Input
							ref={initialRef}
							onChangeText={(value) => setTextInputValue(value)}
							value={textInputValue}
						/>
					</FormControl>
				</Modal.Body>
				<Modal.Footer>
					<Button.Group space={2}>
						<Button
							variant="ghost"
							colorScheme="blueGray"
							onPress={() => {
								setModalVisible(false)
							}}
						>
							Cancel
						</Button>
						<Button
							onPress={() => {
								addMeal({ title: textInputValue, isSelected: true })
								setModalVisible(false)
							}}
						>
							Save
						</Button>
					</Button.Group>
				</Modal.Footer>
			</Modal.Content>
		</Modal>
	)
}
