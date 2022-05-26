import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import {
  productListReducer,
  productCreateReducer,
  productDeleteReducer,
  productDetailsReducer,
  productReviewCreateReducer,
  productUpdateReducer,
} from './reducers/productReducers';
import {
  userAddressMapReducer,
  userDeleteReducer,
  userDetailsReducer,
  userListReducer,
  userRegisterReducer,
  userSigninReducer, 
  userUpdateProfileReducer,
  userUpdateReducer,
} from './reducers/userReducers';

import {
  taskDetailsReducer,
  taskCreateReducer,
  taskClearReducer,
  taskUpdateReducer,
  taskListReducer,
  taskErrorReducer,
  taskSetReducer,
  taskDeleteReducer,
} from './reducers/taskReducers';
const initialState = {
  userSignin: {
    userInfo: localStorage.getItem('userInfo')
      ? JSON.parse(localStorage.getItem('userInfo'))
      : null,
  },
};

const reducer = combineReducers({

  userSignin: userSigninReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userAddressMap: userAddressMapReducer,
  userUpdate: userUpdateReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  taskCreate:taskCreateReducer,
  taskClear:taskClearReducer,
  taskUpdate:taskUpdateReducer,
  taskList:taskListReducer,
  taskError:taskErrorReducer,
  taskSet:taskSetReducer,
  taskDetails: taskDetailsReducer,
  taskDelete: taskDeleteReducer,
  productCreate: productCreateReducer,
  productUpdate: productUpdateReducer,
  productDelete: productDeleteReducer,
  productList: productListReducer,
  productReviewCreate: productReviewCreateReducer,
  productDetails: productDetailsReducer,
});
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);
export default store;
