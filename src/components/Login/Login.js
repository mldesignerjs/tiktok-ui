import classNames from 'classnames/bind'
import { useState } from 'react'
import {
    AppleIcon,
    FacebookIcon,
    GoogleIcon,
    InstagramIcon,
    KaokaoTalkIcon,
    LineIcon,
    QRIcon,
    TwitterIcon,
    UserIcon,
} from '../Icons'

import styles from './Login.module.scss'

const cx = classNames.bind(styles)

const loginList = {
    title: 'Đăng nhập vào TikTok',
    textFooter: 'Bạn không có tài khoản',
    textChange: 'Đăng ký',
    chanel: [
        {
            icon: <QRIcon />,
            label: 'Sử dụng mã QR',
        },
        {
            icon: <UserIcon />,
            label: 'Số điện thoại / Email / Tiktok ID',
        },
        {
            icon: <FacebookIcon />,
            label: 'Tiếp tục với Facebook',
        },
        {
            icon: <GoogleIcon />,
            label: 'Tiếp tục với  Google',
        },
        {
            icon: <TwitterIcon />,
            label: 'Tiếp tục với Twitter',
        },
        {
            icon: <LineIcon />,
            label: 'Tiếp tục với LINE',
        },
        {
            icon: <KaokaoTalkIcon />,
            label: 'Tiếp tục với KaokaoTalk',
        },
        {
            icon: <AppleIcon />,
            label: 'Tiếp tục với Apple',
        },
        {
            icon: <InstagramIcon />,
            label: 'Tiếp tục với Instagram',
        },
    ],
}

const signinList = {
    title: 'Đăng ký TikTok',
    textFooter: 'Bạn đã có tài khoản',
    textChange: 'Đăng nhập',
    chanel: [
        {
            icon: <UserIcon />,
            label: 'Số điện thoại / Email / Tiktok ID',
        },
        {
            icon: <FacebookIcon />,
            label: 'Tiếp tục với Facebook',
        },
        {
            icon: <GoogleIcon />,
            label: 'Tiếp tục với  Google',
        },
        {
            icon: <TwitterIcon />,
            label: 'Tiếp tục với Twitter',
        },
        {
            icon: <LineIcon />,
            label: 'Tiếp tục với LINE',
        },
        {
            icon: <KaokaoTalkIcon />,
            label: 'Tiếp tục với KaokaoTalk',
        },
    ],
}

function Login() {
    const [hasAccount, setHasAccount] = useState(true)

    return (
        <div className={cx('wrapper')}>
            <div className={cx('scroll')}>
                <div className={cx('container')}>
                    <h2 className={cx('header')}>{hasAccount ? loginList.title : signinList.title}</h2>
                    <div className={cx('list')}>
                        <div className={cx('item')}>
                            {(hasAccount ? loginList : signinList).chanel.map((item, index) => (
                                <div className={cx('btn-chanel')} key={index}>
                                    <span className={cx('icon')}>{item.icon}</span>
                                    <strong>{item.label}</strong>
                                </div>
                            ))}
                        </div>
                    </div>
                    {!hasAccount && (
                        <div className={cx('policy-confirm')}>
                            <p>
                                Bằng cách tiếp tục, bạn đồng ý với <a href="/">Điều khoản Sử dụng</a> của TikTok và xác
                                nhận rằng bạn đã đọc hiểu <a href="/">Chính sách Quyền riêng tư</a> của TikTok.
                            </p>
                        </div>
                    )}
                </div>
            </div>
            <div className={cx('footer')}>
                <p>
                    {hasAccount ? loginList.textFooter : signinList.textFooter}{' '}
                    <span onClick={() => setHasAccount(!hasAccount)}>
                        {hasAccount ? loginList.textChange : signinList.textChange}
                    </span>
                </p>
            </div>
        </div>
    )
}

export default Login
