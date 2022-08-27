import { HeaderOnly, FullWidth } from '~/layouts'
import Following from '~/pages/Following'
import Home from '~/pages/Home'
import Profile from '~/pages/Profile'
import Upload from '~/pages/Upload'
import Live from '~/pages/Live'
import config from '~/config'

const publicRoutes = [
    { path: config.routes.home.path, component: Home },
    { path: config.routes.following.path, component: Following },
    { path: config.routes.profile.path, component: Profile, layout: FullWidth },
    { path: config.routes.upload.path, component: Upload, layout: HeaderOnly },
    { path: config.routes.live.path, component: Live, layout: FullWidth },
]
const privateRoutes = []

export { publicRoutes, privateRoutes }
