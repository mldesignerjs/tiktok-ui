import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import classNames from 'classnames/bind'

import Avatar from '../Avatar'
import { MusicIcon } from '../Icons'
import Button from '../Button'
import styles from './WrapperVideos.module.scss'
import Video from './Video'

const cx = classNames.bind(styles)

function Item({ data }) {
    return (
        <div className={cx('wrapper')}>
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
                            <span className={cx('text')}>{data.description}</span>
                            {/* <Link to="/hasktag/thaygiaongaohoa">
                                <strong>#thaygiaongaohoa</strong>
                            </Link>
                            <Link to="/hasktag/learnOnTikTok">
                                <strong>#LearnOnTikTok</strong>
                            </Link> */}
                        </div>
                        <h4 className={cx('video-music')}>
                            <Link to="/music/nhac-nen">
                                <MusicIcon /> Nhạc nền - {data.music}
                            </Link>
                        </h4>
                    </div>
                </header>
                <Video data={data} />
            </div>
        </div>
    )
}

Item.propTypes = {
    data: PropTypes.object.isRequired,
}

export default Item
