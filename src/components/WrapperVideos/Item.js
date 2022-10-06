import PropTypes from 'prop-types'
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import classNames from 'classnames/bind'

import styles from './WrapperVideos.module.scss'
import { useElementOnScreen, useTimeAgo } from '~/hooks'
import Avatar from '~/components/Avatar'
import HashTag from '~/components/HashTag'
import { MusicIcon } from '~/components/Icons'
import BtnFollow from '~/components/BtnFollow'
import Video from './Video'
import { useCurrentVideoPlayingStore } from '~/redux'

const cx = classNames.bind(styles)

function Item({ data, indexVideo }) {
    const wrapperRef = useRef(null)
    const timeAgo = useTimeAgo(data.published_at)

    const { dispatch, currentVideoPlayingSlice } = useCurrentVideoPlayingStore()

    const [wrapperElement, setWrapperElement] = useState(null)

    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.9,
    }

    const isVisibile = useElementOnScreen(options, wrapperRef)

    useEffect(() => {
        setWrapperElement(wrapperRef.current)
    }, [])

    useEffect(() => {
        if (wrapperElement)
            if (isVisibile) {
                dispatch(currentVideoPlayingSlice.actions.setIndex({ index: indexVideo }))
            }
    }, [isVisibile, wrapperElement])

    return (
        <div className={cx('wrapper')} ref={wrapperRef} id={`video-${data.id}`}>
            <Link to={`/@${data.user.nickname}`} className={cx('avatar')}>
                <Avatar src={data.user.avatar} alt={data.user.nickname} size={56} />
            </Link>
            <div className={cx('container')}>
                <header className={cx('header')}>
                    <div className={cx('btn-follow')}>
                        <BtnFollow data={data.user} className={cx('btn')} />
                    </div>
                    <div className={cx('info')}>
                        <Link to={`/@${data.user.nickname}`} className={cx('user')}>
                            <span className={cx('nickname')}>{data.user.nickname}</span>
                            <span className={cx('fullname')}>{`${data.user.first_name} ${data.user.last_name}`}</span>
                            &#8729;
                            <span className={cx('time')}>{timeAgo}</span>
                        </Link>
                        <div className={cx('content')}>
                            <HashTag>{data.description}</HashTag>
                        </div>
                        <h4 className={cx('video-music')}>
                            <Link to={`/music/${data.music}`}>
                                <MusicIcon /> Nhạc nền - {data.music}
                            </Link>
                        </h4>
                    </div>
                </header>
                <Video data={data} isVisibile={isVisibile} indexVideo={indexVideo} />
            </div>
        </div>
    )
}

Item.propTypes = {
    data: PropTypes.object.isRequired,
}

export default Item
