import {
  Box,
  Grid,
  Paper,
  Link,
  Typography,
  Stack
} from "@mui/material";
import { styled } from "@mui/material/styles";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.h5,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const days = [ 
  "Calorie Counting",
]

export default function HomePage() {
  return (
    <Box sx={{ mx: 20, my: 5 }}>
      <Grid container spacing={3} columns={7}>
        {
          days.map((day, index) => (
            <Grid key={index} xs={1} m={1}>
              <Item>
                <Link href={`#/day/${index + 1}`}>Day {index + 1}</Link>
                <Typography variant="h6">{day}</Typography>
              </Item>
            </Grid>
          ))
        }
      </Grid>
    </Box>
  )
}