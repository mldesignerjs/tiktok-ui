import { useState } from 'react'
import Login from '~/components/Login'
import Modal from '~/components/Modal'
import { useUserStore } from '~/redux'

function useLoginModal() {
    const [showLoginModal, setShowLoginModal] = useState(false)

    const { currentUser } = useUserStore()

    const loginModal = !currentUser && (
        <Modal onCloseModal={() => setShowLoginModal(false)} showModal={showLoginModal}>
            <Login />
        </Modal>
    )

    return { loginModal, setShowLoginModal }
}

export default useLoginModal
