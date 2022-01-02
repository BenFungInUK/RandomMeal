/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { SimpleLineIcons } from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import * as React from 'react'
import { ColorSchemeName } from 'react-native'

import Colors from '../constants/Colors'
import useColorScheme from '../hooks/useColorScheme'
import ModalScreen from '../screens/NewListScreen'
import NotFoundScreen from '../screens/NotFoundScreen'
import DrawScreen from '../screens/DrawScreen'
import MealListScreen from '../screens/MealListScreen'
import { RootStackParamList, RootTabParamList } from '../types'
import LinkingConfiguration from './LinkingConfiguration'
import { DrawListContextProvider } from '../components/DrawListContext'

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
	return (
		<NavigationContainer
			linking={LinkingConfiguration}
			theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
		>
			<RootNavigator />
		</NavigationContainer>
	)
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>()

function RootNavigator() {
	return (
		<DrawListContextProvider>
			<Stack.Navigator>
				<Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
				<Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
				{/* <Stack.Group screenOptions={{ presentation: 'modal' }}> */}
				<Stack.Screen
					name="NewList"
					component={ModalScreen}
					options={{
						animation: 'slide_from_right',
					}}
				/>
				{/* </Stack.Group> */}
			</Stack.Navigator>
		</DrawListContextProvider>
	)
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>()

function BottomTabNavigator() {
	const colorScheme = useColorScheme()

	return (
		<BottomTab.Navigator
			initialRouteName="Draw"
			screenOptions={{
				tabBarActiveTintColor: Colors[colorScheme].tint,
			}}
		>
			<BottomTab.Screen
				name="Draw"
				component={DrawScreen}
				options={() => ({
					title: 'Draw',
					tabBarIcon: ({ color }) => <TabBarIcon name="drawer" color={color} />,
				})}
			/>
			<BottomTab.Screen
				name="MealList"
				component={MealListScreen}
				options={() => ({
					title: 'Meal List',
					tabBarIcon: ({ color }) => <TabBarIcon name="list" color={color} />,
				})}
			/>
		</BottomTab.Navigator>
	)
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
	name: React.ComponentProps<typeof SimpleLineIcons>['name']
	color: string
}) {
	return <SimpleLineIcons size={30} style={{ marginBottom: -3 }} {...props} />
}
