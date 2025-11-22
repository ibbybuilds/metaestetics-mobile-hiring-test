import { NavigatorScreenParams } from "@react-navigation/native";

export type RootStackParamList = {
  Auth: NavigatorScreenParams<AuthStackParamList>;
  Main: NavigatorScreenParams<MainStackParamList>;
};

export type AuthStackParamList = {
  Welcome: undefined;
  Login: undefined;
  Register: undefined;
};

export type MainStackParamList = {
  Profile: undefined;
  EditProfile: undefined;
  Settings: undefined;
  Clinics: undefined;
  Booking: { clinicId: string };
  TimeSlotSelection: { clinicId: string; selectedDate: string; note: string };
  MyAppointments: undefined;
};
