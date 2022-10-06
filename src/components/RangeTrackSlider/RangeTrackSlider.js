import PropTypes from 'prop-types'
import classNames from 'classnames/bind'
import styles from './RangeTrackSlider.module.scss'

const cx = classNames.bind(styles)

function RangeTrackSlider({ percent, onValueChange, height = 2 }) {
    return (
        <div className={cx('progress')}>
            <div style={{ height: `${height}px` }} className={cx('progress_bg')}></div>
            <div style={{ width: `${percent}%`, height: `${height}px` }} className={cx('progress_bar')}></div>
            <div
                style={{ left: `${percent}%`, height: `${4 * height}px`, width: `${4 * height}px` }}
                className={cx('progress_circle')}
            ></div>
            <input defaultValue={0} type="range" name="" className={cx('range')} onChange={(e) => onValueChange(e)} />
        </div>
    )
}

RangeTrackSlider.propTypes = {
    percent: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onValueChange: PropTypes.func,
    height: PropTypes.number,
    heightWhenHover: PropTypes.number,
}

export default RangeTrackSlider
