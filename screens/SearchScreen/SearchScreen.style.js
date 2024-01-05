import { StyleSheet } from "react-native";

import { COLORS, FONT, SIZES } from "../../constants";

const styles = StyleSheet.create({

  searchScreenContainer: {
    backgroundColor: COLORS.background_color_primary
  },

  searchInputContainer: {
    alignItems: 'center',
    width: "100%",
    height: 60,
    marginTop: SIZES.xLarge,
    marginBottom: SIZES.xLarge
  },

  searchInput: {
    width: "90%",
    height: "100%",
    paddingHorizontal: SIZES.medium,
    color: COLORS.font_color_primary,
    backgroundColor: COLORS.background_color_secondary,
    borderRadius: SIZES.xSmall
  },
  btnContainer: (margin) => ({
    width: 40,
    height: 40,
    borderRadius: SIZES.small / 1.25,
    justifyContent: "center",
    alignItems: "center",
    margin: margin
  }),
  btnImg: (dimension) => ({
    width: dimension,
    height: dimension,
    borderRadius: SIZES.small / 1.25,
  }),
  footerContainer: {
    marginTop: 50,
    marginBottom: 315,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 20
  },
  paginationButton: {
      width: 40,
      height: 40,
      borderRadius: 5,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: COLORS.background_color_tertiary
  },
  paginationImage: {
      width: '60%',
      height: '60%',
      tintColor: COLORS.background_color_secondary
  },
  paginationTextBox: {
      width: 40,
      height: 40,
      borderRadius: 2,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: COLORS.background_color_secondary
  },
  paginationText: {
      fontSize: SIZES.large,
      fontWeight: '600',
      color: COLORS.font_color_primary
  }
});

export default styles;
