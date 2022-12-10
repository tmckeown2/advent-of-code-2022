import {
  Box,
  Link,
  Typography
} from "@mui/material";

export default function NavBar() {
  return (
    <Box mx={2}>
      <Link href="#">
        <Typography variant="h4" gutterBottom>Home</Typography>
      </Link>
      <Link href="https://github.com/tmckeown2/advent-of-code-2022">
        <Typography variant="h4" gutterBottom>Project</Typography>
      </Link>
    </Box>
  );
}