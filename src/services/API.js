import * as Session from './session';
// const api = 'http://192.168.0.92:3000/api/v1';
// const api = 'http://192.168.0.125:3000/api/v1';
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

// GET USER ID
export const getUserId = (id) =>   
  fetch(`${api}/users/${id}`, {headers})
    .then(res => res.json())

// GET ALL USERS
export const getAllUser = (search) =>  
  fetch(`${api}/users?offset=${0}&limit=${10}&q=${search}`, { 
  headers })
  .then(res => res.json())

// GET USER TYPE
export const getUserType = (body) =>   
  fetch(`${api}/users/getUserType`, {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }).then(res => res.json())
  
// CHANGE PASSWORD USER
export const changePassword = (body) =>   
  fetch(`${api}/users/changePassword`, {
  method: 'PUT',
  headers: {
      ...headers,
      'Content-Type': 'application/json'
  },
  body: JSON.stringify(body)
}).then(res => res.json())

// USER LOGIN
export const login = (body) =>   
  fetch(`${api}/users/login`, {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }).then(res => res.json())
  
// USER LOGOUT
export const logout = () =>   
  fetch(`${api}/auth/logout`, {
    method: 'POST',
    headers
  }).then(res => res.json())


/* RULES */ //=--------------------------------------

// GET ALL RULES
export const getAllRules = () =>  
  fetch(`${api}/rules?offset=${0}&limit=${10}`, {
  headers })
  .then(res => res.json())

// DELETE RULES
export const deleteRules = (id) =>  
  fetch(`${api}/rules/${id}`, { 
    method: 'DELETE', 
    headers })
  .then(res => res.json())
    
// ADD RULES
export const addRules = (data) =>   
  fetch(`${api}/rules`, {
    method: 'POST',
    headers,
    body: toFormURLEncode(data)
  }).then(res => res.json())


/* PRODUCT TYPE */ //=--------------------------------------

// GET ALL PRODUCT TYPES
export const getAllProductTypes = () => 
  fetch(`${api}/product_types?offset=${0}&limit=${100}`, { 
    headers })
    .then(res => res.json())

// GET PRODUCT TYPE BY ID
export const getProductType = (id) =>
  fetch(`${api}/product_types/${id}`, { headers }) // default GET
    .then(res => res.json())

//  ADD PRODUCT TYPE
export const addProductType = (data) =>{
  return fetch(`${api}/product_types`, {
    method: 'POST', 
    body: toFormURLEncode(data),
    headers,
  })
  .then(res => res.json())
}

// UPDATE PRODUCT TYPE
export const updateProductType = (id, data) => {
  return fetch(`${api}/product_types/${id}`, {
    method: 'PUT', 
    body: toFormURLEncode(data),
    headers,
  })
  .then(res => res.json())
}

// DELETE PRODUCT TYPE
export const deleteProductType = (id) => 
  fetch(`${api}/product_types/${id}`, { 
    method: 'DELETE', 
    headers })
  .then(res => res.json())


/* ALIASES */ //=--------------------------------------

//GET ALL ALIASES BY ID
export const getAliasName = (id) =>
  fetch(`${api}/product_types/${id}/alias`, { headers }) // default GET
    .then(res => res.json())

// ADD ALIAS
export const addAliasName = (id, aliases) => {
  const body = {
    'aliases': aliases
  }

  return fetch(`${api}/product_types/${id}/alias`, {
    method: 'POST', 
    body: toFormURLEncode(body),
    headers,
  })
  .then(res => res.json())
}

// DELETE ALIAS BY PRODUCT TYPE ID & ALIAS ID
export const deleteAliasName = (productTypeId, aliasId) => 
  fetch(`${api}/product_types/${productTypeId}/alias/${aliasId}`, { 
    method: 'DELETE', 
    headers })
  .then(res => res.json())


// GET FEEDBACKS //=--------------------------------------

 // GET FEEDBACKS
export const getFeedbacks = () =>
  fetch(`${api}/feedbacks?limit=${100}&offset=${0}`, { headers }) 
  .then(res => res.json()
)

export const deleteFeedbacks = (id) =>
  fetch(`${api}/feedbacks/${id}`, {
    method: 'DELETE',
    headers }) 
  .then(res => res.json()
)


// GET REPORTS //=--------------------------------------

// default GET
export const getReports = () =>
  fetch(`${api}/reports?limit=${10}&offset=${0}`, { headers }) 
  .then(res => res.json())
  
 
 // DELETE REPORTS
export const deleteReport = (id) => 
  fetch(`${api}/reports/${id}`, { 
  method: 'DELETE', 
  headers })
.then(res => res.json())

