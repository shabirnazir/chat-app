import Alert from "react-bootstrap/Alert";

function ErrorAlert(props) {
  const { error } = props;
  return (
    <>
      <Alert key="error" variant="danger">
        {error}
      </Alert>
    </>
  );
}

export default ErrorAlert;
