import React, { createContext, useState } from 'react'

import { AnimatedTextListMeta, DrawListContextMeta, MealList } from '../types'
import { useAppSelector } from '../redux/hooks'
import { selectDrawList, selectMealList } from '../redux/selector'

interface Props {
	children: React.ReactNode
}

export const DrawListContext = createContext({} as DrawListContextMeta)

export function DrawListContextProvider({ children }: Props) {
	const drawListStorage = useAppSelector(selectDrawList)
	const [drawList, setDrawList] = useState<AnimatedTextListMeta[]>(
		drawListStorage === undefined ? [] : drawListStorage
	)
	const mealListStorage = useAppSelector(selectMealList)
	const [list, setList] = React.useState<MealList[]>(
		mealListStorage === undefined ? [] : mealListStorage
	)

	return (
		<DrawListContext.Provider value={{ drawList, setDrawList, list, setList }}>
			{children}
		</DrawListContext.Provider>
	)
}
