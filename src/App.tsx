import { createTheme, CssBaseline, ThemeProvider } from '@mui/material'
import { DialogsProvider } from './lib'
import { router } from './router'
import { RouterProvider } from '@tanstack/react-router'

const theme = createTheme({})

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
