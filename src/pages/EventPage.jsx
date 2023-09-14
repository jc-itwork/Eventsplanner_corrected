import React, { useState } from "react";
import {
  Heading,
  Image,
  Text,
  Box,
  Flex,
  Spacer,
  HStack,
  IconButton,
  VStack,
  useToast,
  Button,
  Textarea,
  Input,
} from "@chakra-ui/react";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import {
  ArrowBackIcon,
  ArrowForwardIcon,
  EditIcon,
  RepeatIcon,
} from "@chakra-ui/icons";
import { formatDate, formatTimeRange } from "../utils/dateTimesFormatting";
import { DeleteSelectedButton } from "../components/UI/DeleteSelectedButton";
import { deleteEvent, updateEvent } from "./events";

export const EventPage = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const { events, users, categories } = useLoaderData();
  const event = events.find((e) => e.id === parseInt(eventId));

  const initialEventIndex = events.findIndex((e) => e.id === parseInt(eventId));

  const [currentEventIndex, setCurrentEventIndex] = useState(initialEventIndex);

  const [editMode, setEditMode] = useState(false);

  const [formData, setFormData] = useState({
    title: event.title,
    description: event.description,
    location: event.location,
    date: event.date,
  });

  if (!event) {
    return <Text>Event not found.</Text>;
  }

  const toast = useToast();
  const creator = users.find((user) => user.id === event.createdBy);
  const eventCategories = event.categoryIds.map((categoryId) =>
    categories.find((category) => category.id === categoryId)
  );

  const handleRefresh = () => {
    window.location.reload();
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this event?"
    );

    if (confirmDelete) {
      const nextEventIndex = (currentEventIndex + 1) % events.length;
      const nextEventId = events[nextEventIndex].id;
      await deleteEvent(event.id);

      navigate(`/events/${nextEventId}`);
    }
  };
  const handleEditFormSubmit = () => {
    updateEvent(event.id, {
      ...event,
      ...formData,
    })
      .then((updatedEvent) => {
        console.log("Updated event:", updatedEvent);

        setEditMode(false);
        toast({
          title: "Event Updated",
          description: "Please refresh this page.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      })
      .catch((error) => {
        console.error(error);
        toast({
          title: "An error occurred",
          description: "Failed to update the event.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      });
  };

  return (
    <>
      <Heading align="center" m="5" size="lg">
        Events
      </Heading>

      <Box align="center" lineHeight="2.5em" mb="40px">
        <HStack mb="50px" spacing="10px">
          <Spacer />
          <IconButton
            colorScheme="green"
            fontWeight="bold"
            aria-label="back"
            icon={<ArrowBackIcon />}
            onClick={() => {
              navigate(-1);
            }}
          />
          <Spacer />
          <IconButton
            bg="gray"
            color="white"
            opacity=".6"
            fontWeight="bold"
            fontStyle="italic"
            aria-label="refresh"
            icon={<RepeatIcon />}
            onClick={handleRefresh}
          />
          {editMode ? (
            <HStack position={"absolute"} bottom={"-18px"} right={"20px"}>
              <Button
                colorScheme="green"
                opacity=".5"
                fontWeight="bold"
                fontStyle={"italic"}
                aria-label="save"
                icon={<EditIcon />}
                onClick={handleEditFormSubmit}
              >
                Save
              </Button>
              <Button
                colorScheme="gray"
                opacity=".5"
                fontWeight="bold"
                fontStyle={"italic"}
                aria-label="cancel"
                icon={<EditIcon />}
                onClick={() => setEditMode(false)}
              >
                Cancel
              </Button>
            </HStack>
          ) : (
            <IconButton
              colorScheme="blue"
              opacity=".8"
              fontWeight="bold"
              aria-label="edit"
              icon={<EditIcon />}
              onClick={() => setEditMode(true)}
            >
              Edit
            </IconButton>
          )}
          <DeleteSelectedButton onDelete={handleDelete} />

          <Spacer />
          <IconButton
            colorScheme="green"
            fontWeight="bold"
            aria-label="forward"
            icon={<ArrowForwardIcon />}
            onClick={() => {
              const nextEventIndex = (currentEventIndex + 1) % events.length;
              setCurrentEventIndex(nextEventIndex);
              navigate(`/events/${events[nextEventIndex].id}`);
            }}
          />
          <Spacer />
        </HStack>
        <Image
          boxShadow={"md"}
          src={event.image}
          alt={event.title}
          maxW="50vw"
          borderRadius="5px"
        />
        <Heading mt="5" size="md">
          {editMode ? (
            <Input
              fontWeight={700}
              maxW="15rem"
              h="3rem"
              maxLength={25}
              type="text"
              name="title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />
          ) : (
            event.title
          )}
        </Heading>
        <Text fontSize={["1.1rem", "1.2rem", "1.3rem"]}>
          {editMode ? (
            <Textarea
              fontSize={"19px"}
              h="1rem"
              maxW="15rem"
              maxLength={50}
              type="text"
              name="description"
              noOfLines={1}
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
          ) : (
            event.description
          )}
        </Text>

        <Flex flexDirection="column" align="center">
          <Text>
            <strong>Date: </strong>
            {formatDate(event.startTime)}
          </Text>

          <Text>
            <strong>Time: </strong>
            {formatTimeRange(event.startTime, event.endTime)}
          </Text>
          {editMode ? (
            <Input
              maxW="20rem"
              h="3rem"
              type="text"
              name="location"
              value={formData.location}
              onChange={(e) =>
                setFormData({ ...formData, location: e.target.value })
              }
            />
          ) : (
            <Text>
              <strong>Place: </strong> {event.location}
            </Text>
          )}
          <Text>
            <strong>Categories:</strong>{" "}
            {eventCategories.map((category) => category.name).join(", ")}
          </Text>
          <VStack align="center">
            <Text>
              <strong>Created by: </strong>
              {creator ? creator.name : "online user"}
            </Text>
            {creator && creator.image && (
              <Image
                src={creator.image}
                alt={creator.name}
                w="12vw"
                borderRadius="50%"
              />
            )}
          </VStack>
        </Flex>
      </Box>
    </>
  );
};
