import f8Api from '~/api/f8Api'

export const videosList = async (type, page) => {
    try {
        const res = await f8Api.getVideosList({
            params: {
                type,
                page,
            },
        })
        return res.data
    } catch (error) {
        console.log(error)
    }
}
