import PropTypes from 'prop-types'
import Header from '~/layouts/components/Header'

function HeaderOnly({ children }) {
    return (
        <div className="page full-width no-sidebar">
            <Header />
            <div className="container-fluid">
                <div className="wrapper-page">
                    <div className="content-page">{children}</div>
                </div>
            </div>
        </div>
    )
}

HeaderOnly.propTypes = {
    children: PropTypes.node.isRequired,
}

export default HeaderOnly
