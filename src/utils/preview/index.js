/**
 * Helpers to transform sanity api data into
 * the same format as Gatsby GraphQL results
 */
import { transformContact } from "./contact"
import { transformAbout } from "./about"
import { transformPost, postProjection } from "./post"
import { transformCookies } from "./cookies"

export {
    transformContact,
    transformAbout,
    transformPost,
    postProjection,
    transformCookies,
}
