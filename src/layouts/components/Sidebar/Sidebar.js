import { Link } from 'react-router-dom'
import classNames from 'classnames/bind'

import SimpleBar from 'simplebar-react'
import 'simplebar/dist/simplebar.min.css'

import {
    FollowedUsersIconFill,
    FollowedUsersIconOutLine,
    HasktagIcon,
    HomeIconFill,
    HomeIconOutLine,
    LiveStreamIconFill,
    LiveStreamIconOutLine,
    MusicIcon,
} from '~/components/Icons'

import config from '~/config'
import Button from '~/components/Button'
import styles from './Sidebar.module.scss'
import Menu from './Menu'
import MenuItem from './Menu/MenuItem'
import Accounts from './Accounts'

const cx = classNames.bind(styles)

const discover = [
    {
        text: 'suthatla',
        hasktag: true,
        path: 'suthatla',
    },
    {
        text: 'mackedoi',
        hasktag: true,
        path: 'mackedoi',
    },
    {
        text: 'sansangthaydoi',
        path: 'sansangthaydoi',
        hasktag: true,
    },
    {
        text: 'Yêu Đơn Phương Là Gì (MEE Remix) - Mee Media & h0n',
        hasktag: false,
        path: 'yeu-don-phuong-la-gi',
    },
    {
        text: 'Về Nghe Mẹ Ru - NSND Bach Tuyet & Hứa Kim Tuyền & 14 Casper & Hoàng Dũng',
        path: 've-nghe-me-ru',
        hasktag: false,
    },
    {
        text: 'Thiên Thần Tình Yêu - RICKY STAR',
        path: 'thien-than-tinh-yeu',
        hasktag: false,
    },
    {
        text: '7749hieuung',
        path: '7749hieuung',
        hasktag: true,
    },
    {
        text: 'genzlife',
        path: 'genzlife',
        hasktag: true,
    },
    {
        text: 'Tình Đã Đầy Một Tim - Huyền Tâm Môn',
        path: 'tinh-da-day-mot-tim',
        hasktag: false,
    },
    {
        text: 'Thằng Hầu (Thái Hoàng Remix) [Short Version] - Dunghoangpham',
        path: 'thang-hau',
        hasktag: false,
    },
]

const listLink = [
    [
        { title: 'About', path: '/about' },
        { title: 'TikTok Browse', path: '/about' },
        { title: 'Newsroom', path: '/about' },
        { title: 'Contact', path: '/about' },
        { title: 'Careers', path: '/about' },
        { title: 'ByteDance', path: '/about' },
    ],
    [
        { title: 'TikTok for GoodAdvertise', path: '/about' },
        { title: 'Developers', path: '/about' },
        { title: 'Transparency', path: '/about' },
        { title: 'TikTok Rewards', path: '/about' },
    ],
    [
        { title: 'Help', path: '/about' },
        { title: 'Safety', path: '/about' },
        { title: 'Terms', path: '/about' },
        { title: 'Privacy', path: '/about' },
        { title: 'Creator Portal', path: '/about' },
        { title: 'Community Guidelines', path: '/about' },
    ],
]

function Sidebar() {
    const currentUser = true

    return (
        <SimpleBar className={cx('simple')}>
            <section className={cx('wrapper')}>
                <div>
                    <Menu>
                        <MenuItem
                            to={config.routes.home.path}
                            icon={<HomeIconOutLine />}
                            activeIcon={<HomeIconFill />}
                            title={config.routes.home.title}
                        />
                        <MenuItem
                            to={config.routes.following.path}
                            icon={<FollowedUsersIconOutLine />}
                            activeIcon={<FollowedUsersIconFill />}
                            title={config.routes.following.title}
                        />
                        <MenuItem
                            to={config.routes.live.path}
                            icon={<LiveStreamIconOutLine />}
                            activeIcon={<LiveStreamIconFill />}
                            title={config.routes.live.title}
                        />
                    </Menu>
                </div>
                {!currentUser && (
                    <div className={cx('nav-user-container')}>
                        <p className="nav-login-tip">Đăng nhập để follow các tác giả, thích video và xem bình luận.</p>
                        <Button outline w100 to={config.routes.login.path} className={cx('btn-login')}>
                            {config.routes.login.title}
                        </Button>
                    </div>
                )}

                <Accounts label="Tài khoản được đề xuất" suggested={true} />

                {currentUser && <Accounts label="Các tài khoản đang follow" />}

                <div className={cx('nav-user-container')}>
                    <p className={cx('title')}>Khám phá</p>
                    <ul className={cx('discover')}>
                        {discover.map((item, index) => (
                            <li key={index} className={cx('item')}>
                                <Link to={`/${item.hasktag ? 'hasktag' : 'music'}/${item.path}`}>
                                    {item.hasktag ? (
                                        <HasktagIcon className={cx('icon')} />
                                    ) : (
                                        <MusicIcon className={cx('icon')} />
                                    )}
                                    <span>{item.text}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className={cx('nav-user-container')}>
                    <div className={cx('alllinks')}>
                        {listLink.map((list, index) => (
                            <div key={index} className={cx('links')}>
                                {list.map((item, index2) => (
                                    <Link key={index2} to={item.path} className={cx('link')}>
                                        {item.title}
                                    </Link>
                                ))}
                            </div>
                        ))}
                    </div>
                    <div className={cx('copyright')}>
                        <p>© 2022 TikTok</p>
                    </div>
                </div>
            </section>
        </SimpleBar>
    )
}

export default Sidebar
