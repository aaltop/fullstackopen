const tokenKey = "userToken"


/**
 * Return true if key is found in localStorage
 */
function getLoginState() {
    return !!window.localStorage.getItem(tokenKey)
}

function logout() {
    window.localStorage.removeItem(tokenKey)
}

function login(token) {
    window.localStorage.setItem(tokenKey, token)
}

export default {
    getLoginState,
    logout,
    login
}