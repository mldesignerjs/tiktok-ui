import { useState } from 'react'

import { Link } from 'react-router-dom'

import Tippy from '@tippyjs/react'
import 'tippy.js/dist/tippy.css'
import classNames from 'classnames/bind'

import config from '~/config'
import images from '~/assets/images'
import Button from '~/components/Button'
import Menu from '~/components/Popper/Menu'
import Modal from '~/components/Modal'

import {
    CoinIcon,
    DownKeyIcon,
    FeedbackIcon,
    InboxIcon,
    KeyboardShotcutIcon,
    LanguageIcon,
    LKeyIcon,
    MessageIcon,
    MKeyIcon,
    PlusIcon,
    SeeMoreIcon,
    SettingIcon,
    SignOutIcon,
    UpKeyIcon,
    UploadIcon,
    UserIcon,
} from '~/components/Icons'

import { useUserStore } from '~/redux'
import Avatar from '~/components/Avatar'
import styles from './Header.module.scss'
import Search from '../Search'
import { useLoginModal } from '~/hooks'

const cx = classNames.bind(styles)

const MENU_LIST = [
    {
        icon: <LanguageIcon />,
        title: 'Tiếng Việt',
        children: {
            title: 'Ngôn ngữ',
            data: [
                {
                    type: 'language',
                    code: 'vi',
                    title: 'Tiếng Việt',
                },
                {
                    type: 'language',
                    code: 'en',
                    title: 'English',
                },
            ],
        },
    },
    {
        icon: <FeedbackIcon />,
        title: 'Phản hồi và trợ giúp',
        to: '/feedback',
        type: 'link',
    },
    {
        icon: <KeyboardShotcutIcon />,
        title: 'Phím tắt trên bàn phím',
        type: 'modal',
    },
]

const keyboardShotcuts = [
    {
        title: 'Quay về video trước',
        key: <UpKeyIcon />,
    },
    {
        title: 'Đi đến video tiếp theo',
        key: <DownKeyIcon />,
    },
    {
        title: 'Thích video',
        key: <LKeyIcon />,
    },
    {
        title: 'Tắt tiếng / bật tiếng video',
        key: <MKeyIcon />,
    },
]

function Header() {
    const [showKeyboardShotcutModal, setShowKeyboardShotcutModal] = useState(false)

    const { currentUser } = useUserStore()

    const { loginModal, setShowLoginModal } = useLoginModal()

    const handleMenuChange = (menuItem) => {
        switch (menuItem.type) {
            case 'language':
                console.log('Chon ngon ngu')
                break
            case 'link':
                console.log('Chuyen Link')
                break
            case 'modal':
                setShowKeyboardShotcutModal(true)
                break

            default:
                break
        }
    }

    const userMenu = [
        {
            icon: <UserIcon />,
            title: 'Xem hồ sơ',
            to: '/user',
            type: 'link',
        },
        {
            icon: <CoinIcon />,
            title: 'Nhận xu',
            to: '/coin',
            type: 'link',
        },
        {
            icon: <SettingIcon />,
            title: 'Cài đặt',
            to: '/setting',
            type: 'link',
        },
        ...MENU_LIST,
        {
            icon: <SignOutIcon />,
            title: 'Đăng xuất',
            to: '/logout',
            type: 'link',
            separate: true,
        },
    ]

    return (
        <>
            <Modal
                className={cx('shotcut')}
                onCloseModal={() => setShowKeyboardShotcutModal(false)}
                showModal={showKeyboardShotcutModal}
            >
                <h2 className={cx('shotcut-title')}>Phím tắt trên bàn phím</h2>
                <ul className={cx('shotcut-content')}>
                    {keyboardShotcuts.map((shotcut, index) => (
                        <li className={cx('shotcut-item')} key={index}>
                            <span>{shotcut.title}</span>
                            <span className={cx('icon')}>{shotcut.key}</span>
                        </li>
                    ))}
                </ul>
            </Modal>

            {loginModal}

            <header className={cx('header')}>
                <div className={cx('wrapper', 'container')}>
                    <div className={cx('logo')}>
                        <Link className={cx('logo-link')} to={config.routes.home.path}>
                            <img src={images.logo} alt="Tiktok" />
                        </Link>
                    </div>

                    <Search />
                    <div className={cx('action')}>
                        {currentUser ? (
                            <>
                                <Tippy content={config.routes.upload.title}>
                                    <Link to={config.routes.upload.path} className={cx('icon', 'link-upload')}>
                                        <UploadIcon />
                                    </Link>
                                </Tippy>

                                <Tippy content={config.routes.message.title}>
                                    <Link to={config.routes.message.path} className={cx('icon', 'link-message')}>
                                        <MessageIcon />
                                    </Link>
                                </Tippy>

                                <Tippy content="Hộp thư">
                                    <button type="button" className={cx('icon', 'btn-inbox')}>
                                        <InboxIcon />
                                    </button>
                                </Tippy>
                            </>
                        ) : (
                            <>
                                <Button
                                    outline
                                    to={config.routes.upload.path}
                                    leftIcon={<PlusIcon />}
                                    className={cx('link-upload')}
                                >
                                    Tải lên
                                </Button>

                                <Button primary onClick={() => setShowLoginModal(true)}>
                                    {config.routes.login.title}
                                </Button>
                            </>
                        )}
                        <Menu items={currentUser ? userMenu : MENU_LIST} onChange={handleMenuChange}>
                            {currentUser ? (
                                <Avatar
                                    src="https://scontent.fhan5-8.fna.fbcdn.net/v/t1.6435-9/45829449_1197654987050314_4576170951036633088_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=rpuFoQByeKIAX8NeTGJ&tn=uIUyJFPVSyAsxDy8&_nc_ht=scontent.fhan5-8.fna&oh=00_AT_-ZuunSHh4ya9pHRvnq3GC2vv9hy-kZEy5p-Rk3yOhhw&oe=63212924"
                                    alt="User"
                                />
                            ) : (
                                <div className={cx('see-more-icon')}>
                                    <SeeMoreIcon />
                                </div>
                            )}
                        </Menu>
                    </div>
                </div>
            </header>
        </>
    )
}

export default Header
