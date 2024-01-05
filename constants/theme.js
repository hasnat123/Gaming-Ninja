const COLORS = {
  primary: "#0F0F0F",
  secondary: "#4D626C",
  tertiary: "#1F77FC",

  gray: "#83829A",
  gray2: "#C1C0C8",

  white: "#F3F4F8",
  lightWhite: "#FAFAFC",

  
  font_color_primary: "#FFF",

  background_color_primary: "#111111",
  background_color_secondary: "#202020",
  background_color_tertiary: "#3685fc",

  rating_color_excellent: '#6dc849',
  rating_color_good: '#a2bb48',
  rating_color_okay: 'orange',
  rating_color_bad: '#e32525'
}

const FONT = {
  regular: "DMRegular",
  medium: "DMMedium",
  bold: "DMBold",
};

const SIZES = {
  xxSmall: 6,
  xSmall: 10,
  small: 12,
  medium: 16,
  large: 20,
  xLarge: 24,
  xxLarge: 32,
};

const SHADOWS = {
  small: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
  },
  medium: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 5.84,
    elevation: 5,
  },
};

export { COLORS, FONT, SIZES, SHADOWS };
