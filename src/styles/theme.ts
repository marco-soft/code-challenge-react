import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#fff',
          color: '#000',
        },
      },
    },
  },
  spacing: 4,
});

export const layoutStyles = {
  root: {
    flexGrow: 1,
  },
  container: {
    marginTop: 4,
  },
  toolbar: {
    flexGrow: 1,
  },
} as const;

export const componentStyles = {
  modal: {
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
  },
} as const;
