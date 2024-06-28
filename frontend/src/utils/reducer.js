import { createContext, useContext } from "react"

const GlobalContext = createContext()
const useGlobalContext = () => useContext(GlobalContext)

function globalReducer(state, action) {
  switch (action.type) {
    case "setToken": {
      localStorage.setItem("token", action.data || "")
      return {
        ...state,
        token: action.data,
      }
    }
    case "setUser": {
      localStorage.setItem("user", JSON.stringify(action.data) || "")
      return {
        ...state,
        user: action.data,
      }
    }
    default:
      return state
  }
}

export { GlobalContext, useGlobalContext, globalReducer }
