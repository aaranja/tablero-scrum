import ScrumBoard from "./views/ScrumBoard";
import 'bootstrap/dist/css/bootstrap.css';
import './App.css'
import {Container, Navbar} from "react-bootstrap";


function App() {
    /* default app loaded in index, here is where ScrumBoard and navbar are displayed */
    return (<>
            <Navbar bg="light">
                <Container style={{justifyContent: "center", display: "flex"}}>
                    <Navbar.Brand>Tablero Scrum Básico</Navbar.Brand>
                </Container>
            </Navbar>
            <ScrumBoard/>
        </>
    );
}

export default App;
