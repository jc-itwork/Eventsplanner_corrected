// SearchForm.jsx
import React, { useState } from "react";
import { Form, useNavigate } from "react-router-dom";
import {
  Input,
  InputLeftElement,
  Text,
  Heading,
} from "@chakra-ui/react";
import { ReusableButton } from "./ReusableButton";
import { InputStyling } from "./InputStyling";
import { SearchIcon } from "@chakra-ui/icons";

export const SearchForm = () => {
  const history = useNavigate();
  const [searchQuery, setSearchQuery] = useState({ title: '',
  description: '',});

  const handleSubmit = (event) => {
    event.preventDefault();
    history.push(`/search?q=${searchQuery}`);
  };

  return (
    <>
      <Form role="search" onSubmit={handleSubmit}>
        <InputStyling>
          <InputLeftElement
            pointerEvents={"none"}
            children={<SearchIcon color="gray.400" />}
          />
          <Input
            type="search"
            placeholder="Search"
            aria-label="Search events"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
          
          />
        </InputStyling>
        <Text align="end">
          <ReusableButton type="submit">New</ReusableButton>
        </Text>
      </Form>
      <Heading size={["md", "s"]} m={["4", "2"]}>
        Selected Events
      </Heading>
    </>
  );
};
