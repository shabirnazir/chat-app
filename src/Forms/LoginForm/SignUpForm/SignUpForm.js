import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import css from "./SignUpForm.module.css";
import NavbarContainer from "../../../Components/Navibar/NavbarContainer";
import axios from "axios";
function SignUpForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    try {
      const response = await axios.post("/user/register", data);
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
          <h1 className={css.heading}>Sign Up</h1>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3" controlId="formGroupFirstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="firstName"
                placeholder="Enter First Name"
                {...register("firstName", { required: true })}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupLastName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="lastName"
                placeholder="Enter Last Name"
                {...register("lastName", { required: true })}
              />
            </Form.Group>
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
                Sign Up
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
}

export default SignUpForm;
