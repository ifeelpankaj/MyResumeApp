import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addSkills,
  deleteSkills,
  getUser,
} from "../../Redux/Actions/UserAction";
import { toast } from "react-hot-toast";
import {
  Box,
  Button,
  Center,
  Image,
  Input,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";

const AddSkills = () => {
  const { isAuthenticated } = useSelector((state) => state.login);
  const { message, error, loading } = useSelector((state) => state.update);
  const { message: loginMessage } = useSelector((state) => state.login);
  const { user } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    await dispatch(addSkills(name, category, image));
    dispatch(getUser());
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    const Reader = new FileReader();

    Reader.readAsDataURL(file);

    Reader.onload = () => {
      if (Reader.readyState === 2) {
        setImage(Reader.result);
      }
    };
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
    if (loginMessage) {
      toast.success(loginMessage);
      dispatch({ type: "CLEAR_MESSAGE" });
    }
  }, [error, message, dispatch, loginMessage]);

  return (
    <Fragment>
      {isAuthenticated ? (
        <>
          <div className="login">
            <div className="loginContainer">
              <form onSubmit={submitHandler} className="loginForm">
                <Input
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  pr="4.5rem"
                  marginBottom={5}
                />
                <Input
                  type="text"
                  placeholder="Category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  pr="4.5rem"
                  marginBottom={5}
                />

                <Input
                  type="file"
                  onChange={handleImage}
                  accept="image/*"
                  pr="4.5rem"
                  marginBottom={5}
                />

                <Link marginBottom={2} padding={4} to="/">
                  Back
                </Link>

                <Center>
                  <Button
                    type="submit"
                    colorScheme="teal"
                    variant="outline"
                    width={100}
                    isDisabled={loading}
                    isLoading={loading}
                  >
                    Add
                  </Button>
                </Center>
              </form>
            </div>
          </div>

          <Stack spacing={6} direction="row" wrap='wrap'>
            {user.skills ? (
              user.skills.map((skill) => (
                <SkillCard key={skill._id} skill={skill} />
              ))
            ) : (
              <Text>No skills available.</Text>
            )}
          </Stack>
        </>
      ) : (
        <>
          <Text
            bgGradient="linear(to-l, #7928CA, #FF0080)"
            bgClip="text"
            fontSize="6xl"
            fontWeight="extrabold"
            align="center"
          >
            Please Login to Access this Resource
          </Text>
        </>
      )}
    </Fragment>
  );
};

export default AddSkills;

const SkillCard = ({ skill }) => {
  const dispatch = useDispatch();

  const handleDeleteProject = async (id) => {
    await dispatch(deleteSkills(id));
    dispatch(getUser());
  };
  return (
    <Box p={4} borderWidth={1} borderRadius="lg">
      <Text fontSize="xl" fontWeight="semibold">
        {skill.category}
      </Text>
      <Image
        src={skill.image.url}
        alt={skill.name}
        maxWidth="100px" // Adjust the value as needed
      />
      <Text fontSize="xl" fontWeight="semibold">
        {skill.name}
      </Text>
      <Button
        colorScheme="red"
        size="sm"
        onClick={() => handleDeleteProject(skill._id)} // Call delete function here
        mt={2}
      >
        Delete
      </Button>
    </Box>
  );
};
