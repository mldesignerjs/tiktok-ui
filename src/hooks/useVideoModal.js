import { useState } from 'react'
import VideoModal from '~/components/VideoModal'
import Modal from '~/components/Modal'
import { useCurrentVideoPlayingStore } from '~/redux'

function useVideoModal() {
    const [showVideoModal, setShowVideoModal] = useState(false)

    const { dispatch, currentVideoPlayingSlice } = useCurrentVideoPlayingStore()

    const hanldeCloseModal = () => {
        setShowVideoModal(false)
        dispatch(currentVideoPlayingSlice.actions.closeModal())
    }

    const videoModal = (
        <Modal onCloseModal={hanldeCloseModal} showModal={showVideoModal} videoModal>
            <VideoModal />
        </Modal>
    )

    return { videoModal, showVideoModal, setShowVideoModal }
}

export default useVideoModal
