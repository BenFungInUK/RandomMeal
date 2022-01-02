/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */
import React from 'react'
import { Animated } from 'react-native'
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'

declare global {
	namespace ReactNavigation {
		interface RootParamList extends RootStackParamList {}
	}
}

export type RootStackParamList = {
	Root: NavigatorScreenParams<RootTabParamList> | undefined
	NewList: undefined
	NotFound: undefined
}

export type RootStackScreenProps<Screen extends keyof RootStackParamList> = NativeStackScreenProps<
	RootStackParamList,
	Screen
>
export type NewListScreenParams = {
	setMealList: (list: MealList[]) => void
}

// export type DrawScreenParams = {
// 	setDrawList: (list: AnimatedTextListMeta[]) => void
// }

export type RootTabParamList = {
	Draw: undefined
	MealList: undefined
}

export type RootTabScreenProps<Screen extends keyof RootTabParamList> = CompositeScreenProps<
	BottomTabScreenProps<RootTabParamList, Screen>,
	NativeStackScreenProps<RootStackParamList>
>

export type MealListMeta = {
	title: string
	isSelected: boolean
}

export type MealList = {
	title: string
	items: MealListMeta[]
	isSelected: boolean
}

export type AnimatedTextListMeta = {
	// id: number
	value: string
}

export type DrawListContextMeta = {
	drawList: AnimatedTextListMeta[]
	setDrawList: React.Dispatch<React.SetStateAction<AnimatedTextListMeta[]>>
	list: MealList[]
	setList: React.Dispatch<React.SetStateAction<MealList[]>>
}

export type AnimatedTextContextMeta = {
	// textList: AnimatedTextListMeta[]
	// setTextList: React.Dispatch<React.SetStateAction<AnimatedTextListMeta[]>>
	// removeFirstAnimatedText: () => void
	animTrigger: boolean
	toggleAnimTrigger: React.Dispatch<React.SetStateAction<boolean>>
}

export type AnimMeta = {
	fadeAnim: Animated.Value
	marginAnim: Animated.Value
}
