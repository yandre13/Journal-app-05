import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { authReducer } from './reducers/auth'
import { uiReducer } from './reducers/ui'
import { notesReducer } from './reducers/notes'
import { rootSaga } from './sagas'

const composeEnhancers =
	(typeof window !== 'undefined' &&
		window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
	compose

const reducers = combineReducers({
	auth: authReducer,
	ui: uiReducer,
	notes: notesReducer,
})

const sagaMiddleware = createSagaMiddleware()

export const store = createStore(
	reducers,
	composeEnhancers(applyMiddleware(sagaMiddleware))
)
sagaMiddleware.run(rootSaga)
