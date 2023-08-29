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
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addProject,
  deleteProject,
  getUser,
} from "../../Redux/Actions/UserAction";
import { toast } from "react-hot-toast";

const AddProject = () => {
  const { isAuthenticated } = useSelector((state) => state.login);
  const { message, error, loading } = useSelector((state) => state.update);
  const { message: loginMessage } = useSelector((state) => state.login);
  const { user } = useSelector((state) => state.user);

  const dispatch = useDispatch();

//   console.log(user);

  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [techStack, setTechStack] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    await dispatch(addProject(title, url, image, description, techStack));
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
                  placeholder="Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  pr="4.5rem"
                  marginBottom={5}
                />
                <Input
                  type="text"
                  placeholder="Link"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  pr="4.5rem"
                  marginBottom={5}
                />
                <Input
                  type="text"
                  placeholder="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  pr="4.5rem"
                  marginBottom={5}
                />
                <Input
                  type="text"
                  placeholder="Technologies"
                  value={techStack}
                  onChange={(e) => setTechStack(e.target.value)}
                  className="adminPanelInputs"
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
          
          <Stack spacing={6} direction="row">
            {user.projects ? (
              user.projects.map((project) => (
                <ProjectCard key={project._id} project={project} />
              ))
            ) : (
              <Text>No projects available.</Text>
            )}
          </Stack>
        </>
      ) : (
        <Text
          bgGradient="linear(to-l, #7928CA, #FF0080)"
          bgClip="text"
          fontSize="6xl"
          fontWeight="extrabold"
          align="center"
        >
          Please <Link marginBottom={2} padding={4} to="/login">Login</Link> to Access this Resource
        </Text>
      )}
    </Fragment>
  );
};

export default AddProject;

const ProjectCard = ({ project }) => {
  const dispatch = useDispatch();

  const handleDeleteProject = async (id) => {
    await dispatch(deleteProject(id));
    dispatch(getUser());
  };
  return (
    <Box p={4} borderWidth={1} borderRadius="lg">
      <Image
        src={project.image.url}
        alt={project.title}
        maxWidth="100px" // Adjust the value as needed
      />
      <Text fontSize="xl" fontWeight="semibold">
        {project.title}
      </Text>
      <Text>{project.description}</Text>
      <Text>Tech Stack: {project.techStack}</Text>
      <Text>
        <a href={project.url} target="_blank" rel="noopener noreferrer">
          Project URL
        </a>
      </Text>
      <Button
        colorScheme="red"
        size="sm"
        onClick={() => handleDeleteProject(project._id)} // Call delete function here
        mt={2}
      >
        Delete
      </Button>
    </Box>
  );
};
