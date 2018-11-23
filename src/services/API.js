import * as Session from './session';
// const api = 'http://192.168.0.92:3000/api/v1';
const api = 'http://192.168.0.125:3000/api/v1';
// const api = 'https://bingwit-backend.herokuapp.com/api/v1';
// const api = 'http://18.224.2.191/api/v1';

const headers = () => {
  const token = Session.getToken()
  
  return(
   {
     'Content-Type': 'application/x-www-form-urlencoded',
     'Authorization': `Bearer ${token ? token.token : null}`
   } 
  )
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
  fetch(`${api}/users/${id}`, {headers: headers()})
    .then(res => res.json())

// GET ALL USERS

export const getAllUser = ({ offset = 0, limit = 10, searchQ = '', order = '' , sort = 'ASC'}) =>  
  fetch(`${api}/users?offset=${offset}&limit=${limit}&q=${searchQ}&order=["${order}%20${sort}"]`, { 
  headers: headers() })
  .then(res => res.json())

 // GET SUSPEND USER
export const getSuspendUsers = ({ offset = 0, limit = 99, searchQ = ''}) =>  
fetch(`${api}/users/suspended?offset=${offset}&limit=${limit}&q=${searchQ}`, { 
  headers: headers() })
.then(res => res.json())

// SUSPEND USER
export const suspendUser = (id) =>   
  fetch(`${api}/users/${id}/suspend`, {
  method: 'PUT',
  headers: headers() })
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
      ...headers(),
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
    headers: headers()
  }).then(res => res.json())


/* RULES */ //=--------------------------------------

// GET ALL RULES
export const getAllRules = ({ offset = 0, limit = 10, searchQ = ''}) =>{
  return fetch(`${api}/rules?offset=${offset}&limit=${limit}&q=${searchQ}`, {
  headers: headers() })
  .then(res => res.json())

}  

// DELETE RULES
export const deleteRules = (id) =>  
  fetch(`${api}/rules/${id}`, { 
    method: 'DELETE', 
    headers: headers() })
  .then(res => res.json())
    
// ADD RULES
export const addRules = (data) =>   
  fetch(`${api}/rules`, {
    method: 'POST',
    headers: headers(),
    body: toFormURLEncode(data)
  }).then(res => res.json())


/* PRODUCT TYPE */ //=--------------------------------------

// GET ALL PRODUCT TYPES
export const getAllProductTypes = ({ offset = 0, limit = 10, searchQ = '', category = ''}) => {
  const token = headers()
  console.log(token.Authorization)
  return fetch(`${api}/product_types?offset=${offset}&limit=${limit}&q=${searchQ}&filter=${category}`, { 
    headers: headers() })
    .then(res => res.json())
}

// GET PRODUCT TYPE BY ID
export const getProductType = (id) =>
  fetch(`${api}/product_types/${id}`, { headers: headers() }) // default GET
    .then(res => res.json())

//  ADD PRODUCT TYPE
export const addProductType = (data) =>{
  return fetch(`${api}/product_types`, {
    method: 'POST', 
    body: toFormURLEncode(data),
    headers: headers(),
  })
  .then(res => res.json())
}

// UPDATE PRODUCT TYPE
export const updateProductType = (id, data) => {
  return fetch(`${api}/product_types/${id}`, {
    method: 'PUT', 
    body: toFormURLEncode(data),
    headers: headers(),
  })
  .then(res => res.json())
}

// DELETE PRODUCT TYPE
export const deleteProductType = (id) => 
  fetch(`${api}/product_types/${id}`, { 
    method: 'DELETE', 
    headers: headers() })
  .then(res => res.json())


/* ALIASES */ //=--------------------------------------

//GET ALL ALIASES BY ID
export const getAliasName = (id) =>
  fetch(`${api}/product_types/${id}/alias`, { headers: headers() }) // default GET
    .then(res => res.json())

// ADD ALIAS
export const addAliasName = (id, aliases) => {
  const body = {
    'aliases': aliases
  }

  return fetch(`${api}/product_types/${id}/alias`, {
    method: 'POST', 
    body: toFormURLEncode(body),
    headers: headers(),
  })
  .then(res => res.json())
}

// DELETE ALIAS BY PRODUCT TYPE ID & ALIAS ID
export const deleteAliasName = (productTypeId, aliasId) => 
  fetch(`${api}/product_types/${productTypeId}/alias/${aliasId}`, { 
    method: 'DELETE', 
    headers: headers() })
  .then(res => res.json())


// GET FEEDBACKS //=--------------------------------------

 // GET FEEDBACKS
