import React, { useEffect, useState } from 'react'
import { typeVideo } from '~/api/f8Api'
import * as videoService from '~/services/videoService'
import Item from './Item'

import classNames from 'classnames/bind'
import styles from './WrapperVideos.module.scss'

const cx = classNames.bind(styles)

function WrapperVideos() {
    const [data, setData] = useState([])
    const [page, setPage] = useState(1)

    useEffect(() => {
        const getVideos = async () => {
            const result = await videoService.videosList(typeVideo.forYou, page)
            console.log(result)
            setData(result)
            setPage(1)
        }
        getVideos()
    }, [page])

    return (
        <div className={cx('wrapperVideos')}>
            {data.map((video) => (
                <Item key={video.id} data={video} />
            ))}
        </div>
    )
}

export default WrapperVideos
