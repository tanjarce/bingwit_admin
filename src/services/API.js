import * as Session from './session';
// const api = 'http://192.168.0.92:3000/api/v1';
// const api = 'http://192.168.0.125:3000/api/v1';
// const api = 'https://bingwit-backend.herokuapp.com/api/v1';
const api = 'http://18.224.2.191/api/v1';
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
export const getAllUser = ({ offset = 0, limit = 10, searchQ = ''}) =>  
  fetch(`${api}/users?offset=${offset}&limit=${limit}&q=${searchQ}`, { 
  headers })
  .then(res => res.json())

 // GET SUSPEND USER
export const getSuspendUsers = ({ offset = 0, limit = 99, searchQ = ''}) =>  
fetch(`${api}/users/suspended?offset=${offset}&limit=${limit}&q=${searchQ}`, { 
headers })
.then(res => res.json())

// SUSPEND USER
export const suspendUser = (id) =>   
  fetch(`${api}/users/${id}/suspend`, {
  method: 'PUT',
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
export const getAllRules = ({ offset = 0, limit = 10, searchQ = ''}) =>  
  fetch(`${api}/rules?offset=${offset}&limit=${limit}&q=${searchQ}`, {
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
export const getAllProductTypes = ({ offset = 0, limit = 10, searchQ = ''}) => {
  console.log(`offset: ${offset}, limit: ${limit}, search: ${searchQ}`)  
  return fetch(`${api}/product_types?offset=${offset}&limit=${limit}&q=${searchQ}`, { 
    headers })
    .then(res => res.json())
}

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
export const getFeedbacks = ({ offset = 0, limit = 10, searchQ = ''}) =>

  fetch(`${api}/feedbacks?offset=${offset}&limit=${limit}&q=${searchQ}`, { headers }) 
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
export const getReports = ({ offset = 0, limit = 10, searchQ = ''}) =>
  fetch(`${api}/reports?offset=${offset}&limit=${limit}&q=${searchQ}`, { headers }) 
  .then(res => res.json())
  
 
 // DELETE REPORTS
export const deleteReport = (id) => 
  fetch(`${api}/reports/${id}`, { 
  method: 'DELETE', 
  headers })
.then(res => res.json())

// AREAS //=--------------------------------------

// get all areas
export const getAllAreas = ({ offset = 0, limit = 10, searchQ = ''}) =>
  fetch(`${api}/area?limit=${limit}&offset=${offset}&q=${searchQ}`, { headers }) 
  .then(res => res.json())

export const getAreasAndUsers = (id) =>
  fetch(`${api}/area/${id}`, { headers }) 
  .then(res => res.json())


  // delete area
export const deleteArea = (id) => 
  fetch(`${api}/area/${id}`, { 
  method: 'DELETE', 
  headers })
  .then(res => res.json())

// add area
export const addArea = (area) => {
  const body = {
    'area_address': area
  }

  return fetch(`${api}/area`, {
    method: 'POST', 
    body: toFormURLEncode(body),
    headers,
  })
  .then(res => res.json())
}

// UPDATE Area
export const updateArea = (id, data) => {
  const body = {
    'area_address': data
  }

  return fetch(`${api}/area/${id}`, {
    method: 'PUT', 
    body: toFormURLEncode(body),
    headers,
  })
  .then(res => res.json())
}



/* USERS TRANSACTION */ //=--------------------------------------

// GET USER TANSACTIONS

export const getUserTransaction = (id) =>  
fetch(`${api}/users/${id}/transactions`, { 
headers })
.then(res => res.json())