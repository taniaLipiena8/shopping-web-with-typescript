import { useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import CustomInput from "../../form-templates/CustomInput";
import { Button } from "react-bootstrap";
import { IUserLogin } from "../../models/interfaces/UserInterfaces";
import "./Login.css";
import { loginSchema } from "../../form-templates/ValidationSchema";
import { loginUser } from "../../services/UserServices";

const Login = () => {
  const navigate = useNavigate();
  const initialValues: IUserLogin = { email: "", password: "" };

  const onSubmit = async (
    values: IUserLogin,
    actions: { resetForm: () => void }
  ) => {
    try {
      const { username } = await loginUser(values);
      localStorage.setItem("username", username);
      navigate("/admin/products", { replace: true });
    } catch (error) {
      alert(error);
    } finally{
      actions.resetForm()
    }
  };

  return (
    <div className="form-container">
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={loginSchema}
      >
        {({ isSubmitting }) => (
          <Form className="login-form">
            <h1>Login</h1>
            <CustomInput
              label="Email"
              name="email"
              type="text"
              placeholder="Enter your email"
            />

            <CustomInput
              label="Password"
              name="password"
              type="password"
              placeholder="Enter your password"
            />

            <Button
              className="login"
              variant="success"
              type="submit"
              disabled={isSubmitting}
            >
              Login
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
