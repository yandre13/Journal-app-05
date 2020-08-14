import { TYPES } from 'store/types'
import { startLoading, finishLoading } from 'store/actions/ui'

describe('tests in ui actions', () => {
	test('should work all actions', () => {
		const action1 = startLoading()
		const action2 = finishLoading()
		expect(action1).toEqual({ type: TYPES.UI_START_LOADING })
		expect(action2).toEqual({ type: TYPES.UI_FINISH_LOADING })
	})
})
