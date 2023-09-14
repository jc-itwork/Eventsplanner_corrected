import React, { useState } from 'react';
import { Input, Button, HStack } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';

export const SearchBar = ({ onSearch, onClear }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    onSearch(searchQuery);
  };

  const handleClear = () => {
    setSearchQuery('');
    onClear();
  };


  return (
    <HStack mr="50px" spacing="0">
          <Button
  
            display="inline-grid"
            onClick={handleClear}
            borderRightRadius="0"
            borderLeftRadius="25px"
            color="white"
            bg="blue.300"
            cursor="pointer"
            _hover={{ transform: "scale(1.03)", bg: "blue.400" }}
          >
             Reset
          </Button>
          <Input
            placeholder="Search events..."
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            borderRadius={"none"}
            minW="300px"
            maxW="330px"
            _hover={{
              border: "2px blue solid"}}
          />
          <SearchIcon
            onClick={handleSearch}
            p="3"
            boxSize={10}
            color="gray.600"
            bg="gray.300"
            cursor="pointer"
            spacing="0"
            borderRightRadius="25px"
            _hover={{
              transform: "scale(1.1)",
              bg: "gray.400",
            }}
          />
        </HStack>
  );
};
