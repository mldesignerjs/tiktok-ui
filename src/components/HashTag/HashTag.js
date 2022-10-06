import PropTypes from 'prop-types'
import Linkify from 'linkify-react'
import 'linkify-plugin-hashtag'

function HashTag({ children }) {
    const optionsHashTag = {
        formatHref: {
            hashtag: (href) => '/hashtag/' + href.substr(1),
        },
    }

    return (
        <Linkify options={optionsHashTag} tagName="span">
            {children}
        </Linkify>
    )
}

HashTag.propTypes = {
    children: PropTypes.node.isRequired,
}

export default HashTag
