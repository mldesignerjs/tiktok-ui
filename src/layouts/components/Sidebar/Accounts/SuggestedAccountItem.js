import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import classNames from 'classnames/bind'
import Tippy from '@tippyjs/react/headless'

import Button from '~/components/Button'
import { TickAccountIcon } from '~/components/Icons'

import AccountItem from './AccountItem'
import styles from './Accounts.module.scss'
import Avatar from '~/components/Avatar'

const cx = classNames.bind(styles)

function SuggestedAccountItem({ data }) {
    const boxRender = (attrs) => (
        <div className={cx('wrapper-box')} tabIndex="-1" {...attrs}>
            <div className={cx('box-header')}>
                <Link to={`/@${data.nickname}`}>
                    <Avatar src={data.avatar} alt={data.nickname} size={44} />
                </Link>
                <Button primary className={cx('btn-follow')}>
                    Follow
                </Button>
            </div>
            <div className={cx('info')}>
                <Link to={`/@${data.nickname}`} className={cx('username')}>
                    <span>{data.nickname}</span>
                    {data.tick && <TickAccountIcon />}
                </Link>
                <Link to={`/@${data.nickname}`} className={cx('name')}>
                    {`${data.first_name} ${data.last_name}`}
                </Link>
                <p className={cx('more')}>
                    <strong>{data.followers_count}</strong>
                    <span>Follower</span>
                    <strong>{data.likes_count}</strong>
                    <span>Thích</span>
                </p>
            </div>
        </div>
    )
    return (
        <div>
            <Tippy
                placement="bottom"
                interactive
                offset={[-20, 0]}
                hideOnClick={false}
                delay={[200, 200]}
                render={boxRender}
                // onHide={handleResetToFirstPage}
            >
                <AccountItem data={data} />
            </Tippy>
        </div>
    )
}

SuggestedAccountItem.propTypes = {
    data: PropTypes.object.isRequired,
}

export default SuggestedAccountItem
