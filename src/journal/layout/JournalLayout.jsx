import { Box } from "@mui/material";

export const JournalLayout = ({children}) => {
  return (
      <Box sx={{ display: 'flex'}}>
          
          <Box
              component='main'
              sx={{ flexGrow: 1, p:3 }}
          >
              
              {children}
              
          </Box>
      </Box>
  )
}
