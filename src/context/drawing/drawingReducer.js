import {
   ADD_DRAWING,
   GET_DRAWINGS,
   UPDATE_DRAWING,
   DELETE_DRAWING,
   CLEAR_DRAWINGS,
   SET_CURRENT,
   CLEAR_CURRENT,
   DRAWING_ERROR,
 
} from '../types';
// eslint-disable-next-line
export default (state, action) => {
   switch (action.type) {
      case ADD_DRAWING:

         return {

            ...state,
            drawings: [...state.drawings, action.payload],
            loading: false
         };
      case UPDATE_DRAWING:
         return {
            ...state,
            drawings: state.drawings.map(drawing =>
               drawing._id === action.payload._id ? action.payload : drawing
            ),
            loading: false
         };
      case GET_DRAWINGS:
         return {
            ...state,
            drawings: action.payload,
            loading: false
         };
      case DELETE_DRAWING:
         return {
            ...state,
            drawings: state.drawings.filter(
               drawing => drawing._id !== action.payload
            ),
            loading: false
         };
  
      case CLEAR_DRAWINGS:
         return {
            ...state,
            drawings: [],
            current: null,
            filtered: null,
            error: null
         };
      case SET_CURRENT:
         return {
            ...state,
            current: action.payload
         };
      case CLEAR_CURRENT:
         return {
            ...state,
            current: null
         };


      case DRAWING_ERROR:
         return {
            ...state,
            error: action.payload
         };

      default:
         return state;
   }
};
