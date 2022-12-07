import { useParams } from "react-router-dom";
import {
  Alert,
  Box
} from "@mui/material";
import Day1 from "../days/Day1/Day1";

function getDayComponent(index: Number) {
  switch (index) {
    case 1: return <Day1 />
    default:
      return <Alert severity="error">Day index must be a number</Alert>
  }
}

export default function DayPage() {
  const { dayId } = useParams();

  if (dayId === undefined) {
    return <Alert severity="error">Day index is undefined</Alert>
  }
  const index: Number = parseInt(dayId);
  
  return (
    <Box sx={{ mx: 20, my: 5 }}>
      {getDayComponent(index)}
    </Box>
  )
}