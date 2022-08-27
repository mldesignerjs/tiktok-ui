import { Link, useMatch, useResolvedPath } from 'react-router-dom'

import PropTypes from 'prop-types'

import classNames from 'classnames/bind'
import styles from './Button.module.scss'

const cx = classNames.bind(styles)

function Button({
    to,
    href,
    onClick,
    children,
    leftIcon,
    rightIcon,
    align = 'center',
    disabled = false,
    primary = false,
    outline = false,
    rounded = false,
    small = false,
    w100 = false,
    className,
    ...passProps
}) {
    let Comp = 'button'

    const props = {
        onClick,
        ...passProps,
    }

    if (disabled) {
        Object.keys(props).forEach((key) => {
            if (key.startsWith('on') && typeof props[key] === 'function') {
                delete props[key]
            }
        })
    }

    if (href) {
        props.href = href
        Comp = 'a'
    }

    const classes = cx('wrapper', {
        [className]: className,
        primary,
        outline,
        rounded,
        small,
        w100,
        [align]: align,
    })

    return (
        <>
            {to ? (
                <CustomLink to={to} className={classes}>
                    {leftIcon && <span className={cx('icon')}>{leftIcon}</span>}
                    <span>{children}</span>
                    {rightIcon && <span className={cx('icon')}>{rightIcon}</span>}
                </CustomLink>
            ) : (
                <Comp className={classes} {...props}>
                    {leftIcon && <span className={cx('icon')}>{leftIcon}</span>}
                    <span>{children}</span>
                    {rightIcon && <span className={cx('icon')}>{rightIcon}</span>}
                </Comp>
            )}
        </>
    )
}

function CustomLink({ to, className, children }) {
    let resolved = useResolvedPath(to)

    let match = useMatch({ path: resolved.pathname, end: true })

    const classes = cx({
        active: match,
        [className]: className,
    })
    return (
        <Link to={to} className={classes}>
            {children}
        </Link>
    )
}

Button.propTypes = {
    to: PropTypes.string,
    href: PropTypes.string,
    className: PropTypes.string,
    onClick: PropTypes.func,
    align: PropTypes.oneOf(['center', 'left', 'right']),
    children: PropTypes.node.isRequired,
    leftIcon: PropTypes.node,
    rightIcon: PropTypes.node,
    disabled: PropTypes.bool,
    primary: PropTypes.bool,
    outline: PropTypes.bool,
    rounded: PropTypes.bool,
    small: PropTypes.bool,
    w100: PropTypes.bool,
}

export default Button
