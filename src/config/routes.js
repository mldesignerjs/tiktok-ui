const routes = {
    home: {
        path: '/',
        title: 'Dành cho bạn',
    },
    following: {
        path: '/following',
        title: 'Đang theo dõi',
    },
    profile: {
        path: '/@:nickname',
        title: null,
    },
    upload: {
        path: '/upload',
        title: 'Tải video lên',
    },
    live: {
        path: '/live',
        title: 'Live',
    },
    search: {
        path: '/search',
        title: null,
    },
    message: {
        path: '/message',
        title: 'Tin nhắn',
    },
    login: {
        path: '/login',
        title: 'Đăng nhập',
    },
}

export default routes
