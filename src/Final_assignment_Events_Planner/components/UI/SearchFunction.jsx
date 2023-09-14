import { AddIcon, SearchIcon } from "@chakra-ui/icons";
import {  Flex, Heading, IconButton, Input, InputLeftElement, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { ReusableButton } from "./ReusableButton";
import { InputStyling } from "./InputStyling";

export const SearchFunction = () => {
  return (
    <>
      <Flex align="center" role="search">
      <InputStyling >
          <InputLeftElement
            pointerEvents={"none"}
            children={<SearchIcon color="gray.400" />}/>
          <Input
            id="q"
            aria-label="Search events"
            type="search"
            placeholder="Search"
            name="q"
          />
        </InputStyling>
        <Text align="end">
          <Link to="/search">
            <ReusableButton type="submit">New</ReusableButton>
          </Link>
        </Text>
      </Flex>
      
    </>
  );
};