export const transformCookies = ({ content, cookies }) => {
    return {
        sanityCookies: {
            _rawContent: content,
            cookies,
        },
    }
}
