import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import classNames from 'classnames/bind'

import styles from './SearchedAccountItem.module.scss'
import { TickAccountIcon } from '~/components/Icons'
import Avatar from '~/components/Avatar'

const cx = classNames.bind(styles)
function SearchedAccountItem({ data }) {
    return (
        <Link to={`/@${data.nickname}`} className={cx('wrapper')}>
            <Avatar size={40} src={data.avatar} alt={data.full_name} />
            <div className={cx('info')}>
                <h4 className={cx('username')}>
                    <span>{data.nickname}</span>
                    {data.tick && <TickAccountIcon />}
                </h4>
                <p className={cx('name')}>{data.full_name}</p>
            </div>
        </Link>
    )
}

SearchedAccountItem.propTypes = {
    data: PropTypes.object.isRequired,
}

export default SearchedAccountItem
