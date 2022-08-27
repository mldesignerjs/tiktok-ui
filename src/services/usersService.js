import f8Api from '~/api/f8Api'

export const getSuggested = async (page, perPage) => {
    try {
        const res = await f8Api.getSuggestedchUsers({
            params: {
                page,
                per_page: perPage,
            },
        })
        return res.data
    } catch (error) {
        console.log(error)
    }
}

export const getFollowingsList = async (page) => {
    try {
        const res = await f8Api.getFollowingsList({
            params: {
                page,
            },
        })
        return res.data
    } catch (error) {
        console.log(error)
    }
}
