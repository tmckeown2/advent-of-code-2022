import * as React from "react";
import {
  CodeBlock
} from "react-code-blocks";
import {
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TableSortLabel,
  Paper,
  Alert
} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import inputData from "./input.json";

const exampleData = [
  "1000",
  "2000",
  "3000",
  "",
  "4000",
  "",
  "5000",
  "6000",
  "",
  "7000",
  "8000",
  "9000",
  "",
  "10000",
]

interface Elf {
  id: number;
  items: Array<number>;
  total: number;
}
function getElves(inputData: Array<string>): Array<Elf> {
  let elves: Array<Elf> = [];

  let index: number = 0;
  let items: Array<number> = [];
  for (let line of inputData) {
    let value: number = parseInt(line);

    if (Number.isNaN(value)) {
      elves.push({ id: index, items: items, total: items.reduce((acc, current) => (acc + current), 0)});
      items = [];
      ++index;
    } else {
      items.push(value);
    }
  }
  if (items.length > 0) {
    elves.push({ id: index, items: items, total: items.reduce((acc, current) => (acc + current), 0)});
  }

  return elves;
}
function getMostCalories(elves: Array<Elf>): Elf {
  const totals: Array<number> = elves.map(elf => elf.total);
  const largest: number = Math.max(...totals);
  const index: number = totals.indexOf(largest);

  return elves[index];
}
function getTopElves(elves: Array<Elf>, count: number): Array<Elf> {
  elves.sort((a, b) => {
    if (a.total < b.total) return 1;
    if (a.total > b.total) return -1;
    return 0;
  });

  return elves.slice(0, count);
}

export default function Day1() {
  return (
    <Box sx={{ mx: 5, my: 5 }}>
      <Description />
      <Solution />
    </Box>
  )
}

function Description() {
  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant="h4">Day 1 - Task Details</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography variant="body1">
          Santa's reindeer typically eat regular reindeer food, but they need a lot of magical energy to deliver presents on Christmas. For that, 
          their favorite snack is a special type of star fruit that only grows deep in the jungle. The Elves have brought you on their annual 
          expedition to the grove where the fruit grows.
        </Typography>
        <br />
        <Typography variant="body1">
          To supply enough magical energy, the expedition needs to retrieve a minimum of fifty stars by December 25th. Although the Elves 
          assure you that the grove has plenty of fruit, you decide to grab any fruit you see along the way, just in case.
        </Typography>
        <br />
        <Typography variant="body1">
          Collect stars by solving puzzles. Two puzzles will be made available on each day in the Advent calendar; the second puzzle is 
          unlocked when you complete the first. Each puzzle grants one star. Good luck!
        </Typography>
        <br />
        <Typography variant="body1">
          The jungle must be too overgrown and difficult to navigate in vehicles or access from the air; the Elves' expedition traditionally goes on 
          foot. As your boats approach land, the Elves begin taking inventory of their supplies. One important consideration is food - in particular, 
          the number of Calories each Elf is carrying (your puzzle input).
        </Typography>
        <br />
        <Typography variant="body1">
          The Elves take turns writing down the number of Calories contained by the various meals, snacks, rations, etc. that they've brought 
          with them, one item per line. Each Elf separates their own inventory from the previous Elf's inventory (if any) by a blank line.
        </Typography>
        <br />
        <Typography variant="body1">
          For example, suppose the Elves finish writing their items' Calories and end up with the following list:
        </Typography>
        <br />
        <CodeBlock 
          text={exampleData.join("\n")}
          showLineNumbers={false}
        />
        <br />
        <Typography variant="body1">
          This list represents the Calories of the food carried by five Elves:
        </Typography>
        <ul>
          <li><Typography variant="body1">The first Elf is carrying food with 1000, 2000, and 3000 Calories, a total of 6000 Calories.</Typography></li>
          <li><Typography variant="body1">The second Elf is carrying one food item with 4000 Calories.</Typography></li>
          <li><Typography variant="body1">The third Elf is carrying food with 5000 and 6000 Calories, a total of 11000 Calories.</Typography></li>
          <li><Typography variant="body1">The fourth Elf is carrying food with 7000, 8000, and 9000 Calories, a total of 24000 Calories.</Typography></li>
          <li><Typography variant="body1">The fifth Elf is carrying one food item with 10000 Calories.</Typography></li>
        </ul>
        <Typography variant="body1">
        In case the Elves get hungry and need extra snacks, they need to know which 
        Elf to ask: they'd like to know how many Calories are being carried by the 
        Elf carrying the most Calories. In the example above, this is 24000
        (carried by the fourth Elf).
        </Typography>
        <br />
        <Typography variant="body1">
          Find the Elf carrying the most Calories. How many total Calories is that 
          Elf carrying?
        </Typography>
        <br />
        <Typography variant="body1">
          --- Part Two ---
        </Typography>
        <br />
        <Typography variant="body1">
          By the time you calculate the answer to the Elves' question, they've 
          already realized that the Elf carrying the most Calories of food might 
          eventually run out of snacks.
        </Typography>
        <br />
        <Typography variant="body1">
          To avoid this unacceptable situation, the Elves would instead like to know 
          the total Calories carried by the top three Elves carrying the most 
          Calories. That way, even if one of those Elves runs out of snacks, they 
          still have two backups.
        </Typography>
        <br />
        <Typography variant="body1">
          In the example above, the top three Elves are the fourth Elf (with 24000 
          Calories), then the third Elf (with 11000 Calories), then the fifth Elf 
          (with 10000 Calories). The sum of the Calories carried by these three elves 
          is 45000.
        </Typography>
        <br />
        <Typography variant="body1">
          Find the top three Elves carrying the most Calories. How many Calories are 
          those Elves carrying in total?
        </Typography>
      </AccordionDetails>
    </Accordion>
  )
}

