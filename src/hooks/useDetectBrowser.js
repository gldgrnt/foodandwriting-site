import { useEffect, useState } from "react"
import { detect } from "detect-browser"

export const useDetectBrowser = () => {
    const [browser, setBrowser] = useState(null)

    useEffect(() => {
        return setBrowser(detect())
    }, [])

    return browser
}
