module.exports = {
	plugins: ['react', 'react-native'],
	extends: ['@react-native-community', 'prettier'],
	rules: {
		'@typescript-eslint/no-explicit-any': 1,
		'react-native/no-unused-styles': 1,
		'react-native/no-color-literals': 1,
		semi: ['error', 'never'],
	},
}
