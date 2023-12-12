/*
Reducer có vai trò quan trọng trong việc quản lý và cập nhật 
trạng thái của ứng dụng dựa trên các tương tác và action của người dùng, 
đảm bảo tính không thay đổi và kiểm soát dữ liệu của ứng dụng.
*/

//ROOT REDUCER
import { combineReducers } from 'redux'
import auth from '../slices/auth.slice'
import profile from '../slices/profile.slice'
import article from '../slices/article.slice'
import comment from '../slices/comment.slice'

//kết hợp nhiều reducers thành một reducer duy nhất
export default combineReducers({
  auth,
  profile,
  article,
  comment
})
