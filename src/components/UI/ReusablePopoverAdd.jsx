import React from "react";
import {
  Popover,
  PopoverTrigger,
  IconButton,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";

export const ReusablePopoverAdd = ({ linkTo, headerText, bodyText }) => {
  return (
    <Popover>
      <PopoverTrigger>
        <IconButton colorScheme="green" opacity={".8"} icon={<AddIcon />} />
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton fontWeight="900" bg="gray" color="white" />
        <PopoverHeader
          fontWeight="600"
          align="initial"
          _hover={{
            bgColor: "gray.100",
          }}
        >
          {headerText}
        </PopoverHeader>
        <Link to={linkTo}>
          <PopoverBody
            fontWeight="600"
            align="initial"
            bg="green.10"
            transition="transform 0.2s ease-in-out"
            _hover={{
              borderBottom: "8px solid white",
              bgColor: "gray.100",
            }}
          >
            {bodyText}
          </PopoverBody>
        </Link>
      </PopoverContent>
    </Popover>
  );
};
