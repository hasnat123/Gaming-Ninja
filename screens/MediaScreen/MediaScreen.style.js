import { StyleSheet, Dimensions } from "react-native";
import { COLORS, SIZES } from "./../../constants";

const styles = StyleSheet.create({
  container: {
    aspectRatio: '16/9',
    borderRadius: SIZES.large,
    overflow: 'hidden',
    backgroundColor: '#fff'
  },
  videoContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
    height: '100%',
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.75)'
  },
  video: {
    height: Dimensions.get('window').height * 0.65,
    width: Dimensions.get('window').width * 0.75,
  },
  thumbnail: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    borderRadius: SIZES.large,
  },
  playIcon: {
    position: 'absolute',
    zIndex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  xIcon: {
    position: 'absolute',
    right: SIZES.medium,
    top: SIZES.small,
    zIndex: 3
  },
  fullscreenContainer: {
    position: 'absolute',
    height: Dimensions.get('window').height * 0.65,
    width: Dimensions.get('window').width * 0.75,
    zIndex: 2,
  },
  fullscreen: {
    position: 'absolute',
    alignSelf: 'center',
    fontSize: SIZES.small * 1.1,
    color: COLORS.font_color_primary,
    backgroundColor: 'rgba(31, 119, 252, 0.5)',
    paddingTop: 6,
    paddingBottom: 6,
    paddingRight: SIZES.xxSmall * 2,
    paddingLeft: SIZES.xxSmall * 2,
    borderRadius: SIZES.xxSmall,
    bottom: SIZES.medium,
    right: SIZES.medium
  },
  image: {
    aspectRatio: '16/9',
    objectFit: 'fill',
    borderRadius: SIZES.large
  },
  sectionHeader: {
    color: COLORS.font_color_primary,
    fontSize: SIZES.large,
    fontWeight: '600'
  },
});

export default styles;
