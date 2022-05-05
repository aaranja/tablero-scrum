import React, {Component} from "react";
import {Container, Row} from "react-bootstrap";
import CreateTask from "../../containers/CreateTask";
import {connect} from "react-redux";
import {getTasks} from "../../store/actions/tableActions";
import ColTask from "../../containers/ColTask";

class ScrumBoard extends Component {
    /*
    * Class to render a scrum board that can be used to add new tasks and pass them between cycles.
    * */

    componentDidMount() {
        this.props.getTasks()
    }

    render() {
        // set loading flag to render an icon loading
        let loaded = !this.props.loading
        return (
            <Container>
                <Row>
                    <ColTask title="Tareas pendientes" dataSource={this.props.payload.pending} type="pending"
                             extras={[<CreateTask key={1}/>]}/>
                    <ColTask title="Tareas en proceso" dataSource={this.props.payload.processing} type="processing"/>
                    <ColTask title="Tareas terminadas" dataSource={this.props.payload.completed} type="completed"/>
                </Row>
                {this.props.status === "board_fail" ?
                    <div style={{display: "flex", justifyContent: "center"}}>{this.props.error.message}</div> : null}
            </Container>
        )
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
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ScrumBoard);