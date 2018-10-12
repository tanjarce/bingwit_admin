export const FOOD_UPDATE_QUERY = 'FOOD_UPDATE_QUERY'
export const FOOD_UPDATE_ITEMS = 'FOOD_UPDATE_ITEMS'

export const MENU_APPLY_ITEMS = 'MENU_APPLY_ITEMS'

export const CART_ADD = 'CART_ADD'
export const CART_REMOVE = 'CART_REMOVE'

export const FoodAction = {
  updateQuery: foodWillUpdateQuery,
  updateItems: foodWillUpdateItems
}

function foodWillUpdateQuery ({ value }) {
  return {
    type: FOOD_UPDATE_QUERY,
    value
  }
}

function foodWillUpdateItems ({ items }) {
  return {
    type: FOOD_UPDATE_ITEMS,
    items
  }
}

export const MenuAction = {
  applyItems: applyItems
}

function applyItems ({ menuItems, userType }) {
  return {
    type: MENU_APPLY_ITEMS,
    menuItems,
    userType
  }
}

export const CartAction = {
  addToCart: cartWillAdd,
  removeFromCart: cartWillRemove
}

function cartWillAdd ({ item }) {
  return {
    type: CART_ADD,
    item
  }
}

function cartWillRemove ({ item }) {
  return {
    type: CART_REMOVE,
    item
  }
}

