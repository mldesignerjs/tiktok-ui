import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames/bind'
import styles from './RangeVolumeSlider.module.scss'
import { VolumeIcon, VolumeOffIcon } from '~/components/Icons'
import { useVolumeStore } from '~/redux'

const cx = classNames.bind(styles)

function RangeVolumeSlider({ onValueChange, onMuted }) {
    const { stateVolumeStore } = useVolumeStore()
    const { volume, muted } = stateVolumeStore

    const [marginLeft, setMarginLeft] = useState(volume)

    useEffect(() => {
        setMarginLeft(-(volume / 100) * 12 + 6)
    }, [volume])

    return (
        <div className={cx('wrapper')}>
            <div className={cx('icon')} onClick={onMuted}>
                {muted ? <VolumeOffIcon /> : <VolumeIcon />}
            </div>
            <div className={cx('progress')}>
                <div style={{ width: `${volume}%` }} className={cx('progress_bar')}></div>
                <div
                    style={{ left: `${volume}%`, marginLeft: `${marginLeft}px` }}
                    className={cx('progress_circle')}
                ></div>
                <input defaultValue={100} type="range" name="" className={cx('range')} onChange={onValueChange} />
            </div>
        </div>
    )
}

RangeVolumeSlider.propTypes = {
    percent: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onValueChange: PropTypes.func,
}

export default RangeVolumeSlider
