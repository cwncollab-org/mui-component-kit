import { createTheme, CssBaseline, ThemeProvider } from '@mui/material'
import { DialogsProvider } from './lib'
import { router } from './router'
import { RouterProvider } from '@tanstack/react-router'

const theme = createTheme({
  components: {
    MuiTextField: {
      defaultProps: {
        size: 'small',
        slotProps: {
          inputLabel: {
            shrink: true,
          },
        },
        sx: {
          '&[data-isdirty]:not([data-isdefaultvalue]) .MuiOutlinedInput-root fieldset':
            {
              borderColor: 'success.light',
            },
          '&[data-isdirty]:not([data-isvalid]) .MuiOutlinedInput-root fieldset':
            {
              borderColor: 'error.main',
            },
        },
      },
    },
  },
})

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <DialogsProvider>
        <RouterProvider router={router} />
      </DialogsProvider>
    </ThemeProvider>
  )
}
