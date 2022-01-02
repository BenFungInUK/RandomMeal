import { RootState } from './store'

export const selectMealList = (state: RootState) => state.list
export const selectDrawList = (state: RootState) => state.drawList
