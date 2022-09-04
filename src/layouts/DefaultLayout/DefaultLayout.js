import PropTypes from 'prop-types'
import Header from '~/layouts/components/Header'
import Sidebar from '~/layouts/components/Sidebar'

function DefaultLayout({ children }) {
    return (
        <div className="page">
            <Header />
            <div className="container">
                <div className="wrapper-page">
                    <Sidebar />
                    <div className="content-page">{children}</div>
                </div>
            </div>
        </div>
    )
}

DefaultLayout.propTypes = {
    children: PropTypes.node.isRequired,
}

export default DefaultLayout
