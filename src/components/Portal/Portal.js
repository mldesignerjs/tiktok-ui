import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'

function Portal({ children, containerId }) {
    const [wrapper, setWrapper] = useState(null)

    useEffect(() => {
        let container = document.querySelector(`#${containerId}`)

        if (!container) {
            container = document.createElement('div')

            if (!containerId === undefined) {
                container.id = containerId
            }
            // container.id = 'portal'
            document.body.appendChild(container)
        }

        setWrapper(container)

        return () => {
            if (!containerId) {
                document.body.removeChild(container)
            }
        }
    }, [containerId])

    if (!wrapper) return null

    return ReactDOM.createPortal(children, wrapper)
}

Portal.propTypes = {
    children: PropTypes.node.isRequired,
    containerId: PropTypes.string,
}

export default Portal
