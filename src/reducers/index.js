import { combineReducers } from 'redux'

import {
    FOOD_UPDATE_QUERY,
    FOOD_UPDATE_ITEMS,
    MENU_APPLY_ITEMS,
    CART_ADD,
    CART_REMOVE
  } from '../actions'

const initialFoodState = {
    query: "",
    foodItems: []
}

function food (state = initialFoodState, action) {
  switch (action.type) {
      case FOOD_UPDATE_QUERY :
        const { value } = action
  
        return {
          ...state,
          query: value
        }
      case FOOD_UPDATE_ITEMS :
        const { items } = action

        return {
          ...state,
          foodItems: items
        }
      default :
        return state
    }
}

const intialMenuState = {
  items: [],
  userType: null
}

function menu ( state = intialMenuState, action) {
  switch (action.type) {
    case MENU_APPLY_ITEMS :
      const { menuItems, userType } = action

      return {
        ...state,
        items: menuItems,
        type: userType
      }
    default :
      return state
  }
}

const initialCartState = {
  items: []
}

function cart ( state = initialCartState, action) {
  switch (action.type) {
    case CART_ADD: {
      const { item } = action

      return {
        ...state,
        items: [
          ...state.items,
          item
        ]
      }
    }
    case CART_REMOVE: {
      const { item } = action

      return {
        ...state,
        items: state.items.filter(a => a.label !== item.label)
      }
    }
    default:
      return state
  }
}

export default combineReducers({
    food,
    menu,
    cart
})