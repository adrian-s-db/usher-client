import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import type { StackNavigationProp, StackScreenProps } from "@react-navigation/stack";

export type HomeTabParamList = {
  Home: undefined;
  Search: undefined;
  Map: undefined;
  ProfileStack: undefined;
};

export type MainStackParamList = {
  Main: undefined;
  Event: { eventId: number, todayShows: Show[] };
  Payment: { showId: string, nSeats: number };
  Confirmation: { event: string, date: string, nSeats: number };
}

export type ProfileStackParamList = {
  Profile: undefined;
  Favorites: undefined;
  Tickets: { tickets: Ticket[] };
}

export type MainStackNavType = StackNavigationProp<MainStackParamList>;
export type BottomTabScreenType = BottomTabScreenProps<HomeTabParamList>;
export type StackScreenType = StackScreenProps<ProfileStackParamList>;