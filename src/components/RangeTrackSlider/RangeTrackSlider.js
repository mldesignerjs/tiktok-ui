import PropTypes from 'prop-types'
import classNames from 'classnames/bind'
import styles from './RangeTrackSlider.module.scss'

const cx = classNames.bind(styles)

function RangeTrackSlider({ percent, onValueChange }) {
    return (
        <div className={cx('progress')}>
            <div style={{ width: `${percent}%` }} className={cx('progress_bar')}></div>
            <div style={{ left: `${percent}%` }} className={cx('progress_circle')}></div>
            <input defaultValue={0} type="range" name="" className={cx('range')} onChange={(e) => onValueChange(e)} />
        </div>
    )
}

RangeTrackSlider.propTypes = {
    percent: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onValueChange: PropTypes.func,
}

export default RangeTrackSlider
