import Button from "react-bootstrap/Button";
import { useAuth0 } from "@auth0/auth0-react";

function LoginButton() {
  const { loginWithRedirect } = useAuth0();
  function helper() {
    loginWithRedirect();
    // .then(props.handleGet());
  }
  return <Button onClick={() => helper()}>Login</Button>;
}

export default LoginButton;
