import * as Session from './session';
// const api = 'http://192.168.0.92:3000/api/v1';
// const api = 'http://192.168.1.132:3000/api/v1';
const api = 'http://192.168.0.126:3000/api/v1';
let token = Session.getToken()

const headers = {
  'Content-Type': 'application/x-www-form-urlencoded',
  'Authorization': `Bearer ${token ? token.token : null}`
}

// convert to form url encode

function toFormURLEncode (data) {
  var formBody = [];
  for (var property in data) {
    var encodedKey = encodeURIComponent(property);
    var encodedValue = encodeURIComponent(data[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  return formBody.join("&"); 
}

/* GET ADMIN RULES */
export const getAllRules = () =>
  fetch(`${api}/rules?offset=${0}&limit=${100}`, { headers }) // default GET
  .then(res => res.json())

/* GET TOTAL RULES */
export const getCountRules = () =>
  fetch(`${api}/rules/count`, { headers }) // default GET
  .then(res => res.json())

/* GET USER ID */
export const getUserId = (id) =>
  fetch(`${api}/users/${id}`, { 
  headers }) // default GET
  .then(res => res.json())

/* GET ALL USERS */
export const getAllUser = () =>
  fetch(`${api}/users`, { 
  headers }) // default GET
  .then(res => res.json())

/* ADMIN CHANGE PASSWORD */
export const changePassword = (body) =>
  fetch(`${api}/users/changePassword`, {
    method: 'PUT',
    headers: {
        ...headers,
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }).then(res => res.json())
  

/* DELETE RULES */
export const deleteRules = (id) =>
  fetch(`${api}/rules/${id}`, { 
    method: 'DELETE', 
    headers })
  .then(res => res.json())
    
//BINGWIT SETNREWRULES ADD
export const addRules = (data) =>
  fetch(`${api}/rules`, {
    method: 'POST',
    headers,
    body: toFormURLEncode(data)
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
  

// PRODUCT TYPES

// get all product types
export const getAllProductTypes = () =>
  fetch(`${api}/product_type?offset=${0}&limit=${100}`, { headers }) // default GET
    .then(res => res.json())

//  add product type
export const addProductType = (data) =>{
  console.log(data)

  return fetch(`${api}/product_type`, {
    method: 'POST', 
    body: toFormURLEncode(data),
    headers,
  })
  .then(res => res.json())
}

export const deleteProductType = (id) =>
  fetch(`${api}/product_type/${id}`, { 
    method: 'DELETE', 
    headers })
  .then(res => res.json())

// ALIAS NAME

//get all alias name
export const getAlias = () =>
  fetch(`${api}/product_type/cb58c3a2-c15b-4cee-ba30-69a004b47a16/alias`, { headers }) // default GET
    .then(res => res.json())
