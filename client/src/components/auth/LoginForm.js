import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { Link } from 'react-router-dom'
import { useState, useContext } from 'react'
import { AuthContext } from '../../contexts/AuthContexts'
import AlertMessage from '../layout/AlertMessage'

const LoginForm = () => {
    const { loginUser } = useContext(AuthContext)
    const [loginForm, setLoginForm] = useState({
        username: '',
        password: ''
    })
    const [alert, setAlert] = useState(null)
    const { username, password } = loginForm
    const onChangeLoginForm = event => setLoginForm({
        ...loginForm, [event.target.name]: event.target.value
    })
    const login = async event => {
        event.preventDefault()
        try {
            const loginData = await loginUser(loginForm)
            if (!loginData.success) {
                setAlert({ type: 'danger', message: loginData.message })
                setTimeout(() => setAlert(null), 3000)
                // console.log(loginData)
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            <Form className='my-4' onSubmit={login}>
                <AlertMessage info={alert} />
                <Form.Group className="mb-4" controlId="formUsername">
                    <Form.Control type="text" name='username' placeholder="Username" required value={username} onChange={onChangeLoginForm} />
                </Form.Group>
                <Form.Group className="mb-4" controlId="formPassword">
                    <Form.Control type="password" name='password' placeholder="Password" required value={password} onChange={onChangeLoginForm} />
                </Form.Group>
                <Button className="mb-4" variant="success" type="submit">
                    Login
                </Button>
            </Form>
            <p>Don't have an account?
                <Link to='/register'>
                    <Button variant='info' size='sm' className='ml-2'>Register</Button>
                </Link>
            </p>
        </>
    )
}

export default LoginForm
