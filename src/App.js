import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { Fragment } from 'react'
import { publicRoutes } from '~/routes'
import DefaultLayout from '~/layouts'

function App() {
    return (
        <BrowserRouter>
            <Routes>
                {publicRoutes.map((route, index) => {
                    let Layout = DefaultLayout

                    if (route.layout) {
                        Layout = route.layout
                    } else if (route.layout === null) {
                        Layout = Fragment
                    }
                    const Page = route.component
                    return (
                        <Route
                            key={index}
                            path={route.path}
                            element={
                                <Layout>
                                    <Page />
                                </Layout>
                            }
                        />
                    )
                })}
            </Routes>
        </BrowserRouter>
    )
}

export default App
