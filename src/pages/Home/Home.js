import WrapperVideos from '~/components/WrapperVideos'
import { useTitle } from '~/hooks'

function Home() {
    useTitle('Tiktok - Make your day')

    return (
        <>
            <WrapperVideos />
        </>
    )
}

export default Home
