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


/* USERS */ //=--------------------------------------

export const getUserId = (id) =>   // GET USER ID
  fetch(`${api}/users/${id}`, { 
  headers })
  .then(res => res.json())


export const getAllUser = (search) =>  // GET ALL USERS
  fetch(`${api}/users?offset=${0}&limit=${10}&q=${search}`, { 
  headers })
  .then(res => res.json())


export const getUserType = (body) =>   // GET USER TYPE
  fetch(`${api}/users/getUserType`, {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }).then(res => res.json())
  

export const changePassword = (body) =>   // CHANGE PASSWORD USER
fetch(`${api}/users/changePassword`, {
  method: 'PUT',
  headers: {
      ...headers,
      'Content-Type': 'application/json'
  },
  body: JSON.stringify(body)
}).then(res => res.json())


export const login = (body) =>   // USER LOGIN
  fetch(`${api}/users/login`, {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }).then(res => res.json())
  
export const logout = () =>   // USER LOGOUT
  fetch(`${api}/auth/logout`, {
    method: 'POST',
    headers
  }).then(res => res.json())


/* RULES */ //=--------------------------------------

export const getAllRules = () =>  // GET ALL RULES
  fetch(`${api}/rules?offset=${0}&limit=${10}`, {
  headers })
  .then(res => res.json())


export const deleteRules = (id) =>  // DELETE RULES
  fetch(`${api}/rules/${id}`, { 
    method: 'DELETE', 
    headers })
  .then(res => res.json())
    

export const addRules = (data) =>   // ADD RULES
  fetch(`${api}/rules`, {
    method: 'POST',
    headers,
    body: toFormURLEncode(data)
  }).then(res => res.json())


/* PRODUCT TYPE */ //=--------------------------------------

export const getAllProductTypes = () => // GET ALL PRODUCT TYPES
  fetch(`${api}/product_types?offset=${0}&limit=${100}`, { 
    headers })
    .then(res => res.json())


export const addProductType = (data) => { //  ADD PRODUCT TYPES
  console.log(data)

  return fetch(`${api}/product_types`, {
    method: 'POST', 
    body: toFormURLEncode(data),
    headers,
  })
  .then(res => res.json())
}

export const deleteProductType = (id) => //  DELETE PRODUCT TYPES
  fetch(`${api}/product_types/${id}`, { 
    method: 'DELETE', 
    headers })
  .then(res => res.json())


/* ALIAS NAME */ //=--------------------------------------

export const getAlias = () =>  // GET ALL ALIAS NAME
  fetch(`${api}/product_types/cb58c3a2-c15b-4cee-ba30-69a004b47a16/alias`, { 
  headers })
  .then(res => res.json())

// GET FEEDBACKS //=--------------------------------------

export const getFeedbacks = () => // GET FEEDBACKS
  fetch(`${api}/feedbacks?limit=${10}&offset=${0}`, { headers }) 
  .then(res => {
    return res.json()
})


// GET REPORTS //=--------------------------------------

export const getReports = () =>
  fetch(`${api}/reports?limit=${10}&offset=${0}`, { headers }) // default GET
  .then(res => {
    return res.json()
})
  











// // PRODUCT
// export const getAllProducts = () =>
//   fetch(`${api}/product`, { headers }) // default GET
//     .then(res => res.json())

// export const remove = (contact) =>
//   fetch(`${api}/contacts/${contact.id}`, { method: 'DELETE', headers })
//     .then(res => res.json())
//     .then(data => data.contact)

// export const create = (body) =>
//   fetch(`${api}/contacts`, {
//     method: 'POST',
//     headers: {
//       ...headers,
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(body)
//   }).then(res => res.json())


    
    // USER
// export const getAllUsers = () =>
// fetch(`${api}/user`, { headers }) // default GET
//   .then(res => res.json())

// export const createUser = (body) => 
// fetch(`${api}/user`, {
//   method: 'POST',
//   headers: {
//     ...headers,
//     'Content-Type': 'application/json' 
//   },
//   body: JSON.stringify(body)
// }).then(res => res.json())

// export const deleteUser = (user) =>
// fetch(`${api}/user/${user.id}`, { method: 'DELETE', headers })
// .then(res => res.json())

// export const viewFeedback = (id) =>
//   fetch(`${api}/feedbacks/${id}`, { headers }) // default GET
//   .then(res => res.json())
