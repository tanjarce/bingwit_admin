import * as Session from './session';

const api = process.env.REACT_APP_URL_STAGING;
let token = Session.getToken()

const headers = {
  'Accept': 'application/json',
  'x-access-token': token
}

// LOGIN
export const login = (body) =>
  fetch(`${api}/auth/login`, {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }).then(res => res.json())

export const logout = () => 
  fetch(`${api}/auth/logout`, {
    method: 'POST',
    headers
  }).then(res => res.json())

// USER
export const getAllUsers = () =>
  fetch(`${api}/user`, { headers }) // default GET
    .then(res => res.json())

export const createUser = (body) => 
  fetch(`${api}/user`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json' 
    },
    body: JSON.stringify(body)
  }).then(res => res.json())

export const deleteUser = (user) =>
fetch(`${api}/user/${user.id}`, { method: 'DELETE', headers })
  .then(res => res.json())
  

// PRODUCT
export const getAllProducts = () =>
  fetch(`${api}/product`, { headers }) // default GET
    .then(res => res.json())

export const remove = (contact) =>
  fetch(`${api}/contacts/${contact.id}`, { method: 'DELETE', headers })
    .then(res => res.json())
    .then(data => data.contact)

export const create = (body) =>
  fetch(`${api}/contacts`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }).then(res => res.json())
