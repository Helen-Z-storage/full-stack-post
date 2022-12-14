import { applyMiddleware, createStore} from "redux";
import { createLogger } from "redux-logger";
import thunk from "redux-thunk";
import promise from "redux-promise-middleware";
import reducer from "../reducers";

const middleware = process.env.NODE_ENV==='development' ? 
                    applyMiddleware(promise, thunk, createLogger()) :
                    applyMiddleware(promise, thunk);

export default createStore(reducer, middleware)
