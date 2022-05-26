import {
   ADD_DRAWING,
   GET_DRAWINGS,
   UPDATE_DRAWING,
   DELETE_DRAWING,
   CLEAR_DRAWINGS,
   SET_CURRENT,
   CLEAR_CURRENT,
   DRAWING_ERROR
} from '../types';
// eslint-disable-next-line
export default (state, action) => {
   switch (action.type) {
      case ADD_DRAWING:
         
         return {
          
            ...state,
            
            points:  [ ...state.points, action.payload],
            loading: false
         };
      case UPDATE_DRAWING:
         return {
            ...state,
            points: state.points.map(DRAWING =>
               DRAWING._id === action.payload._id ? action.payload : DRAWING
            ),
            loading: false
         };
      case GET_DRAWINGS:
         return {
            ...state,
            points: action.payload,
            loading: false
         };
      case DELETE_DRAWING:
         return {
            ...state,
            points: state.points.filter(
               DRAWING => DRAWING._id !== action.payload
            ),
            loading: false
         };
      case CLEAR_DRAWINGS:
         return {
            ...state,
            points: [],
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
