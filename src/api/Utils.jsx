export function formatDate(date) {
    return new Date(date).toISOString().substring(0, 10).replaceAll(",", "/")
}

export function getCookie(cookie_name) {
    const value = "; " + document.cookie
    const parts = value.split("; " + cookie_name + "=")
    if (parts.length === 2) return parts.pop().split(";").shift()
    else return null
}

export function changeLocation(location) {
    //useNavigate("/".concat(location))
}

export function getUrl() {
    const host = window.location.hostname;
    return "http://" + host + ":3000/"
}