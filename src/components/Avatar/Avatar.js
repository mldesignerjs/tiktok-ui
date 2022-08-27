import PropTypes from 'prop-types'
import { forwardRef } from 'react'
import classNames from 'classnames/bind'

import styles from './Avatar.module.scss'
import Image from '../Image'

const cx = classNames.bind(styles)

const Avatar = forwardRef(({ src, alt, size = 32 }, ref) => {
    return (
        <div ref={ref} className={cx('wrapper')} style={{ width: size, height: size }}>
            <Image src={src} alt={alt} className={cx('avatar')} />
        </div>
    )
})

Avatar.propTypes = {
    src: PropTypes.string.isRequired,
    alt: PropTypes.string,
    size: PropTypes.number,
}

export default Avatar
