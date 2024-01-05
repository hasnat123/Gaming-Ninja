import { StyleSheet } from "react-native";

import { COLORS, SIZES } from "../../../../constants";

const styles = StyleSheet.create({
  subSectionHeader: {
    color: COLORS.font_color_primary,
    fontSize: SIZES.medium,
    fontWeight: '600',
    marginBottom: SIZES.xxSmall
  },
  ratingBarContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    width: '100%',
    height: SIZES.xxLarge * 2,
    borderWidth: 4,
    borderColor: '#fff',
    backgroundColor: COLORS.background_color_secondary,
    marginTop: SIZES.xSmall,
    borderRadius: SIZES.xSmall,
    overflow: 'hidden'
  },
  ratingBar: {
    position: 'absolute',
    left: 0,
    width: `100%`,
    height: '100%',
    transformOrigin: 'left top',
    // backgroundColor: averageRating >= 70 ? '#6dc849' : averageRating >= 30 && averageRating < 70 ? 'orange' : '#e32525'
    backgroundColor: COLORS.background_color_tertiary
  },
  rating: {
    color: COLORS.font_color_primary,
    fontSize: SIZES.large,
    fontWeight: '600',
    textAlign: 'center'
  },
  textRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%'
  },
  moreDetails: {
    alignSelf: 'center',
    color: COLORS.font_color_primary,
    backgroundColor: COLORS.background_color_tertiary,
    paddingTop: 3,
    paddingBottom: 3,
    paddingRight: SIZES.xxSmall * 1.5,
    paddingLeft: SIZES.xxSmall * 1.5,
    borderRadius: SIZES.xxSmall,
  },

});

export default styles;
