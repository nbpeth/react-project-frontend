
export const setTasks = tasks => {
  return {
    type: "SET_TASKS",
    tasks
  }
}

export const postTask = task => {
  debugger
  return dispatch => {
    return fetch("http://localhost:3001/api/v1/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(task)
    })
      .then(resp => resp.json())
      .then(response => {
        if (response.error) {
          alert(response.error)
        } else {
          dispatch(addTask(response.data))
        }
      })
    // .catch(alert) 
  }
}


export const addTask = task => {
  return {
    type: "ADD_TASK",
    task
  }
}

export const updateTask = (task, id, history) => {
  debugger
  return dispatch => {
    return fetch(`http://localhost:3001/api/v1/tasks/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(task)
    })
      .then(resp => resp.json())
      .then(response => {
        if (response.error) {
          alert(response.error)
        } else {
          history.push('/')
          dispatch(updateTaskStore(response.data))
        }
        return response.data
      })
    // .catch(alert) 
  }
}
export const updateTaskStore = task => {
  return {
    type: "UPDATE_TASK",
    task
  }
}



export const deleteTask = task => {
  return {
    type: "DELETE_TASK",
    task
  }
}