import authReducer from './slices/auth'
import appReducer from './slices/app'
import categoryReducer from './slices/category'

const rootReducer = {
    app: appReducer,
    auth: authReducer,
    category: categoryReducer
}

export default rootReducer
