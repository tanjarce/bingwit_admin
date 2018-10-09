const ACC_ADMIN = 'ACC_ADMIN'
const ACC_USER = 'ACC_USER'

const menus = {
    dashboard: "/dashboard",
    maps: "/maps",
    food: "/food",
    users: "/users",
    accounts: "/accounts",
    billings: "/billings",
}

const user = ['dashboard', 'maps', 'food' ]

export function getPermission (type) {
    const accType = formatRole(type)
    switch (accType) {
        case ACC_USER:
            return user.map(key => ({
                title: key,
                url: menus[key]
            }))
        default: 
            return Object.keys(menus).map(key => ({
                title: key,
                url: menus[key]
            }))
    }
}

export function formatRole (type) {
    switch (type) {
        case 'USER':
            return ACC_USER
        default: 
            return ACC_ADMIN
    }
}