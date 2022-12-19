const getI18n = (key) => {
    if (key) {
        return chrome.i18n.getMessage(key) || `{${key}}`
    } else {
        return key
    }
}

export default getI18n
