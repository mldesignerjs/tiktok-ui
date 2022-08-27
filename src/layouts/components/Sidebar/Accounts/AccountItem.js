import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import classNames from 'classnames/bind'

import styles from './Accounts.module.scss'
import { forwardRef } from 'react'
import { TickAccountIcon } from '~/components/Icons'
import Avatar from '~/components/Avatar'

const cx = classNames.bind(styles)

const AccountItem = forwardRef(({ data }, ref) => {
    return (
        <Link ref={ref} to={`/@${data.nickname}`} className={cx('wrapper')}>
            <Avatar src={data.avatar} alt={data.nickname} />
            {/* {data.streaming ? (
            ) : (
                <div className={cx('avatar-ring')}>
                    <Avatar src={data.avatar} alt={data.full_name} size={26} />
                </div>
            )} */}
            <div className={cx('info')}>
                <h4 className={cx('username')}>
                    <span>{data.nickname}</span>
                    {data.tick && <TickAccountIcon />}
                </h4>
                <p className={cx('name')}>{`${data.first_name} ${data.last_name}`}</p>
            </div>
        </Link>
    )
})

AccountItem.propTypes = {
    data: PropTypes.object.isRequired,
}

export default AccountItem
