import * as React from "react";
import { useContext, useCallback } from "react";
import { Center, Spinner, Text, useSafeArea } from "native-base";

import { useFocusEffect } from "@react-navigation/native";
import { EventsContext } from "../../services/contexts/EventsContext";
import { getRandomTopEvents } from "../../utils/helpers/home";
import HighlightsCarrousel from "./HighlightsCarrousel";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Highlights = () => {
  const { top } = useSafeAreaInsets();
  const { events } = useContext(EventsContext);

  const [topEvents, setTopEvents] = React.useState<EventType[] | null>(null);

  useFocusEffect(
    useCallback(() => {
      if (events) {
        setTopEvents(getRandomTopEvents(events));
      }
    }, [events])
  );

  const safeAreaProps = useSafeArea({
    safeAreaTop: true,
    pt: 2,
  });

  if (!topEvents) return <Spinner color="primary.500" />;
  return (
    <Center h={"370"} w={"full"} {...safeAreaProps} mb={`${-top + 10}px`}>
      <HighlightsCarrousel topEvents={topEvents} />
    </Center>
  );
};

export default Highlights;
