import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import learnItLogo from '../../assets/logo.svg'
import logoutIcon from '../../assets/logout.svg'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthContexts'
import { useContext } from 'react'
import Container from 'react-bootstrap/Container'
// import Container from 'react-bootstrap/Container'
const NavbarMenu = () => {
    const {
        authState: {
            user: { username }
        },
        logoutUser
    } = useContext(AuthContext)
    const logout = () => { logoutUser() }
    return (
        <Navbar expand='lg' bg='primary' variant='dark' className='shadow'>
            <Container>
                <Navbar.Brand className='font-weight-bolder text-white'>
                    <img
                        src={learnItLogo}
                        alt='logo'
                        width='32'
                        height='32'
                        className='mr-2'
                    />
                    Learn01
                </Navbar.Brand>
                <Navbar.Toggle aria-controls='basic-navbar-nav' />
                <Navbar.Collapse id='basic-navbar-nav'>
                    <Nav className='me-auto'>
                        <Nav.Link className='font=weight=bolder text-white' to='/dashboard' as={Link}>
                            Dashboard
                        </Nav.Link>
                        <Nav.Link className='font=weight=bolder text-white' to='/about' as={Link}>
                            About
                        </Nav.Link>
                    </Nav>
                    <Nav>
                        <Nav.Link className='font-weight-bolder text-white' disable>
                            Welcome {username}
                        </Nav.Link>
                        <Button variant='outline-warning' className='font-weight-bolder text-white' onClick={logout}>
                            <img src={logoutIcon} alt='logoutIcon' width='32' height='32' className='mr-2' />
                            Logout
                        </Button>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavbarMenu
