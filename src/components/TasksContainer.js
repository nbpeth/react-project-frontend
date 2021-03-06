import React, { Component } from "react";
import { connect } from "react-redux";
import MyTasks from "./MyTasks.js";
import TaskForm from "./TaskForm.js";
import AssignedTasks from "./AssignedTasks.js";
import CompletedTasks from "./CompletedTasks.js";
import EditTask from "./EditTask.js";
import { Switch, Route } from "react-router-dom";
import TaskInfo from "./TaskInfo.js";
import { Container, Row, Col } from "react-bootstrap";

class TasksContainer extends Component {
  state = {
    showComponent: false,
    task: "",
  };

  showComponent = (event) => {
    const taskId = event.target.attributes.id.nodeValue;
    const task = this.props.tasks.find((task) => task.id === taskId);
    this.setState((state) => ({
      showComponent: !state.showComponent,
      task: task,
    }));
  };

  componentDidMount() {
    this.props.history.push("/tasks/my-tasks");
  }

  filterMyTasks = (tasks) => {
    return tasks
      .filter(
        (task) =>
          task.attributes.user.id === parseInt(this.props.currentUser.id)
      )
      .filter((task) => task.attributes.completed === false);
  };

  filterAssignedTasks = (tasks) => {
    return tasks
      .filter(
        (task) =>
          task.attributes.user.id !== parseInt(this.props.currentUser.id)
      )
      .filter((task) => task.attributes.completed === false);
  };

  filterCompletedTasks = (tasks) => {
    return tasks
      .filter((task) => task.attributes.completed === true)
      .filter(
        (task) =>
          task.attributes.user.id === parseInt(this.props.currentUser.id)
      );
  };

  render() {
    return (
      <div className="tasks-container">
        <Container>
          <Row>
            <Col>
              <Switch>
                <Route
                  exact
                  path="/tasks/my-tasks"
                  render={(routerProps) => (
                    <MyTasks
                      {...routerProps}
                      myTasks={this.filterMyTasks(this.props.tasks)}
                      key={this.filterMyTasks(this.props.tasks)}
                      currentUser={this.props.currentUser}
                      showComponent={this.showComponent}
                    />
                  )}
                />
                <Route
                  path="/tasks/assigned"
                  render={(routerProps) => (
                    <AssignedTasks
                      {...routerProps}
                      assignedTasks={this.filterAssignedTasks(this.props.tasks)}
                      key={this.filterAssignedTasks(this.props.tasks)}
                      showComponent={this.showComponent}
                    />
                  )}
                />
                <Route
                  path="/tasks/completed"
                  render={(routerProps) => (
                    <CompletedTasks
                      {...routerProps}
                      completedTasks={this.filterCompletedTasks(
                        this.props.tasks
                      )}
                      key={this.filterCompletedTasks(this.props.tasks)}
                      showComponent={this.showComponent}
                    />
                  )}
                />
                <Route
                  path="/tasks/:id/edit"
                  render={(routerProps) => {
                    const task = this.props.tasks.find((task) => {
                      return (
                        task.attributes.id ===
                        parseInt(routerProps.match.params.id)
                      );
                    });
                    return <EditTask {...routerProps} task={task} />;
                  }}
                />
              </Switch>
            </Col>
            <Col>
              <div className="col s6">
                {this.state.showComponent && (
                  <TaskInfo
                    task={this.state.task}
                    history={this.props.history}
                    showComponent={this.showComponent}
                  />
                )}
              </div>
            </Col>
          </Row>
        </Container>
        <hr />
        <TaskForm />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser,
    users: state.users,
    tasks: state.tasks,
  };
};

export default connect(mapStateToProps)(TasksContainer);
