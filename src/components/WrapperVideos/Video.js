import PropTypes from 'prop-types'
import classNames from 'classnames/bind'
import styles from './Video.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faPause, faPlay } from '@fortawesome/free-solid-svg-icons'
import { useRef, useState, useEffect } from 'react'

import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import RangeTrackSlider from '~/components/RangeTrackSlider'
import RangeVolumeSlider from '../RangeVolumeSlider'

gsap.registerPlugin(ScrollTrigger)

const cx = classNames.bind(styles)

function Video({ data }) {
    const videoRef = useRef(null)
    const [videoElement, setVideoElement] = useState(null)

    const [duration, setDuration] = useState(data.meta.playtime_seconds)

    const [percentDurationSlider, setPercentDurationSlider] = useState(0)
    const [percentVolumeSlider, setPercentVolumeSlider] = useState(100)
    const [lastPercentVolumeSlider, setLastPercentVolumeSlider] = useState(0)
    const [timeDuration, setTimeDuration] = useState(data.meta.playtime_strings)
    const [currentTime, setCurrentTime] = useState('00:00')
    const [isPlaying, setIsPlaying] = useState(false)

    const [ratioVideo, setRatioVideo] = useState(() => data.meta.video.resolution_x / data.meta.video.resolution_y)

    useEffect(() => {
        setVideoElement(videoRef.current)
    }, [])

    const togglePlay = () => {
        setIsPlaying(!isPlaying)
        videoRef.current.paused ? videoRef.current.play() : videoRef.current.pause()
    }

    const handleBtnPlay = () => {
        togglePlay()
    }

    const handleValueTrackChange = (e) => {
        const percent = parseInt(e.target.value)
        videoElement.currentTime = (percent * videoElement.duration) / 100
        setPercentDurationSlider(e.target.value)
    }

    const handleValueVolumeChange = (e) => {
        const currentVolume = parseInt(e.target.value)
        if (currentVolume > 0) videoElement.muted = false
        setPercentVolumeSlider(() => currentVolume)
        videoElement.volume = currentVolume / 100
    }

    const handleMuted = () => {
        if (videoElement.muted) {
            setPercentVolumeSlider(lastPercentVolumeSlider)
        } else {
            setLastPercentVolumeSlider(videoElement.volume * 100)
            setPercentVolumeSlider(0)
        }
        videoElement.muted = !videoElement.muted
    }

    const handleLoadedVideo = () => {
        const duraM = Math.floor(videoElement.duration / 60)
        const duraS = Math.floor(videoElement.duration % 60)
        setDuration(() => videoElement.duration)
        setTimeDuration(() => `${duraM < 10 ? `0${duraM}` : duraM}:${duraS < 10 ? `0${duraS}` : duraS}`)
        // console.log(videoElement.videoWidth / videoElement.videoHeight)
    }

    const handleTimeUpdate = () => {
        const currentTimeM = Math.floor(videoElement.currentTime / 60)
        const currentTimeS = Math.floor(videoElement.currentTime % 60)
        const percent = (videoElement.currentTime / duration) * 100
        setCurrentTime(
            () =>
                `${currentTimeM < 10 ? `0${currentTimeM}` : currentTimeM}:${
                    currentTimeS < 10 ? `0${currentTimeS}` : currentTimeS
                }`,
        )
        setPercentDurationSlider(percent)
    }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('video-container')}>
                <video ref={videoRef} loop onLoadedMetadata={handleLoadedVideo} onTimeUpdate={handleTimeUpdate}>
                    <source src={data.file_url} type="video/mp4" />
                </video>
                <div className={cx('controls')}>
                    <button className={cx('btn-play')} onClick={handleBtnPlay}>
                        <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} />
                    </button>
                    <div className={cx('volume')}>
                        <RangeVolumeSlider
                            percent={percentVolumeSlider}
                            onValueChange={handleValueVolumeChange}
                            onMuted={handleMuted}
                        />
                    </div>

                    <div className={cx('duration')}>
                        <RangeTrackSlider percent={percentDurationSlider} onValueChange={handleValueTrackChange} />
                        <div className={cx('time')}>
                            {currentTime}/{timeDuration}
                        </div>
                    </div>
                </div>
            </div>
            <div className={cx('action-container')}>
                <button className={cx('btn-like')}>
                    <FontAwesomeIcon icon={faHeart} />
                </button>
            </div>
        </div>
    )
}

Video.propTypes = {
    data: PropTypes.object.isRequired,
}

export default Video
