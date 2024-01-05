import { StyleSheet } from "react-native";

import { COLORS, SIZES } from "../../../constants";

const styles = StyleSheet.create({
  btn: (text, genre) =>
  ({
    backgroundColor: text === genre ? COLORS.background_color_tertiary : COLORS.background_color_secondary,
    paddingHorizontal: SIZES.xSmall,
    paddingVertical: 5,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: SIZES.xxSmall
  }),
  text: {
    color: COLORS.font_color_primary,
    textTransform: 'capitalize'
  },
  dropdown: {
    color: COLORS.font_color_primary
  }
});

export default styles;
