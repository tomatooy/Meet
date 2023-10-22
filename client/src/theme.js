
// color design tokens export

export const colorTokens = {
  grey: {
    0: "#FFFFFF",
    10: "#F6F6F6",
    50: "#F0F0F0",
    100: "#E0E0E0",
    200: "#C2C2C2",
    300: "#A3A3A3",
    400: "#858585",
    500: "#666666",
    600: "#4D4D4D",
    700: "#333333",
    800: "#1A1A1A",
    900: "#0A0A0A",
    1000: "#000000",
  },
  primary: {
    0: "#ffffff",
    100: "#f7f7f7",
    200: "#f7f7f7",
    300: "#dedede",
    400: "#dedede",
    500: "#8c8c8c",
    600: "#8c8c8c",
    700: "#4a4a4a",
    800: "#4a4a4a",
    900: "#000000",
  },
};

// mui theme settings
export const themeSettings = (mode) => {
  return {
    palette: {
      mode: mode,
      ...(mode === "dark"
        ? {
          // palette values for dark mode
          primary: {
            dark: colorTokens.primary[700],
            main: colorTokens.primary[500],
            light: colorTokens.primary[300],
            word: colorTokens.primary[0]
          },
          neutral: {
            dark: colorTokens.grey[100],
            main: colorTokens.grey[200],
            mediumMain: colorTokens.grey[300],
            medium: colorTokens.grey[400],
            light: colorTokens.grey[700],
          },
          background: {
            default: colorTokens.grey[900],
            alt: colorTokens.grey[800],
          },
        }
        : {
          // palette values for light mode
          primary: {
            dark: colorTokens.primary[700],
            main: colorTokens.primary[500],
            light: colorTokens.primary[100],
            white: colorTokens.primary[0],
            word: colorTokens.primary[0]
          },
          neutral: {
            dark: colorTokens.grey[700],
            main: colorTokens.grey[500],
            mediumMain: colorTokens.grey[400],
            medium: colorTokens.grey[300],
            light: colorTokens.grey[50],
          },
          background: {
            default: colorTokens.grey[10],
            alt: colorTokens.grey[0],
          },
        }),
    },
    typography: {
      fontFamily: ["Rubik", "sans-serif"].join(","),
      fontSize: 12,
      h1: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize: 40,
      },
      h2: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize: 32,
      },
      h3: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize: 24,
      },
      h4: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize: 20,
      },
      h5: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize: 16,
      },
      h6: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize: 14,
      },
    },
    logo: {
      img: {
        maxHeight: "40px",
        width: "auto"
      }
    },
    message: {
      liLeft: {
        float: "left",
        clear: "both",
        display:"flex",
        maxWidth: "50%",
      },
      liLeftText:{
        color: "#292929",
        backgroundColor: "#E3E2DF",
        position: "relative",
        display: "block",
        height: "auto",
        width: "auto",
        wordWrap: "break-word",
        wordBreak: "keep - all",
        fontFamily: "sans-serif",
        textAlign: "left",
        lineHeight: "1.5em",
        margin: "2px 10px",
        padding: "10px",
        borderRadius: "15px"
      },
      liRight: {
        float: "right",
        clear: "both",
        display:"flex",
        justifyContent: "flex-end",
        maxWidth: "50%",
      },
      liRightText:{
        color: "#F8F8F8",
        backgroundColor: "#27AE60",
        position: "relative",
        display: "block",
        height: "auto",
        width: "auto",
        wordWrap: "break-word",
        wordBreak: "keep - all",
        fontFamily: "sans-serif",
        textAlign: "left",
        lineHeight: "1.5em",
        margin: "2px 10px",
        padding: "10px",
        borderRadius: "15px"
      },
      messageArea:{
        maxHeight:"calc(100% - 80px)" ,
        minHeight:"calc(100% - 80px)",
        overflowY:"scroll",
        overflowX:"hidden",
        backgroundColor:'#f7f7f7',
        position:"relative"
      },
      inputArea:{
        height: "40px",
        position: "absolute",
        bottom:"0",
        width: "100%",

      }
      ,
      inputButton:{
        width:"10%",
        height:"100%",
        float:"right",
        padding: "0",
        fontWeight:"bold",
        border:"none"
      },
      dateBreak:{
        fontSize:"smaller",
        clear:"both",
        textAlign:"center",
      }
    }
  };
};
