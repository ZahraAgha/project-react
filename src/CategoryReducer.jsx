import {
  ADD_CATEGORY,
  DELETE_CATEGORY,
  FETCH_CATEGORIES_SUCCESS,
  UPDATE_CATEGORY,
} from "./Categories";

const initialState = {
  items: [],
};

function CategoriesReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_CATEGORIES_SUCCESS:
      return {
        ...state,
        items: action.payload
      }  
    case ADD_CATEGORY:
      return {
        ...state,
        items: [...state.items, action.payload],
      };

    case UPDATE_CATEGORY:
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload.id
            ? { ...item, ...action.payload.updates }
            : item
        ),
      };

    case DELETE_CATEGORY:
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload.id),
      };

    default:
      return state;
  }
}

export default CategoriesReducer;
