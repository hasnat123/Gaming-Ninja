import { StyleSheet } from "react-native";

import { COLORS, SIZES } from "../../../../constants";

const styles = StyleSheet.create({

  sectionHeader: {
    color: COLORS.font_color_primary,
    fontSize: SIZES.large,
    fontWeight: '600'
  },
  gamesContainer: {
    alignItems: 'center',
    marginTop: SIZES.xLarge
  }

});

export default styles;