export const getFeedbacks = ({ offset = 0, limit = 10, searchQ = ''}) =>

  fetch(`${api}/feedbacks?offset=${offset}&limit=${limit}&q=${searchQ}`, { headers: headers() }) 
  .then(res => res.json()
)

export const deleteFeedbacks = (id) =>
  fetch(`${api}/feedbacks/${id}`, {
    method: 'DELETE',
    headers: headers() }) 
  .then(res => res.json()
)


// GET REPORTS //=--------------------------------------

// default GET
export const getReports = ({ offset = 0, limit = 10, searchQ = ''}) =>
  fetch(`${api}/reports?offset=${offset}&limit=${limit}&q=${searchQ}`, { headers: headers() }) 
  .then(res => res.json())
  
 
 // DELETE REPORTS
export const deleteReport = (id) => 
  fetch(`${api}/reports/${id}`, { 
  method: 'DELETE', 
  headers: headers() })
.then(res => res.json())

// AREAS //=--------------------------------------

// get all areas
export const getAllAreas = ({ offset = 0, limit = 10, searchQ = ''}) =>
  fetch(`${api}/area?limit=${limit}&offset=${offset}&q=${searchQ}`, { headers: headers() }) 
  .then(res => res.json())

export const getAreasAndUsers = (id) =>
  fetch(`${api}/area/${id}`, { headers: headers() }) 
  .then(res => res.json())


  // delete area
export const deleteArea = (id) => 
  fetch(`${api}/area/${id}`, { 
  method: 'DELETE', 
  headers: headers() })
  .then(res => res.json())

// add area
export const addArea = (area) => {
  const body = {
    'area_address': area
  }

  return fetch(`${api}/area`, {
    method: 'POST', 
    body: toFormURLEncode(body),
    headers: headers(),
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
    headers: headers(),
  })
  .then(res => res.json())
}



/* USERS TRANSACTION */ //=--------------------------------------

// GET USER TANSACTIONS CONSUMER

export const getUserTransactionReceipt = (id) =>  
fetch(`${api}/users/${id}/receipts`, { 
  headers: headers() })
.then(res => res.json())

// GET USER TANSACTIONS PRODUCER

export const getUserTransactionProducer = (id) =>  
fetch(`${api}/users/${id}/transactions`, { 
  headers: headers() })
.then(res => res.json())

// GET USER TANSACTIONS CONSUMER BY TRACKING NUMBER

export const getUserTransactionReceiptByTRK = (id, trk_id) =>  
fetch(`${api}/users/${id}/receipts/${trk_id}`, { 
  headers: headers() })
.then(res => res.json())

// GET USER TANSACTIONS PRODUCER BY ID

export const getUserTransactionProducerById = (id, transaction_id) =>  
fetch(`${api}/users/${id}/transactions/${transaction_id}`, { 
  headers: headers() })
.then(res => res.json())

/* CATEGORY */ //=--------------------------------------

// GET CATEGORY

export const getCategories = ({ offset = 0, limit = 10, searchQ = ''}) =>
  fetch(`${api}/product_category?limit=${limit}&offset=${offset}&q=${searchQ}`, { headers: headers() }) 
  .then(res => res.json())

// I just used this for the options in input selection filter
export const getAllCategories = () =>
  fetch(`${api}/product_category`, { headers: headers() }) 
  .then(res => res.json())

// DELETE CATEGORY
export const deleteCategory = (id) => 
  fetch(`${api}/product_category/${id}`, { 
  method: 'DELETE', 
  headers: headers() })
  .then(res => res.json())
  
// ADD CATEGORY
export const addCategory = (category) => {
  const body = {
    'name': category
  }
  console.log(body)

  return fetch(`${api}/product_category`, {
    method: 'POST', 
    body: toFormURLEncode(body),
    headers: headers(),
  })
  .then(res => res.json())
}

// View Category

export const getCategoryById = (id) =>
  fetch(`${api}/product_category/${id}`, { headers: headers() }) 
  .then(res => res.json())

// UPDATE Category
export const updateCategory = (id, data) => {
  const body = {
    'name': data
  }

  return fetch(`${api}/product_category/${id}`, {
    method: 'PUT', 
    body: toFormURLEncode(body),
    headers: headers(),
  })
  .then(res => res.json())
}



// export const getAllCategories = ({ offset = 0, limit = 10, searchQ = ''}) =>
//   fetch(`${api}/product_category_all?offset=${offset}&limit=${limit}&q=${searchQ}`, { headers: headers() }) 
//   .then(res => res.json())
  
