import { BrowserRouter as Router, useRoutes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';
import { store } from './store/store';
import { routes } from './routes';
import { theme, layoutStyles } from './styles/theme';
import {
  Container,
  Box,
  Typography,
  AppBar,
  Toolbar,
} from '@mui/material';

function AppRoutes() {
  const element = useRoutes(routes);
  return (
    <Box sx={layoutStyles.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={layoutStyles.toolbar}>
            Code Challenge - Marco Garofalo
          </Typography>
        </Toolbar>
      </AppBar>
      <Container sx={layoutStyles.container}>
        {element}
      </Container>
    </Box>
  );
}

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Router>
          <AppRoutes />
        </Router>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