function Solution() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [orderBy, setOrderBy] = React.useState("ID");
  const [order, setOrder] = React.useState<"asc" | "desc">("asc");

  // Read in data
  const elves: Array<Elf> = getElves(inputData);
  // Part 1: Find the elf with the most calories - how many total calories?
  const snackElf: Elf = getMostCalories(elves);
  // Part 2: Find the top 3 elves - how many total calories?
  const topElves: Array<Elf> = getTopElves(elves, 3);
  const topElvesTotal: number = topElves.map(elf => elf.total).reduce((acc, current) => (acc + current), 0);

  // Display the results + info
  function handlePageChange(event: unknown, newPage: number) {
    setPage(newPage);
  }
  function handleRowsPerPageChange(event: React.ChangeEvent<HTMLInputElement>) {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  }
  function sortById(event: React.MouseEvent<unknown>) {
    const isAsc = orderBy === "ID" && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy("ID");
  }
  function sortByTotal(event: React.MouseEvent<unknown>) {
    const isAsc = orderBy === "TOTAL" && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy("TOTAL");
  }
  function compare(a: Elf, b: Elf): number {
    let compare = 0;
    
    if (orderBy === "ID") {
      if (a.id < b.id) compare = -1;
      if (a.id > b.id) compare = 1;
    }
    if (orderBy === "TOTAL") {
      if (a.total < b.total) compare = -1;
      if (a.total > b.total) compare = 1;
    }

    return order === "asc" ? compare : -compare;
  }

  return (
    <Box component={Paper} sx={{ my: 5 }}>
      <Alert severity="info">
        <Typography variant="h6">Part 1 - Most Calories</Typography>
        <Typography variant="body1">The elf with the most calories is: <b>[id:{snackElf.id}, total:{snackElf.total}]</b></Typography>
      </Alert>

      <Alert severity="info">
        <Typography variant="h6">Part 2 - Top 3 Elves</Typography>
        {topElves.map((elf, idx) => (
          <Typography variant="body1">Elf {idx}: <b>[id:{elf.id}, total:{elf.total}]</b></Typography>
        ))}
        <Typography variant="body1">The top 3 elves are carrying <b>{topElvesTotal}</b> calories in total.</Typography>
      </Alert>

      <TableContainer>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell sortDirection={orderBy === "ID" ? order : false}>
                <TableSortLabel 
                  active={orderBy === "ID"}
                  direction={orderBy === "ID" ? order : "asc"}
                  onClick={sortById}>
                    ID
                </TableSortLabel>
              </TableCell>
              <TableCell>Items</TableCell>
              <TableCell sortDirection={orderBy === "TOTAL" ? order : false}>
                <TableSortLabel
                  active={orderBy === "TOTAL"}
                  direction={orderBy === "TOTAL" ? order : "asc"}
                  onClick={sortByTotal}>
                    Total
                </TableSortLabel>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {elves
              .sort(compare)
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>[{row.items.join(", ")}]</TableCell>
                <TableCell>{row.total}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination 
        rowsPerPageOptions={[5, 10, 25, 50]}
        component="div"
        count={elves.length}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
      />
    </Box>
  );
}