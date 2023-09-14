import { ExternalLinkIcon } from "@chakra-ui/icons";
import {
  Box,
  Center,
  Heading,
  Image,
  Link,
  Text,
  VStack,
} from "@chakra-ui/react";

export const ContactUs = () => {
  return (
    <>
      <Center border={"2px solid orange"} m="8%" bg="antiquewhite">
        <VStack lineHeight={"2"}>
          <Heading align="center" size="lg">
            Our contact details
          </Heading>
          <Text>
            <strong> Otto Eventos </strong>
          </Text>
          <Text> 10, Evenements Street</Text>
          <Text> Planning Town BA1234 QW</Text>
          <Text> Suggestiveshire, Meghanland</Text>
          <Text>
            <strong>For inquiries: </strong>
            <Link isExternal href="mailto:OttoEventos@Eventsevents.com">
              OttoEventos@Eventsevents.com <ExternalLinkIcon />
            </Link>
          </Text>
        </VStack>
      </Center>
      <Box align={"center"} p="3%" maxH="30vh">
        <Image
          p="5%"
          src="https://consumerist.com/consumermediallc.files.wordpress.com/2014/12/cat_iphone.jpg"
        />
      </Box>
    </>
  );
};
