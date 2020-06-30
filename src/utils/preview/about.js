import { getFluidPropsFromFeaturedImage } from "../image"

export const transformAbout = ({ title, snippet, image, content }) => {
    const transformedImage = image
    image.asset.fluid = getFluidPropsFromFeaturedImage(image)

    return {
        sanityAbout: {
            title,
            snippet,
            image: transformedImage,
            _rawContent: content,
        },
    }
}
