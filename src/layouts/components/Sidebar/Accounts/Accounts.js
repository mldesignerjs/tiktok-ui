import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import classNames from 'classnames/bind'

import styles from './Accounts.module.scss'
import AccountItem from './AccountItem'
import SuggestedAccountItem from './SuggestedAccountItem'
import * as usersService from '~/services/usersService'

const cx = classNames.bind(styles)

function Accounts({ label, suggested = false }) {
    let Item = null

    suggested ? (Item = SuggestedAccountItem) : (Item = AccountItem)

    const [data, setData] = useState([])
    const [allSuggestedUsers, setAllSuggestedUsers] = useState([])
    const [suggestedUsers, setSuggestedUsers] = useState([])
    const [page, setPage] = useState(1)
    const [perPage, setPerPage] = useState(15)
    const [seeMore, setSeeMore] = useState(false)

    useEffect(() => {
        const getAcounts = async () => {
            const result = suggested ? await usersService.getSuggested(page, perPage) : []
            setAllSuggestedUsers(result)
            const lessResult = result.slice(0, 5)
            setSuggestedUsers(lessResult)
            setData(lessResult)
        }

        getAcounts()
    }, [page, perPage, suggested])

    const handeLoadMore = async () => {
        seeMore ? setData(suggestedUsers) : setData(allSuggestedUsers)
        setSeeMore(!seeMore)
    }
    // console.log(allSuggestedUsers)
    return (
        <div className={cx('nav-user-container')}>
            <p className={cx('title')}>{label}</p>
            {data.map((item) => (
                <Item key={item.id} data={item} />
            ))}
            <p className={cx('view-more')} onClick={handeLoadMore}>
                {suggested ? (seeMore ? 'Ẩn bớt' : 'Xem tất cả') : seeMore ? 'Ẩn bớt' : 'Xem thêm'}
            </p>
        </div>
    )
}

Accounts.propTypes = {
    label: PropTypes.string.isRequired,
    suggested: PropTypes.bool,
}

export default Accounts
