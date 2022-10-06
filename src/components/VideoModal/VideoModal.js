import { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import classNames from 'classnames/bind'

import styles from './VideoModal.module.scss'
import { changeVolume, getTimeCurrent, getTimeDuration } from '~/functions'
import { useCurrentVideoPlayingStore, useVolumeStore } from '~/redux'
import { useHandleMuted, useTimeAgo } from '~/hooks'
import {
    ChevronLeftIcon,
    CommentIcon,
    HeartIcon,
    MusicIcon,
    ShareIcon,
    TickAccountIcon,
    TiktokIcon,
} from '~/components/Icons'
import RangeVolumeSlider from '~/components/RangeVolumeSlider'
import RangeTrackSlider from '~/components/RangeTrackSlider'
import TimeDuration from '~/components/TimeDuration'
import BtnFollow from '~/components/BtnFollow'
import BtnPlay from '~/components/BtnPlay'
import Avatar from '~/components/Avatar'
import HashTag from '~/components/HashTag'

const cx = classNames.bind(styles)

function VideoModal() {
    const { stateCurrentVideoPlayingStore, dispatch, currentVideoPlayingSlice } = useCurrentVideoPlayingStore()
    const { currentIndex, list, length } = stateCurrentVideoPlayingStore
    const { stateVolumeStore, volumeVideoSlice } = useVolumeStore()
    const { volume, muted } = stateVolumeStore
    const [data, setData] = useState(list[currentIndex])
    const timeAgo = useTimeAgo(data.published_at)

    const { handleMuted } = useHandleMuted()

    const videoRef = useRef()
    const [videoElement, setVideoElement] = useState(null)
    const [isPlaying, setIsPlaying] = useState(true)
    const [percentDurationSlider, setPercentDurationSlider] = useState(0)
    const [timeDuration, setTimeDuration] = useState(data.meta.playtime_strings)
    const [currentTime, setCurrentTime] = useState('00:00')

    const handleValueTrackChange = (e) => {
        const percent = parseInt(e.target.value)
        videoElement.currentTime = (percent * videoElement.duration) / 100
        setPercentDurationSlider(e.target.value)
    }

    const handleLoadedVideo = () => {
        getTimeDuration(videoElement, setTimeDuration)
    }

    const handleTimeUpdate = () => {
        getTimeCurrent(videoElement, setCurrentTime, setPercentDurationSlider)
    }

    const handleValueVolumeChange = (e) => {
        const currentVolume = parseInt(e.target.value)
        changeVolume(currentVolume, dispatch, volumeVideoSlice)
    }

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

    const handlePrevVideo = () => {
        dispatch(currentVideoPlayingSlice.actions.prevVideo())
        if (currentIndex !== 0) {
            const idWrapper = `video-${list[currentIndex - 1].id}`
            const wrapperElement = document.getElementById(idWrapper)
            wrapperElement.scrollIntoView()
        }
    }

    const handleNextVideo = () => {
        dispatch(currentVideoPlayingSlice.actions.nextVideo())
        const idWrapper = `video-${list[currentIndex + 1].id}`
        const wrapperElement = document.getElementById(idWrapper)
        wrapperElement.scrollIntoView()
    }

    useEffect(() => {
        setData(list[currentIndex])
    }, [currentIndex])

    useEffect(() => {
        setVideoElement(videoRef.current)
    }, [videoRef])

    useEffect(() => {
        if (videoElement) {
            videoElement.volume = volume / 100
            videoElement.muted = muted
        }
    }, [volume, muted, videoElement])

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.keyCode === 38) {
                handlePrevVideo()
            }
            if (e.keyCode === 40) {
                handleNextVideo()
            }
        }
        document.addEventListener('keydown', handleKeyDown)

        return () => {
            document.removeEventListener('keydown', handleKeyDown)
        }
    }, [currentIndex])

    return (
        <>
            <div className={cx('wrapper')}>
                <div className={cx('video-container')}>
                    <div className={cx('video-wrapper')} onClick={togglePlay}>
                        <div className={cx('blur-bg')} style={{ backgroundImage: `url(${data.thumb_url})` }}></div>
                        <div className={cx('basic-player')}>
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
                    </div>
                    {!isPlaying && (
                        <BtnPlay
                            videoElement={videoRef.current}
                            isPlaying={isPlaying}
                            setIsPlaying={setIsPlaying}
                            size="50px"
                            className={cx('btn-play')}
                        />
                    )}
                    <div className={cx('volume')}>
                        <RangeVolumeSlider onValueChange={handleValueVolumeChange} onMuted={handleMuted} />
                    </div>
                    <div className={cx('duration')}>
                        <RangeTrackSlider
                            height={4}
                            percent={percentDurationSlider}
                            onValueChange={handleValueTrackChange}
                        />
                        <TimeDuration currentTime={currentTime} timeDuration={timeDuration} className={cx('time')} />
                    </div>
                    <TiktokIcon className={cx('tiktok-logo')} />

                    {currentIndex > 0 && (
                        <button className={cx('btn-transfer', 'btn-prev')} onClick={handlePrevVideo}>
                            <ChevronLeftIcon width="26px" height="26px" />
                        </button>
                    )}
                    {currentIndex < length - 1 && (
                        <button className={cx('btn-transfer', 'btn-next')} onClick={handleNextVideo}>
                            <ChevronLeftIcon width="26px" height="26px" />
                        </button>
                    )}
                </div>
                <div className={cx('content-container')}>
                    <div className={cx('wrapper-info')}>
                        <Avatar src={data.user.avatar} size={40} alt={data.user.nickname} />
                        <div className={cx('info-user')}>
                            <h4 className={cx('nickname')}>
                                <span>{data.user.nickname}</span>
                                {data.user.tick && <TickAccountIcon />}
                            </h4>
                            <p className={cx('name')}>
                                <span>{`${data.user.first_name} ${data.user.last_name}`}</span>
                                <span style={{ fontSize: '1.8rem' }}>&#8729;</span>
                                {timeAgo}
                            </p>
                        </div>
                        <div className={cx('btn-follow')}>
                            <BtnFollow data={data.user} className={cx('btn')} />
                        </div>
                    </div>
                    <div className={cx('main')}>
                        <div className={cx('desc')}>
                            <HashTag>{data.description}</HashTag>
                        </div>
                        <h4 className={cx('video-music')}>
                            <Link to="/music/nhac-nen">
                                <MusicIcon /> Nhạc nền - {data.music}
                            </Link>
                        </h4>
                        <div className={cx('action-container')}>
                            <button className={cx('btn')}>
                                <span className={cx('icon-wrapper')}>
                                    <HeartIcon width="2rem" height="2rem" />
                                </span>
                                <strong className={cx('counter')}>{data.likes_count}</strong>
                            </button>
                            <button className={cx('btn')}>
                                <span className={cx('icon-wrapper')}>
                                    <CommentIcon width="2rem" height="2rem" />
                                </span>
                                <strong className={cx('counter')}>{data.comments_count}</strong>
                            </button>
                            <button className={cx('btn')}>
                                <span className={cx('icon-wrapper')}>
                                    <ShareIcon width="2rem" height="2rem" />
                                </span>
                                <strong className={cx('counter')}>{data.shares_count}</strong>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default VideoModal
