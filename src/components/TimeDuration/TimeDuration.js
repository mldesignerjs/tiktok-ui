import PropTypes from 'prop-types'
import classNames from 'classnames/bind'
import styles from './TimeDuration.module.scss'

const cx = classNames.bind(styles)

function TimeDuration({ timeDuration, currentTime, className }) {
    const classes = cx('wrapper', { [className]: className })
    return (
        <div className={classes}>
            {currentTime}/{timeDuration}
        </div>
    )
}

TimeDuration.propTypes = {
    timeDuration: PropTypes.string,
    currentTime: PropTypes.string,
    className: PropTypes.string,
}

export default TimeDuration
