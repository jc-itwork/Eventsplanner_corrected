import {
  Box,
  Checkbox,
  FormControl,
  FormLabel,
  Grid,
  Heading,
  Input,
  InputLeftAddon,
  Stack,
  StackItem,
  Text,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { Form, useNavigate } from "react-router-dom";

import { InputStyling } from "../components/UI/InputStyling";
import { ReusableButton } from "../components/UI/ReusableButton";
import { createEvent } from "./events";

export const NewEvent = () => {
  const [formData, setFormData] = useState({
    createdBy: null,
    title: "",
    description: "",
    image: "",
    location: "",
    date: "",
    startTime: "",
    endTime: "",
    categoryIds: [],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const [checkboxValues, setCheckboxValues] = useState({
    checkbox1: false,
    checkbox2: false,
    checkbox3: false,
  });

  const handleCheckboxChange = (checkboxName) => {
    setFormData((prevData) => ({
      ...prevData,
      categoryIds: prevData.categoryIds.includes(checkboxName)
        ? prevData.categoryIds.filter((id) => id !== checkboxName)
        : [...prevData.categoryIds, checkboxName],
    }));
  };

  const navigate = useNavigate();

  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const selectedDate = new Date(formData.date);
    const currentDate = new Date();
    if (selectedDate < currentDate) {
      toast({
        title: "Invalid Date",
        description: "Please select a future date.",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
      return;
    }
  
    // Combining the date and time values
    const formattedStartDate = new Date(
      `${formData.date} ${formData.startTime}`
    ).toISOString();
    const formattedEndDate = new Date(
      `${formData.date} ${formData.endTime}`
    ).toISOString();
  
    // Updating formData with the combined values
    const updatedFormData = {
      ...formData,
      startTime: formattedStartDate,
      endTime: formattedEndDate,
    };
    delete updatedFormData.date;
  
    // Iterating over checkboxValues to populate categoryIds
    for (const checkboxName in checkboxValues) {
      if (checkboxValues[checkboxName]) {
        const categoryId = parseInt(checkboxName.replace("checkbox", ""));
        updatedFormData.categoryIds.push(categoryId);
      }
    }
  
    try {
      await createEvent(updatedFormData);
  
      toast({
        title: "Event created.",
        description: "We've created your event for you.",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
  
      setTimeout(() => {
        navigate(-1);
      }, 2200);
    } catch (error) {
 
      console.error("Error creating event:", error);
    }
  };

  return (
    <>
      <Heading align="center" size="lg">
        New Event
      </Heading>
      <Form onSubmit={handleSubmit} align="center">
        <Grid
          templateColumns="repeat(auto-fill, minmax(220px, 1fr))"
          gap="8"
          m="4%"
        >
          <FormControl isRequired>
            <FormLabel ml="3">Title of new Event</FormLabel>
            <InputStyling>
              <Input
                h="3rem"
                maxLength={25}
                type="text"
                name="title"
                defaultValue={formData.title}
                onChange={handleInputChange}
              />
            </InputStyling>
          </FormControl>
          <FormControl>
            <FormLabel ml="3">Short description</FormLabel>
            <InputStyling>
              <Input
                placeholder="(max 50 characters)"
                h="4rem"
                maxLength={50}
                type="text"
                name="description"
                noOfLines={1}
                defaultValue={formData.description}
                onChange={handleInputChange}
              />
            </InputStyling>
          </FormControl>
          <Box>
            <FormControl isRequired>
              <FormLabel ml="3">Date of new Event</FormLabel>
              <InputStyling>
                <Input
                  type="date"
                  name="date"
                  defaultValue={formData.date}
                  onChange={handleInputChange}
                />
              </InputStyling>
            </FormControl>
            <FormControl>
              <FormLabel ml="3">Location of new Event</FormLabel>
              <InputStyling>
                <Input
                  type="text"
                  name="location"
                  defaultValue={formData.location}
                  onChange={handleInputChange}
                />
              </InputStyling>
            </FormControl>
          </Box>
          <Box>
            <FormControl>
              <FormLabel ml="3">From:</FormLabel>
              <InputStyling>
                <Input
                  type="time"
                  name="startTime"
                  defaultValue={formData.startTime}
                  onChange={handleInputChange}
                />
              </InputStyling>
            </FormControl>
            <FormControl>
              <FormLabel ml="3"> Until:</FormLabel>
              <InputStyling>
                <Input
                  type="time"
                  name="endTime"
                  defaultValue={formData.endTime}
                  onChange={handleInputChange}
                />
              </InputStyling>{" "}
            </FormControl>
          </Box>
          <FormControl isRequired>
            <FormLabel ml="3">Image link </FormLabel>
            <InputStyling>
              <InputLeftAddon children="https://" />
              <Input
                type="url"
                name="image"
                maxH="200px"
                defaultValue={formData.image}
                onChange={handleInputChange}
              />
            </InputStyling>
          </FormControl>
          <FormControl>
            <FormLabel> Categories</FormLabel>
            <Stack>
              <StackItem align="initial">
                <Checkbox
                  colorScheme="blue"
                  checked={checkboxValues.checkbox1}
                  onChange={() => handleCheckboxChange(1)}
                  mr="3"
                  mt="1"
                />
                1. sports
              </StackItem >
              <StackItem align="initial">
                <Checkbox
                  colorScheme="blue"
                  checked={checkboxValues.checkbox2}
                  onChange={() => handleCheckboxChange(2)}
                  mr="3"
                  mt="1"
                />
                2. games
              </StackItem>
              <StackItem align="initial">
                <Checkbox
                  colorScheme="blue"
                  checked={checkboxValues.checkbox3}
                  onChange={() => handleCheckboxChange(3)}
                  mr="3"
                  mt="1"
                />
                3. relaxation
              </StackItem>
            </Stack>
          </FormControl>
        </Grid>

        <Text>
          <ReusableButton type="submit">Create</ReusableButton>
          <ReusableButton
            colorScheme="gray"
            onClick={() => {
              navigate(-1);
            }}
          >
            Cancel
          </ReusableButton>
        </Text>
      </Form>
    </>
  );
};
