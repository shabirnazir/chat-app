import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import NavbarContainer from "../../Components/Navibar/NavbarContainer";
import css from "./LoginForm.module.css";
import axios from "axios";
function LoginForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    try {
      const response = await axios.post("/user/login", data);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <NavbarContainer />
      <div className={css.root}>
        <div className={css.container}>
          <h1 className={css.heading}>Login</h1>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3" controlId="formGroupEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                {...register("email", { required: true })}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                {...register("password", { required: true })}
              />
            </Form.Group>
            <br />

            <div className="d-grid gap-2">
              <Button variant="primary" size="lg" type="submit">
                Login
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
}

export default LoginForm;
