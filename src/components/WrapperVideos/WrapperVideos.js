import React, { useState } from 'react'
import classNames from 'classnames/bind'
import InfiniteScroll from 'react-infinite-scroller'

import { typeVideo } from '~/api/f8Api'
import * as videoService from '~/services/videoService'
import Item from './Item'
import styles from './WrapperVideos.module.scss'
import { useEffect } from 'react'
import { AniLoadingIcon } from '~/components/Icons'

const cx = classNames.bind(styles)

function WrapperVideos() {
    const [data, setData] = useState([])
    const [page, setPage] = useState(1)

    const getVideos = async () => {
        const result = await videoService.videosList(typeVideo.forYou, page)
        setData([...data, ...result])
        setPage(page + 1)
    }

    useEffect(() => {
        getVideos()
    }, [])

    console.log(data)

    return (
        <div className={cx('wrapperVideos')}>
            {/* <div key={0} className={cx('loading-icon')}>
                        <AniLoadingIcon />
                    </div> */}
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
                    {data.map((video) => (
                        <Item key={video.id} data={video} />
                    ))}
                </div>
            </InfiniteScroll>
        </div>
    )
}

export default WrapperVideos
