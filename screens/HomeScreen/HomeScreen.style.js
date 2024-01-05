import { StyleSheet } from "react-native";

import { COLORS, SIZES } from "../../constants";

const styles = StyleSheet.create({
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
  categoriesContainer: {
    flexDirection: 'row',
    gap: 10
  },
  footerContainer: {
    marginTop: 50,
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
  },
  filterMenu: (show) => ({
    position: 'absolute',
    display: show ? 'flex' : 'none',
    justifyContent: 'center',
    bottom: SIZES.large,
    left: SIZES.xxLarge,
    right: SIZES.xxLarge,
    backgroundColor: COLORS.background_color_secondary,
    borderRadius: SIZES.large,
    zIndex: 5

  }),
  filter: (filterName, filter) =>
  ({
    padding: SIZES.large,
    color: COLORS.font_color_primary,
    fontSize: SIZES.large,
    backgroundColor: filterName === filter ? COLORS.background_color_tertiary : 'transparent',
    borderTopLeftRadius: filterName === 'Top' ? SIZES.large : 0,
    borderTopRightRadius: filterName === 'Top' ? SIZES.large : 0,
    borderBottomLeftRadius: filterName === 'A - Z' ? SIZES.large : 0,
    borderBottomRightRadius: filterName === 'A - Z' ? SIZES.large : 0
  }),
  line: (filterName) => ({
    display: filterName === 'A - Z' ? 'none' : 'flex',
    width: '100%',
    height: 0.5,
    backgroundColor: '#ddd'
  }),
  overlay: (show) => ({
    position: 'absolute',
    display: show ? 'flex' : 'none',
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: '#000000',
    opacity: 0.85,
    zIndex: 1
  })
  
});

export default styles;
