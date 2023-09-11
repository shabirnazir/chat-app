import { React, useState } from "react";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import NavbarContainer from "../../Components/Navibar/NavbarContainer";
import css from "./LoginForm.module.css";
import axios from "axios";
import { normalizeError } from "../../Helper/util";
import ErrorAlert from "../../Components/ErrorAlert/ErrorAlert";
import LoadingIcon from "../../Components/LoadingIcon/LoadingIcon";
function LoginForm(props) {
  const { handleLogin } = props;
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
      const response = await axios.post("/user/login", data);
      const user = response.data;
      //save in local storage
      localStorage.setItem("UserInfo", JSON.stringify(user));
      setLoading(false);
      handleLogin(false);
    } catch (error) {
      setLoading(false);
      console.log("normalizeError(error)", normalizeError(error));
      setError(normalizeError(error));
    }
  };
  return (
    <>
      <div className={css.root}>
        <div className={css.container}>
          <h1 className={css.heading}>Login</h1>
          {error ? (
            <ErrorAlert error={error || "Something went wrong!"} />
          ) : null}
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
                {loading ? <LoadingIcon /> : "Login"}
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
}

export default LoginForm;
