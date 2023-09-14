
import React, { useState } from "react";
import {
  Grid,
  VStack,
  HStack,
  Flex,
  Spacer,
  Checkbox,
  Tooltip,
  FormLabel,
} from "@chakra-ui/react";
import { Box, Heading, Image, Text } from "@chakra-ui/react";
import { Link, useLoaderData } from "react-router-dom";
import { SearchBar } from "../components/UI/SearchBar";
import { ReusablePopoverAdd } from "../components/UI/ReusablePopoverAdd";
import { DeleteSelectedButton } from "../components/UI/DeleteSelectedButton";
import { formatDate, formatTimeRange } from "../utils/dateTimesFormatting";
import {SortMenu} from "../components/UI/SortMenu";
import { deleteEvent, getEvents } from "./events";

import { matchSorter } from "match-sorter";
import sortBy from "sort-by";

export const EventsPage = () => {
  const { events, categories } = useLoaderData();
  const [searchResults, setSearchResults] = useState(events);
  const [selectedItems, setSelectedItems] = useState([]);

  const handleSearch = async (searchQuery) => {
    try {
      const events = await getEvents(); 
      const filteredEvents = matchSorter(events, searchQuery, {
        keys: ["title"],
        threshold: matchSorter.rankings.CONTAINS,
        baseSort: (a, b) =>
          a.toLowerCase().indexOf(searchQuery.toLowerCase()) -
          b.toLowerCase().indexOf(searchQuery.toLowerCase()),
      });
      setSearchResults(filteredEvents);
    } catch (error) {
      console.error("Error searching events:", error);
    }
  };

  const handleClear = () => {
    setSearchResults(events);
  };

  const toggleSelect = (eventId) => {
    setSelectedItems((prevSelectedItems) => {
      if (prevSelectedItems.includes(eventId)) {
        return prevSelectedItems.filter((id) => id !== eventId);
      } else {
        return [...prevSelectedItems, eventId];
      }
    });
  };

  const handleDeleteSelected = async () => {
    try {
      await Promise.all(
        selectedItems.map(async (eventId) => {
          await deleteEvent(eventId);
        })
      );
      setSearchResults(
        searchResults.filter((event) => !selectedItems.includes(event.id))
      );
      setSelectedItems([]);
    } catch (error) {
      console.error("Error deleting events:", error);
    }
  };

  const getCategoryNames = (categoryIds) => {
    const names = categoryIds.map((categoryId) => {
      const category = categories.find((cat) => cat.id === categoryId);
      return category ? category.name : "";
    });
    return names.join(", ");
  };

  const handleSort = async (option) => {
    try {
      const events = await getEvents();
      let sortedResults;

      if (option === "title") {
        sortedResults = events.sort(sortBy("title"));
      } else if (option === "date") {
        sortedResults = events.sort(sortBy("startTime"));
      } else if (option === "categories") {
        sortedResults = events.sort(sortBy("categoryIds"));
      }

      setSearchResults(sortedResults);
    } catch (error) {
      console.error("Error sorting events:", error);
    }
  };

  return (
    <>
      <Heading align="center">List of events</Heading>
      <Flex
        flexWrap={"wrap"}
        justify="center"
        size="sm"
        fontStyle="italic"
        fontWeight="semibold"
        m="25"
        gap={"3"}
      >
        <Spacer />
        <SearchBar onSearch={handleSearch} onClear={handleClear} />
        <Spacer />
        <HStack mr="3%">
          <SortMenu onSort={handleSort} />
          <ReusablePopoverAdd
            linkTo="/add-event"
            headerText="Cancel"
            bodyText="Click to Add Event"
          />
          <DeleteSelectedButton onDelete={handleDeleteSelected} />
        </HStack>
      </Flex>

      <Grid
        templateColumns="repeat(auto-fill, minmax(240px, 1fr))"
        flexWrap={"wrap"}
        paddingLeft={"12"}
        gridRowGap={"10"}
        mb={"10"}
      >
        {searchResults.map((event) => (
          <Box
            flexWrap="wrap"
            flexDir={["column", "row"]}
            minH={["360px", "330px"]}
            w={["full", "85%"]}
            key={event.id}
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            bg={"blue.100"}
            position="relative"
            transition="opacity 0.3s, transform 0.3s"
            _hover={{
              transform: "scale(1.02)",
              border: "2px solid blue",
              bg: "lightblue",
              opacity: ".7",
            }}
          >
            <Link to={`/events/${event.id}`}>
              <Image
                bg={"blue.700"}
                borderTopRightRadius={"lg"}
                borderTopLeftRadius={"lg"}
                border="2px white solid"
                src={event.image}
                alt={event.title}
                h={["55%", "55%", "45%"]}
                w="100%"
              />
              <Box align="center" mb="2">
                <Heading lineHeight={"7"} size="sm"> {event.title}</Heading>
                <Text lineHeight={"6"}>{event.description}</Text>
              </Box>
              <VStack pl="4" pr="2" align={"-moz-initial"} lineHeight={"1"}>
                <Text>
                  <strong>Date: </strong>
                  {formatDate(event.startTime)}
                </Text>
                <Text>
                  <strong>Time: </strong>
                  {formatTimeRange(event.startTime, event.endTime)}
                </Text>
                <Text lineHeight={"6"}>
                  <strong>Categories: </strong>
                  {getCategoryNames(event.categoryIds)}
                </Text>
              </VStack>
            </Link>
            <Tooltip
              hasArrow
              label="Check on box for deletion"
              placement="right-start"
              bg="red.500"
            >
              <Checkbox
                isChecked={selectedItems.includes(event.id)}
                onChange={() => toggleSelect(event.id)}
                border={".1px solid blue"}
                size="lg"
                position="absolute"
                m="4"
                top="1"
                right="1"
                opacity="0.6"
                _hover={{ bg: "blue" }}
                _checked={{ opacity: "1" }}
              />
            </Tooltip>
          </Box>
        ))}
      </Grid>
    </>
  );
};

