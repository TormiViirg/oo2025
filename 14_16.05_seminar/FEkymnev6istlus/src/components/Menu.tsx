import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom'; // ! import
import { useTranslation } from 'react-i18next';

function Menu() {
    const { t, i18n } = useTranslation();
  
    return (
        <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand as={Link} to="/">{t('nav.overview')}</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">

                <Nav className="me-auto">
                    <Nav.Link as={Link} to="/map">{t('nav.map')}</Nav.Link>

                    <NavDropdown title="Admin" id="collapsible-nav-dropdown">
                        <NavDropdown.Item as={Link} to="/admin/addAthlete">{t('admin-nav.athletes')}</NavDropdown.Item>
                    </NavDropdown>
                </Nav>

                <Nav>
                    <button onClick={() => i18n.changeLanguage("et")}>Eesti</button>
                    <button onClick={() => i18n.changeLanguage("en")}>English</button>
                </Nav>

                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
  
export default Menu;