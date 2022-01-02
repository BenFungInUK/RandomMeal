import React, { createContext } from 'react'

import { AnimatedTextContextMeta } from '../../types'

interface Props {
	children: React.ReactNode
	// animText: AnimatedTextListMeta[]
	animTrigger: boolean
	toggleAnimTrigger: React.Dispatch<React.SetStateAction<boolean>>
}

export const AnimatedTextContext = createContext({} as AnimatedTextContextMeta)

export function AnimatedTextProvider({ children, animTrigger, toggleAnimTrigger }: Props) {
	// const [textList, setTextList] = useState<AnimatedTextListMeta[]>(animText)

	// function removeFirstAnimatedText() {
	// 	setTextList(textList.slice(1))
	// }

	return (
		<AnimatedTextContext.Provider value={{ animTrigger, toggleAnimTrigger }}>
			{children}
		</AnimatedTextContext.Provider>
	)
}
