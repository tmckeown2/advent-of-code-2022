import { useParams } from "react-router-dom";
import {
  Box
} from "@mui/material";
import Day1 from "../days/Day1";

function getDayComponent(index: Number) {
  switch (index) {
    case 1: return <Day1 />
  }
}

export default function DayPage() {
  const { dayId } = useParams();

  return (
    <Box sx={{ mx: 20, my: 5 }}>
      DAY { dayId }
    </Box>
  )
}