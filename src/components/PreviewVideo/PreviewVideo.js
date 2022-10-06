import { useState, useRef } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames/bind'

import styles from './PreviewVideo.module.scss'
import { useVideoModal } from '~/hooks'
import { PlayIconOutLine } from '~/components/Icons'
import Image from '~/components/Image'
import { useCurrentVideoPlayingStore } from '~/redux'

const cx = classNames.bind(styles)

function PreviewVideo({ data, indexVideo }) {
    const [isHover, setIsHover] = useState(false)
    const { videoModal, setShowVideoModal } = useVideoModal()
    const { dispatch, currentVideoPlayingSlice } = useCurrentVideoPlayingStore()

    const itemRef = useRef(null)
    const videoRef = useRef(null)

    const handleMouseOver = () => {
        setIsHover(true)
    }

    const handleMouseOut = () => {
        setIsHover(false)
    }

    const handleShowModal = () => {
        setShowVideoModal(true)
        dispatch(currentVideoPlayingSlice.actions.playInModal({ index: indexVideo }))
    }

    return (
        <>
            {videoModal}
            <div
                ref={itemRef}
                className={cx('item-container')}
                onMouseOver={handleMouseOver}
                onMouseOut={handleMouseOut}
                onClick={handleShowModal}
                id={`video-${data.id}`}
            >
                <div className={cx('preview')}>
                    <div className={cx('size-preview')}>
                        <div className={cx('thumb')}>
                            <Image src={data.thumb_url} />
                            {isHover && (
                                <video ref={videoRef} playsInline={true} autoPlay muted loop>
                                    <source src={data.file_url} type="video/mp4" />
                                </video>
                            )}
                        </div>
                        <div className={cx('views-counter')}>
                            <PlayIconOutLine />
                            <span>{data.views_count}</span>
                        </div>
                    </div>
                </div>
                <div className={cx('caption-line')} title={data.description}>
                    {data.description}
                </div>
            </div>
        </>
    )
}

PreviewVideo.propTypes = {
    data: PropTypes.object.isRequired,
}
export default PreviewVideo
