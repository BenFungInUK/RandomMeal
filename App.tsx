import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { NativeBaseProvider, extendTheme } from 'native-base'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

import useCachedResources from './hooks/useCachedResources'
import useColorScheme from './hooks/useColorScheme'
import Navigation from './navigation'
import { store, persistor } from './redux/store'

export default function App() {
	const isLoadingComplete = useCachedResources()
	const colorScheme = useColorScheme()
	// Define the config
	const config = {
		useSystemColorMode: true,
		initialColorMode: colorScheme,
	}
	const customTheme = extendTheme({ config })

	if (!isLoadingComplete) {
		return null
	} else {
		return (
			<Provider store={store}>
				<PersistGate loading={null} persistor={persistor}>
					<NativeBaseProvider theme={customTheme}>
						<Navigation colorScheme={colorScheme} />
						<StatusBar />
					</NativeBaseProvider>
				</PersistGate>
			</Provider>
		)
	}
}
