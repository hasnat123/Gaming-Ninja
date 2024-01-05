import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../../../constants";

const styles = StyleSheet.create({
  video: {
    width: 290,
    height: 170,
    borderRadius: SIZES.xSmall
  },
  image: {
    width: 290,
    height: 170,
    objectFit: 'cover',
    borderRadius: SIZES.xSmall
  },
  controlsContainer: {
    position:'absolute',
    bottom: 10,
    width: '80%',
  },
  fullscreenContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%'
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
  viewMore: {
    width: 145,
    height: 170,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: SIZES.xSmall,
    fontSize: SIZES.large,
    color: COLORS.font_color_primary,
    backgroundColor: 'rgba(31, 119, 252, 0.75)',
    paddingTop: 6,
    paddingBottom: 6,
    paddingRight: SIZES.xxSmall * 2,
    paddingLeft: SIZES.xxSmall * 2
  }
});

export default styles;
