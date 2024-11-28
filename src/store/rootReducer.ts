import authReducer from './slices/auth'
import appReducer from './slices/app'
import categoryReducer from './slices/category'
import postReducer from './slices/post'

const rootReducer = {
    app: appReducer,
    auth: authReducer,
    category: categoryReducer,
    post: postReducer
}

export default rootReducer
