import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'

import styles from './Menu.module.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)
function MenuItem({ to, icon, activeIcon, title, className }) {
    return (
        <NavLink to={to} className={({ isActive }) => cx('nav-link', isActive ? 'active' : '')}>
            {({ isActive }) => (
                <>
                    {isActive ? activeIcon : icon}
                    <span>{title}</span>
                </>
            )}
        </NavLink>
    )
}

MenuItem.propTypes = {
    to: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    className: PropTypes.string,
    icon: PropTypes.node.isRequired,
    activeIcon: PropTypes.node.isRequired,
}

export default MenuItem
