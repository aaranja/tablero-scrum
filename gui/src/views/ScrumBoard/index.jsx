import React, {Component} from "react";
import {Alert, Col, Container, Row, Spinner} from "react-bootstrap";
import CreateTask from "../../containers/CreateTask";
import TaskCard from "../../components/TaskCard";
import {connect} from "react-redux";
import {deleteTask, getTasks, updateTask} from "../../store/actions/tableActions";

class ScrumBoard extends Component {
    /*
    * Class to render a scrum board that can be used to add new tasks and pass them between cycles.
    * */
    constructor(props) {
        super(props);
        this.state = {
            alert: false,
        }
    }

    componentDidMount() {
        this.props.getTasks()
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

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.status === "loading") {
            const {status} = this.props;
            if (status === "update_fail" || status === "delete_fail") {
                this.showError(true)
            }
        }
    }

    render() {
        // set loading flag to render an icon loading
        let loaded = !this.props.loading
        return (<Container>
            <Row>
                <Col xs={6} md={4}>
                    <div className={"task-header"}>
                        Tareas pendientes
                        <div style={{marginLeft: "auto"}}>
                            <CreateTask/>
                        </div>
                    </div>
                    <div className="task-list">
                        {/* Load task card list from pending list */}
                        {loaded ? this.props.payload.pending.map((item, key) => <TaskCard
                            key={key} title={item.name}
                            className={"task-card"}
                            description={item.description}
                            type={"pending"}
                            date={item.date_created}
                            onNext={() => this.onNext(item.id, "processing")}
                            onDelete={() => {
                                this.onDeleteTask(item.id)
                            }}
                        />) : <Spinner animation="border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>}
                    </div>
                </Col>
                <Col xs={6} md={4}>
                    <div className={"task-header"}>Tareas en proceso</div>
                    <div className="task-list">
                        {loaded ? this.props.payload.processing.map((item, key) => <TaskCard
                            key={key} title={item.name}
                            className={"task-card"}
                            description={item.description}
                            type={"processing"}
                            date={item.date_created}
                            onNext={() => this.onNext(item.id, "completed")}
                            onDelete={() => {
                                this.onDeleteTask(item.id)
                            }}
                        />) : <Spinner animation="border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>}
                    </div>
                </Col>
                <Col xs={6} md={4}>
                    <div className={"task-header"}>Tareas terminadas</div>
                    <div className="task-list">
                        {loaded ? this.props.payload.completed.map((item, key) => <TaskCard
                            key={key} title={item.name}
                            className={"task-card"}
                            description={item.description}
                            type={"completed"}
                            date={item.date_created}
                            onNext={() => this.onNext(item.id, "completed")}
                            onDelete={() => {
                                this.onDeleteTask(item.id)
                            }}
                        />) : <Spinner animation="border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>}</div>
                </Col>
            </Row>
            {this.props.status === "board_fail" ?
                <div style={{display: "flex", justifyContent: "center"}}>{this.props.error.message}</div> : null}
            <Alert variant="danger" onClose={() => this.showError(false)} dismissible hidden={!this.state.alert}
                   style={{position: "absolute", width: "300px", bottom: 0, right: 100}}>
                <p>
                    {this.props.error != null ? this.props.error.message : null}
                </p>
            </Alert>
        </Container>)
    }
}

const mapStateToProps = (state) => {
    const {table} = state;
    return {
        loading: table.loading, error: table.error, payload: {...table.payload}, status: table.status,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getTasks: () => dispatch(getTasks()),
        onNext: (id, next) => dispatch(updateTask(id, next)),
        onDeleteTask: (id) => dispatch(deleteTask(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ScrumBoard);