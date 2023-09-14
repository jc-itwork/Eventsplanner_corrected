import { Box, Button, Heading, Text } from "@chakra-ui/react";
import { useNavigate, useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  const navigate = useNavigate();
  console.error(error);

  return (
    <Box align="center" justify="center" mt="10vh">
      <Heading>Error</Heading>
      <Text m="5vh" fontSize={"1.5em"}>
        Sorry, an unexpected error has occurred.
      </Text>
      <Text color="GrayText" fontStyle="italic" fontWeight="700">
        {error.statusText || error.message}
      </Text>
      <Text justify="center">
        <Button
          m="10"
          onClick={() => {
            navigate(-1);
          }}
        >
          Back
        </Button>
      </Text>
    </Box>
  );
}
