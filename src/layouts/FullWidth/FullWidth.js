import PropTypes from 'prop-types'
import Header from '~/layouts/components/Header'
import Sidebar from '~/layouts/components/Sidebar'

function FullWidth({ children }) {
    return (
        <div className="page full-width">
            <Header />
            <div className="container-fluid">
                <div className="wrapper-page">
                    <Sidebar />
                    <div className="content-page">{children}</div>
                </div>
            </div>
        </div>
    )
}

FullWidth.propTypes = {
    children: PropTypes.node.isRequired,
}

export default FullWidth
