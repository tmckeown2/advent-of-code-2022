import {
  Box,
  Link,
  Typography
} from "@mui/material";

export default function NavBar() {
  return (
    <Box mx={2}>
      <Link href="#"><Typography variant="h4" gutterBottom>Home</Typography></Link>
    </Box>
  );
}