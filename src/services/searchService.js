import f8Api from '~/api/f8Api'

export const search = async (q, type = 'less') => {
    try {
        const res = await f8Api.getSearchUsers({
            params: {
                q,
                type,
            },
        })
        return res.data
    } catch (error) {
        console.log(error)
    }
}
