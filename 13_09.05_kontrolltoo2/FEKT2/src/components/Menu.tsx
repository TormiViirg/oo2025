import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom'; // ! import
import { useTranslation } from 'react-i18next';

function Menu() {
    const { t, i18n } = useTranslation();
    // const [htmliMinevMuutuja, funktsioonMisMuudabSedaMuutujat] = useState(algväärtus);
  
    return (
        <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
        <Container>
            <Navbar.Brand as={Link} to="/">MainPage</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                    <NavDropdown title="Admin" id="collapsible-nav-dropdown">
                        <NavDropdown.Item as={Link} to="/admin/words">Manage Products</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
                
                <Nav>
                    <button onClick={() => i18n.changeLanguage("et")}>Eesti</button>
                    <button onClick={() => i18n.changeLanguage("en")}>English</button>
                    <Nav.Link as={Link} to="/login">Login</Nav.Link>
                    <Nav.Link as={Link} to="/signup">Signup</Nav.Link>
                </Nav>

                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
  
export default Menu;