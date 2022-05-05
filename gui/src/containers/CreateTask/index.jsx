import React, {Component} from "react";
import {Alert, Button, Form, Modal, ModalBody, Spinner} from "react-bootstrap";
import {connect} from "react-redux";
import {createTask} from "../../store/actions/tableActions";

class CreateTask extends Component {

    constructor(props) {
        super(props);
        this.state = {
            show: false,
        }
    }

    showModal = () => {
        this.setState({
            show: true,
        })
    }

    hideModal = () => {
        this.setState({
            show: false,
        })
    }

    onFormSubmit = e => {
        e.preventDefault()
        let values = {}
        values['description'] = e.target.taskDescription.value;
        this.props.createTask(values);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.status === "loading") {
            const {status} = this.props;
            if (status === "created") {
                this.setState({
                    show: false,
                })
            } else {
                if (status === "error") {
                    console.log("error creando")
                }
            }
        }

    }

    render() {
        let enableSave = this.props.status === "loading"
        return (<>
            <Button variant="primary" onClick={this.showModal}>
                Agregar
            </Button>
            <Modal
                show={this.state.show}
                onHide={() => {
                    console.log("cerrado")
                }}
                backdrop="static"
                keyboard={false}>
                <Modal.Header>
                    <Modal.Title>Crear tarea</Modal.Title>
                </Modal.Header>
                <ModalBody>
                    <Form id="task-form" onSubmit={this.onFormSubmit}>
                        <Form.Group className="mb-3" controlId="taskDescription" name="taskDescription">
                            <Form.Label>Descripción</Form.Label>
                            <Form.Control type="text" as="textarea"
                                          placeholder="Introduce la descripción de la tarea" required/>
                        </Form.Group>
                    </Form>
                    {this.props.status === "create_fail" ?
                        <Alert variant={"danger"}>{this.props.error.message}</Alert> : null}
                </ModalBody>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.hideModal}>Cerrar</Button>
                    <Button variant="primary" type="submit" form="task-form" disabled={enableSave}>
                        <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                            hidden={!enableSave}
                        />
                        Guardar</Button>
                </Modal.Footer>
            </Modal>
        </>)
    }
}

const mapStateToProps = (state) => {

    const {table} = state;
    console.log("create", table.error)

    return {
        error: table.error,
        status: table.status
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createTask: (data) => dispatch(createTask(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateTask);