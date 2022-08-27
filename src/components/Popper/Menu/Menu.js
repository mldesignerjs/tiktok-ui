import PropTypes from 'prop-types'
import { useState } from 'react'

import Tippy from '@tippyjs/react/headless'

import { Popper as WrapperPopper } from '~/components/Popper'

import Button from '../../Button'
import Header from './Header'
import classNames from 'classnames/bind'
import styles from './Menu.module.scss'
const cx = classNames.bind(styles)

const defaultFn = () => {}

function Menu({ children, hideOnClick = false, items = [], onChange = defaultFn }) {
    const [history, setHistory] = useState([{ data: items }])
    const current = history[history.length - 1]

    const handleBack = () => {
        setHistory((prev) => prev.slice(0, prev.length - 1))
    }

    const renderResult = (attrs) => (
        <div className={cx('menu')} tabIndex="-1" {...attrs}>
            <WrapperPopper>
                {history.length > 1 && <Header title={current.title} onBack={handleBack} />}
                <ul className={cx('menu-list')}>
                    {current.data.map((menu, index) => {
                        const isParent = !!menu.children

                        const handleIn = () => {
                            if (isParent) {
                                setHistory((prev) => [...prev, menu.children])
                            } else {
                                onChange(menu)
                            }
                        }

                        return (
                            <li key={index}>
                                <Button
                                    leftIcon={menu.icon}
                                    to={menu.to}
                                    w100
                                    className={cx('menu-item', {
                                        separate: menu.separate,
                                    })}
                                    align="left"
                                    onClick={handleIn}
                                >
                                    {menu.title}
                                </Button>
                            </li>
                        )
                    })}
                </ul>
            </WrapperPopper>
        </div>
    )

    const handleResetToFirstPage = () => {
        setHistory((prev) => prev.slice(0, 1))
    }

    return (
        <Tippy
            placement="bottom-end"
            interactive
            offset={[0, 15]}
            hideOnClick={hideOnClick}
            delay={[100, 500]}
            render={renderResult}
            onHide={handleResetToFirstPage}
        >
            {children}
        </Tippy>
    )
}

Menu.propTypes = {
    children: PropTypes.node.isRequired,
    datas: PropTypes.array,
    hideOnClick: PropTypes.bool,
    onChange: PropTypes.func,
}

export default Menu
