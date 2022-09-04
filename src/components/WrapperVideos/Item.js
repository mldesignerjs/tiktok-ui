import PropTypes from 'prop-types'
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

import Linkify from 'linkify-react'
import 'linkify-plugin-hashtag'

import classNames from 'classnames/bind'

import Avatar from '~/components/Avatar'
import { MusicIcon } from '~/components/Icons'
import Button from '~/components/Button'
import styles from './WrapperVideos.module.scss'
import Video from './Video'
import { useElementOnScreen } from '~/hooks'

const cx = classNames.bind(styles)

function Item({ data }) {
    const wrapperRef = useRef(null)

    const [wrapperElement, setWrapperElement] = useState(null)

    const optionsHashTag = {
        formatHref: {
            hashtag: (href) => '/hashtag/' + href.substr(1),
        },
    }

    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.9,
    }

    const isVisibile = useElementOnScreen(options, wrapperRef)

    useEffect(() => {
        setWrapperElement(wrapperRef.current)
        return () => {}
    }, [])

    useEffect(() => {
        if (wrapperElement)
            if (isVisibile) {
                wrapperElement.scrollIntoView({ behavior: 'smooth' })
            }
    }, [isVisibile])

    return (
        <div className={cx('wrapper')} ref={wrapperRef}>
            <Link to={`/@${data.user.nickname}`} className={cx('avatar')}>
                <Avatar src={data.user.avatar} alt={data.user.nickname} size={56} />
            </Link>
            <div className={cx('container')}>
                <header className={cx('header')}>
                    <Button outline small className={cx('btn-follow')}>
                        Follow
                    </Button>
                    <div className={cx('info')}>
                        <Link to={`/@${data.user.nickname}`} className={cx('user')}>
                            <span className={cx('nickname')}>{data.user.nickname}</span>
                            <span className={cx('fullname')}>{`${data.user.first_name} ${data.user.last_name}`}</span>
                            {/* .<span className={cx('time')}>{data.published_at}</span> */}
                        </Link>
                        <div className={cx('content')}>
                            <Linkify options={optionsHashTag} tagName="span">
                                {data.description}
                            </Linkify>
                        </div>
                        <h4 className={cx('video-music')}>
                            <Link to="/music/nhac-nen">
                                <MusicIcon /> Nhạc nền - {data.music}
                            </Link>
                        </h4>
                    </div>
                </header>
                <Video data={data} isVisibile={isVisibile} />
            </div>
        </div>
    )
}

Item.propTypes = {
    data: PropTypes.object.isRequired,
}

export default Item
