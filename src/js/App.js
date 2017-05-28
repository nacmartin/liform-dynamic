import React from 'react'
import { createStore, combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import { Provider } from 'react-redux'
import Example1 from './Example1'


const onSubmit = (values) => { window.alert(`You submitted:\n\n${JSON.stringify(values, null, 2)}`) }

const App = () => {
    const reducer = combineReducers({ form: formReducer })
    const store = createStore(reducer,  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
    return (
        <Provider store={store}>
            <div>
                <h1>Dynamic form</h1>
                <Example1 onSubmit={onSubmit}/>
            </div>
        </Provider>
    )
}

export default App
