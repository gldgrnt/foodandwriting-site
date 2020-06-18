const transformContact = ({ content }) => {

    return {
        sanityContact: {
            _rawContent: content
        }
    }
}

export { transformContact }