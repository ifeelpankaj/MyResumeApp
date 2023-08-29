import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../Redux/Actions/UserAction";
import { toast } from "react-hot-toast";
import {
  Button,
  Input,
  InputGroup,
  InputRightElement,
  Text,
} from "@chakra-ui/react";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.login);

  const { loading, message, error } = useSelector((state) => state.login);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: "CLEAR_ERRORS" });
    }
    if (message) {
      toast.success(message);
      dispatch({ type: "CLEAR_MESSAGE" });
    }
  }, [error, message, dispatch]);

  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  return (
    <Fragment>
      {isAuthenticated ? (
        <Text
          bgGradient="linear(to-l, #7928CA, #FF0080)"
          bgClip="text"
          fontSize="6xl"
          fontWeight="extrabold"
          align='center'
        >
          Already Loged In
        </Text>
      ) : (
        <div className="login">
          <div className="loginContainer">
            <form className="loginForm" onSubmit={submitHandler}>
              <Text
                bgGradient="linear(to-l, #7928CA, #FF0080)"
                bgClip="text"
                fontSize="6xl"
                fontWeight="extrabold"
              >
                ADMIN PANNEL
              </Text>

              <div>
                <InputGroup size="md">
                  <Input
                    pr="4.5rem"
                    // type={show ? "text" : "password"}
                    placeholder="Admin Email"
                    type="email"
                    value={email}
                    required
                    onChange={(e) => setEmail(e.target.value)}
                    variant="filled"
                    marginBottom={4}
                  />
                </InputGroup>

                <InputGroup size="md">
                  <Input
                    pr="4.5rem"
                    type={show ? "text" : "password"}
                    placeholder="Admin Password"
                    value={password}
                    required
                    onChange={(e) => setPassword(e.target.value)}
                    variant="filled"
                    marginBottom={4}
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleClick}>
                      {show ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>

                <Button
                  type="submit"
                  variant="outline"
                  colorScheme="teal"
                  isDisabled={loading}
                  isLoading={loading}
                  width={595}
                >
                  Login
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default AdminLogin;
