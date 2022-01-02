import React, { useState } from 'react'
import { Box, Button, Center, VStack, Text } from 'native-base'

import { AnimatedTextProvider } from '../components/animations/AnimatedTextContext'
import { AnimatedText } from '../components/animations/AnimatedText'

export default function DrawScreen() {
	const [animTrigger, toggleAnimTrigger] = useState(false)

	return (
		<Center h="100%">
			<VStack w="100%" space={4} alignItems="center">
				<Box>
					<Text fontSize="6xl" textAlign="center">
						Your meal for today is
					</Text>
				</Box>
				<Box w="100%" h="150">
					<AnimatedTextProvider animTrigger={animTrigger} toggleAnimTrigger={toggleAnimTrigger}>
						<AnimatedText />
					</AnimatedTextProvider>
				</Box>
				<Button
					mt={16}
					w="80%"
					isDisabled={animTrigger}
					onPress={() => toggleAnimTrigger(!animTrigger)}
				>
					Draw
				</Button>
			</VStack>
		</Center>
	)
}
