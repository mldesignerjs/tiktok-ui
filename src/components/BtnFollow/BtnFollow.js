import PropTypes from 'prop-types'
import classNames from 'classnames/bind'

import styles from './BtnFollow.module.scss'
import { useUserStore } from '~/redux'
import { useLoginModal } from '~/hooks'
import Button from '~/components/Button'

const cx = classNames.bind(styles)

function BtnFollow({ data, className }) {
    const { currentUser } = useUserStore()
    const { loginModal, setShowLoginModal } = useLoginModal()

    const handleFollow = (nickname) => {
        console.log(`Đã follow ${nickname}`)
    }

    return (
        <>
            {loginModal}
            {!currentUser ? (
                <Button
                    outline
                    className={cx('not-followed', { [className]: className })}
                    onClick={() => setShowLoginModal(true)}
                >
                    Follow
                </Button>
            ) : data.is_followed ? (
                <Button outline className={cx('followed', { [className]: className })}>
                    Đang Follow
                </Button>
            ) : (
                <Button
                    outline
                    className={cx('not-followed', { [className]: className })}
                    onClick={() => handleFollow(data.nickname)}
                >
                    Follow
                </Button>
            )}
        </>
    )
}

BtnFollow.propTypes = {
    data: PropTypes.object.isRequired,
    className: PropTypes.string,
}

export default BtnFollow
