import {
   ADD_LINE,
   GET_LINES,
   UPDATE_LINE,
   DELETE_LINE,
   CLEAR_LINES,
   SET_CURRENT,
   CLEAR_CURRENT,
   LINE_ERROR
} from '../types';
// eslint-disable-next-line
export default (state, action) => {
   switch (action.type) {
      case ADD_LINE:
         
         return {
          
            ...state,
            
            lines:  [ ...state.lines, action.payload],
            loading: false
         };
      case UPDATE_LINE:
         return {
            ...state,
            lines: state.lines.map(LINE =>
               LINE._id === action.payload._id ? action.payload : LINE
            ),
            loading: false
         };
      case GET_LINES:
         return {
            ...state,
            lines: action.payload,
            loading: false
         };
      case DELETE_LINE:
         return {
            ...state,
            lines: state.lines.filter(
               LINE => LINE._id !== action.payload
            ),
            loading: false
         };
      case CLEAR_LINES:
         return {
            ...state,
            lines: [],
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
   
 
      case LINE_ERROR:
         return {
            ...state,
            error: action.payload
         };

      default:
         return state;
   }
};
