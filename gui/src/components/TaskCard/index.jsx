import React, {Component} from "react";
import {Card} from "react-bootstrap";
import {BsCheckLg, BsFillTrashFill, BsForward, BsPencilSquare} from "react-icons/bs";
import colors from "./colors"
import Moment from 'moment';
import 'moment/locale/es';

export default class TaskCard extends Component {

    forward = () => {
        this.props.onNext()
    }


    edit = () => {
        console.log("edit")
    }

    render() {

        const extra_style = {cursor: "pointer"}
        const display = this.props.type === "pending" ? {} : {display: "none"};
        const done = this.props.type === "processing" ? {} : {display: "none"};
        return (<Card style={{
            margin: "10px",
            display: "flex",
            flexDirection: "row",
            borderLeft: `5px solid ${colors[this.props.type]}`
        }}
                      className={this.props.className}>

            <div style={{width: "100%"}}>
                <Card.Body>
                    {this.props.description}
                </Card.Body>
                <Card.Footer style={{alignItems: "center", display: "flex"}}>
                    {Moment(this.props.date).format('d MMMM')}
                    <div style={{marginLeft: "auto", ...display}}>
                        <BsFillTrashFill className={"card-icon"} onClick={this.props.onDelete}
                                         style={extra_style}/> |{" "}
                        <BsForward className={"card-icon"} onClick={this.props.onNext} style={extra_style}/>
                    </div>
                    <div style={{marginLeft: "auto", ...done}}>
                        <BsForward className={"card-icon"} onClick={this.props.onNext} style={extra_style}/>
                    </div>
                    {
                        this.props.type === "completed" ? <div style={{marginLeft: "auto"}}>
                            <BsCheckLg/>
                        </div> : null
                    }
                </Card.Footer>
            </div>
        </Card>)
    }
}