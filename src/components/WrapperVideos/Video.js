import PropTypes from 'prop-types'
import classNames from 'classnames/bind'
import styles from './Video.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPause, faPlay } from '@fortawesome/free-solid-svg-icons'
import { useRef, useState, useEffect } from 'react'

import RangeTrackSlider from '~/components/RangeTrackSlider'
import RangeVolumeSlider from '../RangeVolumeSlider'
import { CommentIcon, HeartIcon, ShareIcon } from '../Icons'
import { useCallback } from 'react'
import { useElementOnScreen } from '~/hooks'
import Image from '../Image'

const cx = classNames.bind(styles)

function Video({ data }) {
    const wrapperRef = useRef(null)
    const videoRef = useRef(null)

    const sizeVideo = styles.sizeVideo

    const [classSize, setClassSize] = useState(null)

    const [wrapperElement, setWrapperElement] = useState(null)
    const [videoElement, setVideoElement] = useState(null)

    const [duration, setDuration] = useState(data.meta.playtime_seconds)

    const [percentDurationSlider, setPercentDurationSlider] = useState(0)
    const [percentVolumeSlider, setPercentVolumeSlider] = useState(100)
    const [lastPercentVolumeSlider, setLastPercentVolumeSlider] = useState(0)
    const [timeDuration, setTimeDuration] = useState(data.meta.playtime_strings)
    const [currentTime, setCurrentTime] = useState('00:00')
    const [isPlaying, setIsPlaying] = useState(false)

    const [ratioVideo, setRatioVideo] = useState()

    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.8,
    }

    const isVisibile = useElementOnScreen(options, wrapperRef)

    // const [widthVideo, setWidthVideo] = useState(data.meta.video.resolution_x)
    // const [size, setHeightVideo] = useState(data.meta.video.resolution_y)

    const play = () => {
        if (videoElement) videoElement.play()
        setIsPlaying(true)
    }

    const pause = () => {
        if (videoElement) videoElement.pause()
        setIsPlaying(false)
    }

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

    const handleMuted = useCallback(() => {
        if (videoElement) {
            if (videoElement.muted) {
                setPercentVolumeSlider(lastPercentVolumeSlider)
            } else {
                setLastPercentVolumeSlider(videoElement.volume * 100)
                setPercentVolumeSlider(0)
            }

            videoElement.muted = !videoElement.muted

            return videoElement.muted
        }
        return null
    }, [lastPercentVolumeSlider, videoElement])

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

    const classes = cx('wrapper', {
        [classSize]: classSize,
    })

    useEffect(() => {
        const ratio = data.meta.video.resolution_x / data.meta.video.resolution_y
        setRatioVideo(ratio)
        setClassSize(ratio < 1 ? 'wrapper-height' : 'wrapper-width')
        setWrapperElement(wrapperRef.current)
        setVideoElement(videoRef.current)
    }, [data, isVisibile])

    useEffect(() => {
        const handKeyDown = (e) => {
            if (e.keyCode === 77) {
                handleMuted()
            }
        }
        const handleFocusWindow = () => {
            play()
        }

        const handleBlurWindow = () => {
            pause()
        }

        window.addEventListener('focus', handleFocusWindow)

        window.addEventListener('blur', handleBlurWindow)

        document.addEventListener('keydown', handKeyDown)

        return () => {
            document.removeEventListener('keydown', handKeyDown)

            window.removeEventListener('focus', handleFocusWindow)

            window.removeEventListener('blur', handleBlurWindow)
        }
    }, [handleMuted])

    useEffect(() => {
        if (wrapperElement)
            if (videoElement) {
                if (isVisibile) {
                    if (!isPlaying) {
                        play()
                    }
                } else {
                    if (isPlaying) {
                        pause()
                    }
                }
            }
    }, [isVisibile])

    return (
        <div className={classes} ref={wrapperRef}>
            <div
                className={cx('video-container')}
                style={{
                    width: ratioVideo < 1 ? `calc(${sizeVideo}*${ratioVideo})` : '',
                    height: ratioVideo > 1 ? `calc(${sizeVideo}/${ratioVideo})` : '',
                }}
            >
                <div className={cx('container')}>
                    <Image src={data.thumb_url} />
                    {isVisibile && (
                        <div className={cx('player')}>
                            <video
                                ref={videoRef}
                                playsInline={true}
                                autoPlay
                                loop
                                onLoadedMetadata={handleLoadedVideo}
                                onTimeUpdate={handleTimeUpdate}
                            >
                                <source src={data.file_url} type="video/mp4" />
                            </video>
                        </div>
                    )}
                </div>

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
                <button className={cx('btn')}>
                    <span className={cx('icon-wrapper')}>
                        <HeartIcon />
                    </span>
                    <strong className={cx('counter')}>{data.likes_count}</strong>
                </button>
                <button className={cx('btn')}>
                    <span className={cx('icon-wrapper')}>
                        <CommentIcon />
                    </span>
                    <strong className={cx('counter')}>{data.comments_count}</strong>
                </button>
                <button className={cx('btn')}>
                    <span className={cx('icon-wrapper')}>
                        <ShareIcon />
                    </span>
                    <strong className={cx('counter')}>{data.shares_count}</strong>
                </button>
            </div>
        </div>
    )
}

Video.propTypes = {
    data: PropTypes.object.isRequired,
}

export default Video
