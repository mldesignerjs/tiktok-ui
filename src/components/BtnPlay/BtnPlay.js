import PropTypes from 'prop-types'
import classNames from 'classnames/bind'

import styles from './BtnPlay.module.scss'
import { useCallback } from 'react'
import { PauseIcon, PlayIcon } from '../Icons'

const cx = classNames.bind(styles)

function BtnPlay({ videoElement, className, size, isPlaying, setIsPlaying }) {
    const play = useCallback(() => {
        if (videoElement) {
            videoElement.play()
        }
        setIsPlaying(true)
    }, [videoElement])

    const pause = useCallback(() => {
        if (videoElement) videoElement.pause()
        setIsPlaying(false)
    }, [videoElement])

    const togglePlay = () => {
        if (isPlaying) {
            pause()
        } else {
            play()
        }
    }

    const handleBtnPlay = () => {
        togglePlay()
    }

    const classes = cx('wrapper', { [className]: className })
    return (
        <button className={classes} onClick={handleBtnPlay}>
            {isPlaying ? <PauseIcon width={size} height={size} /> : <PlayIcon width={size} height={size} />}
        </button>
    )
}

BtnPlay.propTypes = {
    videoElement: PropTypes.any,
    className: PropTypes.string,
    size: PropTypes.string,
}

export default BtnPlay
