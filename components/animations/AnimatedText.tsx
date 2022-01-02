import React, { useContext, useRef, useEffect } from 'react'
import { Animated, Easing } from 'react-native'
import { ZStack, Box } from 'native-base'

import useColorScheme from '../../hooks/useColorScheme'
import Colors from '../../constants/Colors'
import { AnimatedTextContext } from './AnimatedTextContext'
import { DrawListContext } from '../DrawListContext'
import { AnimMeta } from '../../types'

export function AnimatedText() {
	const colorScheme = useColorScheme()
	const context = useContext(AnimatedTextContext)
	const drawContext = useContext(DrawListContext)
	const animRunning = useRef(false)
	const fadeMarginAnim = useRef<AnimMeta[] | null>(null)
	const animRef = useRef<Animated.CompositeAnimation | null>(null)
	if (
		animRef.current === null ||
		fadeMarginAnim.current === null ||
		fadeMarginAnim.current.length !== drawContext.drawList.length
	) {
		fadeMarginAnim.current = initalizeAnim()
		animRef.current = Animated.loop(Animated.stagger(500, fadeInOut()))
	}

	const endingRef = useRef<Animated.CompositeAnimation | null>(null)

	useEffect(() => {
		if (context.animTrigger) {
			animRef.current!.reset()
			animRef.current!.start()
			animRunning.current = true
			setTimeout(() => {
				animRef.current!.stop()
				endingRef.current = endingAnim()
				endingRef.current!.start(() => {
					endingRef.current!.reset()
				})
				animRunning.current = false
				context.toggleAnimTrigger(false)
			}, (Math.floor(Math.random() * 5) + 1) * 1000)
		}
		console.log(context.animTrigger)
		// console.log(context.animTrigger)
	})

	return (
		<ZStack alignItems="center">
			{drawContext.drawList.map((aText, index) => {
				return (
					<Box key={'Box' + index} mt={2}>
						<Animated.Text
							key={index}
							style={{
								opacity: fadeMarginAnim.current![index].fadeAnim,
								marginTop: fadeMarginAnim.current![index].marginAnim,
								color: colorScheme === 'light' ? Colors.light.text : Colors.dark.text,
								fontSize: 32,
								textAlign: 'center',
							}}
						>
							{aText.value}
						</Animated.Text>
					</Box>
				)
			})}
			{/* <Box>
				<Image source={require('../../assets/images/border-trim.png')} alt="border" />
			</Box> */}
		</ZStack>
	)

	// function runAnimation() {
	// 	animRef.current!.start(() => {
	// 		if (context.animTrigger === false) {
	// 			animRef.current!.reset()
	// 			runAnimation()
	// 			// console.log(fadeMarginAnim.current)
	// 		}
	// 	})
	// }

	function initalizeAnim() {
		console.log('init')
		const arr: AnimMeta[] = []
		for (var i = 0; i < drawContext.drawList.length; i++) {
			arr.push({ fadeAnim: new Animated.Value(0), marginAnim: new Animated.Value(100) })
		}
		return arr
	}

	function fadeInOut() {
		const animations = fadeMarginAnim.current!.map((item) => {
			return Animated.sequence([
				Animated.parallel([
					Animated.timing(item.fadeAnim, {
						toValue: 1,
						duration: 250,
						useNativeDriver: false,
						easing: Easing.linear,
					}),
					Animated.timing(item.marginAnim, {
						toValue: 50,
						duration: 250,
						useNativeDriver: false,
						easing: Easing.linear,
					}),
				]),
				Animated.parallel([
					Animated.timing(item.fadeAnim, {
						toValue: 0,
						duration: 250,
						useNativeDriver: false,
						easing: Easing.linear,
					}),
					Animated.timing(item.marginAnim, {
						toValue: 0,
						duration: 250,
						useNativeDriver: false,
						easing: Easing.linear,
					}),
				]),
			])
		})

		return animations
	}

	function getResultIndex(arr: AnimMeta[]) {
		if (arr.length === 0) {
			return -1
		}

		var max = parseFloat(JSON.stringify(arr[0].fadeAnim))
		var maxIndex = 0

		for (var i = 1; i < arr.length; i++) {
			if (parseFloat(JSON.stringify(arr[i].fadeAnim)) > max) {
				maxIndex = i
				max = parseFloat(JSON.stringify(arr[i].fadeAnim))
			}
			console.log(arr[i].fadeAnim)
		}

		return maxIndex
	}

	function endingAnim() {
		const maxIndex = getResultIndex(fadeMarginAnim.current!)
		const animations = Animated.parallel([
			Animated.timing(fadeMarginAnim.current![maxIndex].fadeAnim, {
				toValue: 1,
				duration: 250,
				useNativeDriver: false,
				easing: Easing.linear,
			}),
			Animated.timing(fadeMarginAnim.current![maxIndex].marginAnim, {
				toValue: 50,
				duration: 250,
				useNativeDriver: false,
				easing: Easing.linear,
			}),
		])

		return animations
	}
}
