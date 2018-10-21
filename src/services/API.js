import * as Session from './session';
// http://192.168.0.125:3000/api/v1/users/verify
// const api = process.env.REACT_APP_URL_STAGING;
const api = 'http://192.168.0.126:3000/api/v1';
// const api = 'http://192.168.0.92:3000/api/v1';
// const api = 'http://192.168.1.132:3000/api/v1';
let token = Session.getToken()
console.log(token)
const headers = {
  'Accept': 'application/json',
  'Authorization': `Bearer ${token ? token.token : null}`
}
/* GET ADMIN RULES */
export const getAllRules = () =>
  fetch(`${api}/rules/view`, { headers }) // default GET
  .then(res => res.json())

/* GET TOTAL RULES */
export const getCountRules = () =>
  fetch(`${api}/rules/count`, { headers }) // default GET
  .then(res => {res.json()})
/* DELETE RULES */
export const deleteRules = (id) =>
  fetch(`${api}/rules/delete/${id}`, { 
    method: 'PUT', 
    headers })
  .then(res => res.json())
    
//BINGWIT SETNREWRULES ADD
export const addRules = (item) =>
  fetch(`${api}/rules/create`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(item)
  }).then(res => res.json())
/* VERIFY USER ADMIN */
export const getUserType = (body) =>
  fetch(`${api}/users/getUserType`, {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }).then(res => res.json())
  
//BINGWIT LOGIN
export const login = (body) =>
  fetch(`${api}/users/login`, {
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

// GET FEEDBACKS

export const getFeedbacks = () =>
  fetch(`${api}/feedbacks?limit=${10}&offset=${0}`, { headers }) // default GET
  .then(res => {
    return res.json()
})

export const viewFeedback = (id) =>
  fetch(`${api}/feedbacks/${id}`, { headers }) // default GET
  .then(res => res.json())

// GET REPORTS

// export const getReports = () =>
//   fetch(`${api}/users/reports?limit=${10}&offset=${0}`, { headers }) // default GET
//   .then(res => {
//     // console.log(token)
//     return res.json()
// })
  
