import { useRef, useState, useEffect, useCallback } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames/bind'

import styles from './Video.module.scss'
import { changeVolume, getTimeCurrent, getTimeDuration } from '~/functions'
import { useHandleMuted, useVideoModal } from '~/hooks'
import { useCurrentVideoPlayingStore, useVolumeStore } from '~/redux'
import { CommentIcon, HeartIcon, ShareIcon } from '~/components/Icons'
import RangeVolumeSlider from '~/components/RangeVolumeSlider'
import RangeTrackSlider from '~/components/RangeTrackSlider'
import TimeDuration from '~/components/TimeDuration'
import BtnPlay from '~/components/BtnPlay'
import Image from '~/components/Image'

const cx = classNames.bind(styles)

function Video({ data, isVisibile, indexVideo }) {
    const { stateVolumeStore, dispatch, volumeVideoSlice } = useVolumeStore()
    const { stateCurrentVideoPlayingStore, currentVideoPlayingSlice } = useCurrentVideoPlayingStore()
    const { isPlayingModal } = stateCurrentVideoPlayingStore

    const { volume, muted } = stateVolumeStore

    const { handleMuted } = useHandleMuted()

    const { videoModal, setShowVideoModal } = useVideoModal()

    const wrapperRef = useRef(null)

    const videoRef = useRef(null)

    const sizeVideo = styles.sizeVideo

    const [classSize, setClassSize] = useState(null)

    const [wrapperElement, setWrapperElement] = useState(null)
    const [videoElement, setVideoElement] = useState(null)

    const [percentDurationSlider, setPercentDurationSlider] = useState(0)

    const [timeDuration, setTimeDuration] = useState(data.meta.playtime_strings)
    const [currentTime, setCurrentTime] = useState('00:00')

    const [isPlaying, setIsPlaying] = useState(true)

    const [ratioVideo, setRatioVideo] = useState()

    const play = useCallback(() => {
        if (videoElement) {
            videoElement.play()
        }
        setIsPlaying(true)
        return null
    }, [videoElement])

    const pause = useCallback(() => {
        if (videoElement) videoElement.pause()
        setIsPlaying(false)
        return null
    }, [videoElement])

    const handleValueTrackChange = (e) => {
        const percent = parseInt(e.target.value)
        videoElement.currentTime = (percent * videoElement.duration) / 100
        setPercentDurationSlider(e.target.value)
    }

    const handleLoadedVideo = useCallback(() => {
        getTimeDuration(videoElement, setTimeDuration)
    }, [videoElement])

    const handleTimeUpdate = useCallback(() => {
        getTimeCurrent(videoElement, setCurrentTime, setPercentDurationSlider)
    }, [videoElement])

    const handleValueVolumeChange = (e) => {
        const currentVolume = parseInt(e.target.value)
        changeVolume(currentVolume, dispatch, volumeVideoSlice)
    }

    const handleShowModal = () => {
        setShowVideoModal(true)
        dispatch(currentVideoPlayingSlice.actions.playInModal({ index: indexVideo }))
    }

    const classes = cx('wrapper', {
        [classSize]: classSize,
    })

    useEffect(() => {
        if (videoElement) {
            videoElement.volume = volume / 100
            videoElement.muted = muted
        }
    }, [volume, muted, videoElement])

    useEffect(() => {
        const ratio = data.meta.video.resolution_x / data.meta.video.resolution_y
        setRatioVideo(ratio)
        setClassSize(ratio < 1 ? 'wrapper-height' : 'wrapper-width')
        setWrapperElement(wrapperRef.current)
        setVideoElement(videoRef.current)
    }, [data, isVisibile, isPlayingModal])

    useEffect(() => {
        const handleFocusWindow = () => {
            play()
        }
        const handleBlurWindow = () => {
            pause()
        }
        window.addEventListener('focus', handleFocusWindow)
        window.addEventListener('blur', handleBlurWindow)
        return () => {
            window.removeEventListener('focus', handleFocusWindow)
            window.removeEventListener('blur', handleBlurWindow)
        }
    }, [play, pause])

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
    }, [isVisibile, wrapperElement, videoElement])

    return (
        <>
            {videoModal}
            <div className={classes} ref={wrapperRef}>
                <div
                    className={cx('video-container')}
                    style={{
                        width: ratioVideo < 1 ? `calc(${sizeVideo}*${ratioVideo})` : '',
                        height: ratioVideo > 1 ? `calc(${sizeVideo}/${ratioVideo})` : '',
                    }}
                >
                    <div className={cx('container')} onClick={handleShowModal}>
                        <Image src={data.thumb_url} />
                        {!isPlayingModal && isVisibile && (
                            <div className={cx('player')}>
                                <video
                                    ref={videoRef}
                                    playsInline={true}
                                    autoPlay
                                    muted={muted}
                                    loop
                                    onLoadedMetadata={handleLoadedVideo}
                                    onTimeUpdate={handleTimeUpdate}
                                    src={data.file_url}
                                />
                            </div>
                        )}
                    </div>
                    <BtnPlay
                        videoElement={videoRef.current}
                        isPlaying={isPlaying}
                        setIsPlaying={setIsPlaying}
                        size="20px"
                        className={cx('control', 'btn-play')}
                    />
                    <div className={cx('control', 'volume')}>
                        <RangeVolumeSlider onValueChange={handleValueVolumeChange} onMuted={handleMuted} />
                    </div>
                    {isVisibile && (
                        <div className={cx('control', 'duration')}>
                            <RangeTrackSlider percent={percentDurationSlider} onValueChange={handleValueTrackChange} />
                            <TimeDuration
                                currentTime={currentTime}
                                timeDuration={timeDuration}
                                className={cx('time')}
                            />
                        </div>
                    )}
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
        </>
    )
}

Video.propTypes = {
    data: PropTypes.object.isRequired,
}

export default Video
