import { useState } from "react";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import css from "./SignUpForm.module.css";
import axios from "axios";
import LoadingIcon from "../../../Components/LoadingIcon/LoadingIcon";
import { normalizeError } from "../../../Helper/util";
import ErrorAlert from "../../../Components/ErrorAlert/ErrorAlert";
function SignUpForm(props) {
  const { handleSignup } = props;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const response = await axios.post("/user/register", data);
      const user = response.data;
      //save in local storage
      localStorage.setItem("UserInfo", JSON.stringify(user));
      setLoading(false);
      handleSignup(false);
    } catch (error) {
      setLoading(false);

      setError(normalizeError(error));
    }
  };
  return (
    <>
      <div className={css.root}>
        <div className={css.container}>
          <h1 className={css.heading}>Sign Up</h1>
          {error ? (
            <ErrorAlert error={error || "Something went wrong!"} />
          ) : null}
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
                {loading ? <LoadingIcon /> : "Sign Up"}
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
}

export default SignUpForm;
