import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { Link } from 'react-router-dom'
import { useContext, useState } from 'react'
import { AuthContext } from '../../contexts/AuthContexts'
import AlertMessage from '../layout/AlertMessage'

const RegisterForm = () => {
    const { registerUser } = useContext(AuthContext)
    const [registerForm, setRegisterForm] = useState({
        username: '',
        password: '',
        confirmPassword: ''
    })
    const [alert, setAlert] = useState(null)
    const { username, password, confirmPassword } = registerForm
    const onChangeRegisterForm = event => setRegisterForm({
        ...registerForm, [event.target.name]: event.target.value
    })
    const register = async event => {
        event.preventDefault()
        try {
            if (password !== confirmPassword) {
                setAlert({ type: 'danger', message: 'Password do not match' })
                setTimeout(() => setAlert(null), 3000)
                return
            }
            const registerData = await registerUser(registerForm)
            if (!registerData.success) {
                setAlert({ type: 'danger', message: registerData.message })
                setTimeout(() => setAlert(null), 3000)
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            <Form className='my-4' onSubmit={register}>
                <AlertMessage info={alert} />
                <Form.Group className="mb-4" controlId="formUsername">
                    <Form.Control type="text" name='username' value={username} onChange={onChangeRegisterForm} placeholder="Username" required />
                </Form.Group>
                <Form.Group className="mb-4" controlId="formPassword">
                    <Form.Control type="password" name='password' value={password} onChange={onChangeRegisterForm} placeholder="Password" required />
                </Form.Group>
                <Form.Group className="mb-4" controlId="formConfirmPassword">
                    <Form.Control type="password" name='confirmPassword' value={confirmPassword} onChange={onChangeRegisterForm} placeholder="Confirm Password" required />
                </Form.Group>
                <Button className="mb-4" variant="success" type="submit">
                    Register
                </Button>
            </Form>
            <p>Already have an account?
                <Link to='/login'>
                    <Button variant='primary' size='sm' className='ml-2'>Login</Button>
                </Link>
            </p>
        </>
    )
}

export default RegisterForm
