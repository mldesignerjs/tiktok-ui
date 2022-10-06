import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'

import TimeAgo from 'javascript-time-ago'
import vi from 'javascript-time-ago/locale/vi.json'
import en from 'javascript-time-ago/locale/en.json'

import App from '~/App'
import reportWebVitals from '~/reportWebVitals'
import GlobalStyle from '~/components/GlobalStyles'
import store from '~/redux/store'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    // <React.StrictMode>
    <Provider store={store}>
        <GlobalStyle>
            <App />
        </GlobalStyle>
    </Provider>,
    // </React.StrictMode>,
)

TimeAgo.addDefaultLocale(vi)
TimeAgo.addLocale(en)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
