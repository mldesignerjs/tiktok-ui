import { useEffect, useRef, useState } from 'react'

import TippyHeadless from '@tippyjs/react/headless'
import 'tippy.js/dist/tippy.css'

import { Popper as WrapperPopper } from '~/components/Popper'
import SearchedAccountItem from '~/components/SearchedAccountItem'

import { DeleteIcon, LoadingIcon, SearchIcon } from '~/components/Icons'
import * as searchService from '~/services/searchService'

import classNames from 'classnames/bind'
import styles from './Search.module.scss'
import { useDebounce } from '~/hooks'
const cx = classNames.bind(styles)

function Search() {
    const inputSearchRef = useRef()
    const [inputSearchText, setInputSearchText] = useState('')

    const [searchResults, setSearchResults] = useState([])
    const [showResults, setShowResults] = useState(true)

    const [showLoadingIcon, setShowLoadingIcon] = useState(false)

    const debounced = useDebounce(inputSearchText, 600)

    useEffect(() => {
        if (!debounced.trim()) {
            setSearchResults([])
            return
        }

        const fetchApi = async () => {
            setShowLoadingIcon(true)
            const result = await searchService.search(debounced)
            setSearchResults(result)
            setShowLoadingIcon(false)
        }

        fetchApi()

        // fetch(
        //     `https://tiktok.fullstack.edu.vn/api/users/search?q=${encodeURIComponent(
        //         debounced
        //     )}&type=less`
        // )
        //     .then((result) => {
        //         return result.json()
        //     })
        //     .then((result) => {
        //         setSearchResults(result.data)
        //         setShowLoadingIcon(false)
        //     })
        //     .catch(() => {
        //         setShowLoadingIcon(false)
        //     })
    }, [debounced])

    const handleClearSearchText = () => {
        setInputSearchText('')
        setSearchResults([])
        inputSearchRef.current.focus()
    }

    const handleHideResults = () => {
        setShowResults(false)
    }

    const handleSearchInput = (e) => {
        const searchInput = e.target.value
        if (!searchInput.startsWith(' ')) {
            setInputSearchText(searchInput)
        }
    }

    return (
        <div className={cx('search')}>
            <div className={cx('search-container')}>
                <TippyHeadless
                    interactive
                    visible={showResults && searchResults.length > 0}
                    render={(attrs) => (
                        <div className={cx('search-results')} tabIndex="-1" {...attrs}>
                            <WrapperPopper>
                                <h3 className={cx('search-title')}>Account</h3>
                                {searchResults.map((result) => (
                                    <SearchedAccountItem key={result.id} data={result} />
                                ))}
                            </WrapperPopper>
                        </div>
                    )}
                    onClickOutside={handleHideResults}
                >
                    <form action="" className={cx('search-form')}>
                        <input
                            ref={inputSearchRef}
                            type="search"
                            name=""
                            placeholder="Tìm kiếm tài khoản và video"
                            className={cx('search-input')}
                            value={inputSearchText}
                            onChange={handleSearchInput}
                            onFocus={() => setShowResults(true)}
                        />
                        <div className={cx('icon-action')}>
                            {!!inputSearchText && !showLoadingIcon && (
                                <div className={cx('reset-search-form')} onClick={handleClearSearchText}>
                                    <DeleteIcon />
                                </div>
                            )}
                            {showLoadingIcon && (
                                <div className={cx('load-search-results')}>
                                    <LoadingIcon />
                                </div>
                            )}
                        </div>
                        <button
                            type="button"
                            className={cx('btn-search-submit')}
                            onMouseDown={(e) => e.preventDefault()}
                        >
                            <SearchIcon />
                        </button>
                    </form>
                </TippyHeadless>
            </div>
        </div>
    )
}

export default Search
