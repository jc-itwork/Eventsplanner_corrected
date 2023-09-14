import React from "react";
import { IconButton} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { Form, useNavigate } from "react-router-dom";

export const DeleteSelectedButton = ({ onDelete }) => {
  const history = useNavigate()

  const handleDeleteSelected = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete the selected event(s)?"
    );

    if (confirmDelete) {
      await onDelete();
      history(-1);
    }
  };

  return (
    <Form
      method="post"
      onSubmit={(event) => {
        event.preventDefault();
        handleDeleteSelected();
      }}
    >
      <IconButton colorScheme="red" type="submit" icon={<DeleteIcon />}/>
    </Form>
  );
};