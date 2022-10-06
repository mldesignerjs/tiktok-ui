import { useState, useRef, useEffect } from 'react'
import classNames from 'classnames/bind'
import InfiniteScroll from 'react-infinite-scroller'

import { typeVideo } from '~/api/f8Api'
import * as videoService from '~/services/videoService'
import Item from './Item'
import styles from './WrapperVideos.module.scss'
import { AniLoadingIcon } from '~/components/Icons'
import { useCurrentVideoPlayingStore } from '~/redux'

const cx = classNames.bind(styles)

function WrapperVideos() {
    const wrapperRef = useRef()
    const [data, setData] = useState([])
    const [page, setPage] = useState(1)

    const { stateCurrentVideoPlayingStore, dispatch, currentVideoPlayingSlice } = useCurrentVideoPlayingStore()
    const { currentIndex, list } = stateCurrentVideoPlayingStore

    const getVideos = async () => {
        const result = await videoService.videosList(typeVideo.forYou, page)
        setData([...data, ...result])
        setPage(page + 1)
    }

    useEffect(() => {
        dispatch(currentVideoPlayingSlice.actions.getList({ list: data }))
    }, [data])

    useEffect(() => {
        getVideos()
    }, [])

    useEffect(() => {
        const handlePressDownKey = (e) => {
            const yOffset = -100
            if (e.keyCode === 40 || e.keyCode === 32) {
                e.preventDefault()
                if (list.length !== 0) {
                    const videoWrapperElement = document.getElementById(`video-${list[currentIndex + 1].id}`)
                    const y = videoWrapperElement.getBoundingClientRect().top + window.pageYOffset + yOffset
                    window.scrollTo({ behavior: 'smooth', top: y })
                }
            } else if (e.keyCode === 38) {
                e.preventDefault()
                if (list.length !== 0) {
                    if (currentIndex > 0) {
                        const videoWrapperElement = document.getElementById(`video-${list[currentIndex - 1].id}`)
                        const y = videoWrapperElement.getBoundingClientRect().top + window.pageYOffset + yOffset
                        window.scrollTo({ behavior: 'smooth', top: y })
                    }
                }
            }
        }
        document.addEventListener('keydown', handlePressDownKey)
        return () => {
            document.addEventListener('keydown', handlePressDownKey)
        }
    }, [currentIndex, list])

    return (
        <div ref={wrapperRef} className={cx('wrapperVideos')}>
            <InfiniteScroll
                className={cx('wrapperrr')}
                pageStart={0}
                hasMore={true || false}
                loadMore={getVideos}
                loader={
                    <div key={0} className={cx('loading-icon')}>
                        <AniLoadingIcon />
                    </div>
                }
            >
                <div className={cx('wrapper-container')}>
                    {data.map((video, index) => (
                        <Item key={video.id} data={video} indexVideo={index} />
                    ))}
                </div>
            </InfiniteScroll>
        </div>
    )
}

export default WrapperVideos
