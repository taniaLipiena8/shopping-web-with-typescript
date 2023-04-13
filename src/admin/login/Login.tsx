import { useNavigate } from 'react-router-dom'
import {
    Formik,
    Form,
} from "formik";
import CustomInput from '../../form-templates/CustomInput';
import { Button } from 'react-bootstrap';
import { IUser } from '../../models/interfaces/UserInterfaces';
import './Login.css'
import { loginSchema } from '../../form-templates/ValidationSchema';

const Login = () => {
    const navigate = useNavigate()
    const initialValues: IUser = { username: '', password: '' }

    const onSubmit = (values: IUser, actions: { resetForm: () => void; }) => {
        localStorage.setItem('username', values.username)
        actions.resetForm()
        navigate('/admin/products', { replace: true })

    }

    return (
        <div className='form-container'>
            <Formik
                initialValues={initialValues}
                onSubmit={onSubmit}
                validationSchema={loginSchema}>
                {({ isSubmitting }) => (
                    <Form className="login-form">
                        <h1>Login</h1>
                        <CustomInput label='Username' name='username' type='text' placeholder="Enter your username" />

                        <CustomInput label='Password' name='password' type='password' placeholder="Enter your password" />

                        <Button className='login' variant='success' type='submit' disabled={isSubmitting}>Login</Button>
                    </Form>
                )}
            </Formik>
        </div>


    )
}

export default Login