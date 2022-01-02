import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { MealList, AnimatedTextListMeta } from '../types'

export interface MealListState {
	list: MealList[]
	drawList: AnimatedTextListMeta[] | undefined
}

const initialState: MealListState = {
	list: [],
	drawList: [],
}

export const mealListSlice = createSlice({
	name: 'mealList',
	initialState,
	reducers: {
		addItem: (state, action: PayloadAction<MealList>) => {
			state.list.push(action.payload)
		},
		updateList: (state, action: PayloadAction<MealList[]>) => {
			state.list = [...action.payload]
		},
		setDrawList: (state, action: PayloadAction<AnimatedTextListMeta[] | undefined>) => {
			state.drawList = [...action.payload!]
		},
	},
})

// Action creators are generated for each case reducer function
export const { addItem, updateList, setDrawList } = mealListSlice.actions

export default mealListSlice.reducer
