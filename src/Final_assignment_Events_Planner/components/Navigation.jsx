import {
  Box,
  Flex,
  ListItem,
  Spacer,
  UnorderedList,
} from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

export const Navigation = () => {
  return (
    <>
    <Box bg="blue.200" p="2%">
      <nav>
        <Flex
          border="2px blue solid"
          borderRadius={"15px"}
          bg="antiquewhite"
          minWidth="max-content"
          alignItems="center"
          fontSize={"1.1rem"}
          fontWeight={"medium"}
        >
          <Spacer />

          <Box>
            <UnorderedList>
              <ListItem>
                <Link to="/home">Home</Link>
              </ListItem>
              <ListItem>
                <Link to="/contact">Contact</Link>
              </ListItem>
            </UnorderedList>
          </Box>
          <Spacer />
          <Box gap="2">
            <UnorderedList>
              <ListItem>
                <Link to="/">Events</Link>
              </ListItem>
              <ListItem>
                <Link to="/events/1">Event</Link>
              </ListItem>
            </UnorderedList>
          </Box>
          <Spacer />
        </Flex>
      </nav>
      </Box>
    </>
  );
};
