export default theme = createTheme({
  typography: {
    fontFamily: "'Ubuntu', sans-serif",
    h4: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 500,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
          body {
            background-color: #f0f7ff;
          }
        `,
    },
  },
});
