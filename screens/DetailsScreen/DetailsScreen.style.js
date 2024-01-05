import { StyleSheet } from "react-native";

import { COLORS, SIZES } from "../../constants";

const styles = StyleSheet.create({

  detailsScreenContainer: {
    position: 'relative',
    flex: 1
  },
  background: {
    position: 'absolute',
    width: '100%',
    height: 300,
      
  },
  gradient: {
    width: '100%',
    height: 300
  },
  sectionHeader: {
    color: COLORS.font_color_primary,
    fontSize: SIZES.large,
    fontWeight: '600'
  },
  subSectionHeader: {
    color: COLORS.font_color_primary,
    fontSize: SIZES.medium,
    fontWeight: '600',
    marginBottom: SIZES.xxSmall
  },
  datePlatforms: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: SIZES.xxLarge,
    marginBottom: SIZES.xxLarge,
  },
  date: {
    fontWeight: '600',
    color: COLORS.font_color_primary,
    backgroundColor: COLORS.background_color_tertiary,
    paddingTop: SIZES.xxSmall,
    paddingBottom: SIZES.xxSmall,
    paddingRight: SIZES.small,
    paddingLeft: SIZES.small,
    borderRadius: SIZES.xxSmall
  },
  platformContainer:
  {
    flexDirection: 'row',
    gap: SIZES.xSmall
  },
  platformIcon:
  {
    color: '#fff',
    fontSize: SIZES.large,
  },
  nameContainer: {
    width: '100%',
    alignItems: 'center'
  },
  name: {
    width: '80%',
    textAlign: 'center',
    color: COLORS.font_color_primary,
    fontSize: 36,
    fontWeight: '700',
  },
  description: {
    color: COLORS.font_color_primary,
    lineHeight: SIZES.large,
    marginTop: SIZES.xSmall,
    marginBottom: SIZES.xSmall
  },
  readMore: {
    alignSelf: 'flex-start',
    backgroundColor: COLORS.background_color_tertiary,
    paddingTop: 4,
    paddingBottom: 4,
    paddingRight: SIZES.xxSmall,
    paddingLeft: SIZES.xxSmall,
    borderRadius: SIZES.xxSmall,
    fontWeight: '900',
  },
  infoSection: {
    marginBottom: SIZES.xxLarge,
    marginTop: SIZES.large,
    gap: SIZES.medium

  },
  infoContent: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  infoText: {
    color: COLORS.font_color_primary,
    lineHeight: SIZES.large
  },
  imageContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.935)'
  },
  enlargedPicture: {
    aspectRatio: '16/9',
    width: '90%',
    objectFit: 'cover',
    borderRadius: SIZES.large
  },
  details: {
    width: '85%',
    height: '90%',
    alignItems: 'center',
    padding: SIZES.large,
    backgroundColor: COLORS.background_color_secondary,
    borderRadius: SIZES.large
  },
  xIcon: {
    zIndex: 2,
    alignItems: 'flex-end',
    width: '100%',
    color: COLORS.font_color_primary,
    fontSize: SIZES.large
  },
  ratingBarContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    height: SIZES.xxLarge * 1.5,
    flex: 1,
    borderWidth: 3,
    borderColor: '#fff',
    backgroundColor: COLORS.background_color_secondary,
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
});

export default styles;
