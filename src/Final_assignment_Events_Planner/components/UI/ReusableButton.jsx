
import { Button } from "@chakra-ui/react";

export const ReusableButton = ({ ...props }) => {
  return (
    <Button
      colorScheme="green"
      opacity={".8"}
      fontSize="1rem"
      {...props}
    />
  );
};