import { StyleSheet } from "react-native";

import { COLORS, SIZES, FONT } from "../../../constants";

import { Dimensions } from 'react-native'

const halfWindowsWidth = Dimensions.get('window').width / 2

const styles = StyleSheet.create({
  cardContainer:
  {
    width:  Dimensions.get('window').width * 0.9,
    height: 300,
    backgroundColor: COLORS.background_color_secondary,
    marginTop: SIZES.medium,
    marginBottom: SIZES.medium,
    borderRadius: SIZES.large,
  },

  cardImageContainer:
  {

    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    height: '60%',
    borderTopLeftRadius: SIZES.large,
    borderTopRightRadius: SIZES.large
  },

  cardImage: (image) =>
  ({
    width: image ? '100%' : '55%',
    height: '100%',
    objectFit: 'cover',
    borderTopLeftRadius: SIZES.large,
    borderTopRightRadius: SIZES.large
  }),

  textContainer:
  {
    padding: SIZES.medium,
    gap: SIZES.large,
    height: '40%'
  },

  info:
  {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  platformContainer:
  {
    flexDirection: 'row',
    gap: SIZES.xSmall
  },

  platformIcon:
  {
    color: COLORS.font_color_primary,
  },

  rating: (rating) =>
  ({
    color: rating >= 70 ? COLORS.rating_color_excellent : rating >= 30 && rating < 70 ? COLORS.rating_color_okay : COLORS.rating_color_bad,
    fontSize: 14,
    fontWeight: 700,
    paddingHorizontal: SIZES.xSmall,
    paddingVertical: 3.5,
    borderWidth: 1,
    borderColor: rating >= 70 ? COLORS.rating_color_excellent : rating >= 30 && rating < 70 ? COLORS.rating_color_okay : COLORS.rating_color_bad,
    borderRadius: 6
  }),

  name:
  {
    color: COLORS.font_color_primary,
    fontSize: SIZES.xLarge
  },


  
});

export default styles;