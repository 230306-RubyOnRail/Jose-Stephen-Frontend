import {Container, Navbar} from "react-bootstrap";
import {Link} from "react-router-dom";

export default function NavbarComponent() {

    return (
        <>
            <Navbar>
                <Container fluid>
                    <Link to={'/test'}>
                        <Navbar.Brand>Just testing...</Navbar.Brand>
                    </Link>
                </Container>
            </Navbar>
        </>
    )
}