import { Box, Center, Heading, Image,  Text, } from "@chakra-ui/react";
import { Link } from "react-router-dom";


export const Home = () => {
  return (
    <>
      <Center bg={"blue.200"}>
        <Box align="center" flexwrap="wrap" p="20px">
          <Heading>Home</Heading>
          <Link fontSize="20px" to={`/add-event`}>
          <Heading size={"md"}>Announce your new events here!
        </Heading>
         </Link>
         <Text justify="center" fontSize={"15px"} flexWrap={"wrap"}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </Text>
          <Image align="center"
          p="1%"
            boxShadow={"md"}
            src="https://media.gettyimages.com/id/472270879/vector/childlike-depiction-of-home-buying.webp?s=1024x1024&w=gi&k=20&c=7PkMoVd2w6je5vFpuNZaNSWD2XWsNZQE56cZ1uWPfYs="
            alt="home"
            maxW="50vw"
            borderRadius="5px"
          />
          <Text justify="center" fontSize={"20px"}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </Text>
        </Box>
      </Center>
    </>
  );
};
