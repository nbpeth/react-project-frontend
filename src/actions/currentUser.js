import { setTasks } from "./tasks.js"

export const setCurrentUser = user => {
  return {
    type: "SET_CURRENT_USER",
    user
  }
}

export const clearCurrentUser = () => {
  return {
    type: "CLEAR_CURRENT_USER"
  }
}

// paths are hard coded, routes should be agnostic of environment e.g. the root path should be injected into the app as a variable
// ultimately, this should end up on node's process.ENV dictionary as an environment variable, maybe "const backendPath=process.ENV.BACKEND_PATH" and urls look more like `${backendPath}/api/v1/...`

export const login = (credentials, history) => {
  return dispatch => {
    return fetch("http://localhost:3001/api/v1/login", {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(credentials)
    })
      .then(resp => resp.json())
      .then(response => {
        if (response.error) {
          alert(response.error)
        } else {
          dispatch(setCurrentUser(response.data))
          dispatch(setTasks(response.included))
          history.push("/tasks/my-tasks")
        }
      })
      .catch(alert)
  }
}

export const signUp = (credentials, history) => {
  return dispatch => {
    const userInfo = {
      user: credentials
    }
    return fetch("http://localhost:3001/api/v1/signup", {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(userInfo)
    })
      .then(r => r.json())
      .then(response => {
        // see other notes about error handling.
        // it might also make more sense to handle the error here and useDispatch, if that's a better React way of communicating the error
        if (response.error) {
          alert(response.error)
        } else {
          dispatch(setCurrentUser(response.data))
          // history.push('/')
        }
      })
      .catch(alert)
  }
}


export const logout = event => {
  return dispatch => {
    dispatch(clearCurrentUser())
    return fetch('http://localhost:3001/api/v1/logout', {
      credentials: "include",
      method: "DELETE"
    })
  }
}

export const getCurrentUser = () => {
  return dispatch => {
    return fetch("http://localhost:3001/api/v1/get_current_user", {
      credentials: "include",
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
    })
      .then(resp => {
        return resp.json()
      })
      .then(response => {
        if (response.error) {
          console.log(response.error)
        } else {
          dispatch(setCurrentUser(response.data))
          dispatch(setTasks(response.included))
        }
      })
  }
}

