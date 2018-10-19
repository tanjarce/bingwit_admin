import Cookies from 'universal-cookie';
const cookie = new Cookies();

export const getToken = () => {
    const user = getUser()
    if (user)
        return user
    return null
}

export const hasAccess = () => {
    return getUser() ? true : false
}

export const getUser = () => {
    return cookie.get('user')
}

export const getRole = () => {
    const user = getUser()
    if (user)
        return user.role
    return null
}

export const saveUser = (response) => {
    // const userData = response.data.items[0]
    const userData = response
    console.log(userData)
    cookie.set('user', userData, {path: '/'})
}

export const removeUser = (id) => {
    cookie.remove('user', {path: '/'})
    console.log(`cookie set to null ${getUser()}`)
}
