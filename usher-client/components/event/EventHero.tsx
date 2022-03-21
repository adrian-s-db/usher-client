import {
  Center,
  HStack,
  Image,
  Box,
  Heading,
  VStack,
  Text,
  Badge,
  Flex,
  useToken,
} from "native-base";
import * as React from "react";
import { capitalizeName, todayDates } from "../../utils/helpers/home";
import { Rating } from "react-native-ratings";

type Props = {
  event: EventType;
};
const EventHero = ({ event }: Props) => {
  const [light50, secondary200, secondary500] = useToken("colors", [
    "light.50",
    "secondary.200",
    "secondary.500",
  ]);
  return (
    <Center w={"full"} h={"200"} bg={"light.50"} roundedTop={40}>
      <HStack space="3" alignItems="center" h={"100%"}>
        <Center w={"30%"} h={"100%"}>
          <Box shadow={3}>
            <Image
              src={event.poster}
              alt="Main event image"
              w="98px"
              h="140px"
              resizeMode="cover"
              rounded={7}
            />
          </Box>
        </Center>
        <Flex
          h={"140px"}
          w={"60%"}
          space={"xs"}
          justifyContent={"space-around"}
        >
          <Heading size="sm" color={"dark.50"}>
            {capitalizeName(event)}
          </Heading>
          <Text color={"dark.300"}>{event.venue.name}</Text>
          {event.today_shows ? (
            <Badge w={"80%"} color={"dark.500"}>
              {todayDates(event)?.join("  |  ")}
            </Badge>
          ) : null}
          <Rating
            type="custom"
            ratingCount={5}
            startingValue={4}
            jumpValue={1}
            ratingImage={require("./../../assets/ticketRating.png")}
            imageSize={25}
            ratingColor={secondary500}
            tintColor={light50}
            ratingBackgroundColor={secondary200}
            onFinishRating={() => {}}
            style={{ marginVertical: 5, alignItems: "flex-start" }}
          />
        </Flex>
      </HStack>
    </Center>
  );
};

export default EventHero;