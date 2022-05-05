import React, {Component} from "react";
import {Alert, Col} from "react-bootstrap";
import TaskCard from "../../components/TaskCard";
import {connect} from "react-redux";
import {deleteTask, updateTask} from "../../store/actions/tableActions";
import nextStatus from "./status";

class ColTask extends Component {
    /*
    * Class to render a column which is used to list all tasks on board.
    * Must receive a title, a datasource list with all task
    * and type props to get the next status cycle
    * */

    constructor(props) {
        super(props);
        this.state = {
            alert: false,
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.status === "loading") {
            const {status} = this.props;
            if (status === "update_fail" || status === "delete_fail") {
                this.showError(true)
            }
        }
    }

    onNext = (id, next) => {
        this.props.onNext(id, next)
    }

    onDeleteTask = (id) => {
        this.props.onDeleteTask(id)
    }
    showError = (value) => {
        this.setState({alert: value})
    }

    render() {
        const next = nextStatus[this.props.type]
        return (<Col xs={6} md={4}>
            <div className={"task-header"}>
                {this.props.title}
                {/* extra components will display right on header */}
                <div style={{marginLeft: "auto"}}>
                    {this.props.extras.length > 0 ? this.props.extras.map((item) => item) : null}
                </div>
            </div>
            <div className="task-list">
                {/* rendering all tasks source on task card component*/}
                {this.props.dataSource.map((item, key) => <TaskCard
                    key={key} title={item.name}
                    className={"task-card"}
                    description={item.description}
                    type={this.props.type}
                    date={item.date_created}
                    onNext={() => this.onNext(item.id, next)}
                    onDelete={() => {
                        this.onDeleteTask(item.id)
                    }}
                />)}
            </div>
            {/* the alert will be displayed when an error is detected during save*/}
            <Alert variant="danger" onClose={() => this.showError(false)} dismissible hidden={!this.state.alert}
                   style={{position: "absolute", width: "300px", bottom: 0, right: 100}}>
                <p>
                    {this.props.error != null ? this.props.error.message : null}
                </p>
            </Alert>
        </Col>)
    }
}

ColTask.defaultProps = {
    extras: []
}

const mapStateToProps = (state) => {
    const {table} = state;
    return {
        loading: table.loading, error: table.error, status: table.status,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onNext: (id, next) => dispatch(updateTask(id, next)), onDeleteTask: (id) => dispatch(deleteTask(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ColTask)