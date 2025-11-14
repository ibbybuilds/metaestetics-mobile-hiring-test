import { colors } from "@theme/colors";
import { spacing } from "@theme/spacing";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  touchable: {
    width: "100%",
  },
  icon: {
    fontSize: 20,
    marginTop: 5,
  },
  errorText: {
    color: colors.error,
    fontSize: 12,
  },
});
