import React from "react";
import { Menu, MenuButton, MenuList, MenuItem, IconButton } from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";

export const SortMenu = ({ onSort }) => {
  const handleSort = (option) => {
    onSort(option);
  };

  return (
    <Menu>
      <MenuButton as={IconButton} icon={<HamburgerIcon />} variant="outline" />
      <MenuList>
        <MenuItem fontStyle="italic" fontWeight="600" onClick={() => handleSort("title")}>
          Sort by Title
        </MenuItem>
        <MenuItem fontStyle="italic" fontWeight="600" onClick={() => handleSort("date")}>
          Sort by Date
        </MenuItem>
        <MenuItem fontStyle="italic" fontWeight="600" onClick={() => handleSort("categories")}>
          Sort by Categories
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

