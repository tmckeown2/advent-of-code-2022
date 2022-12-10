import * as React from "react";
import {
  Box,
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
import { 
  TaskDescription,
  TaskParagraph,
  TaskHeader,
  TaskKeyword,
  TaskLink,
  TaskCode,
  TaskCodeBlock,
  TaskList,
  TaskListItem
} from "../../component/Task";
import inputData from "./input.json";

export default function Day1() {
  const summary: string = "Day 1 - Calorie Counting";
  const exampleData: Array<string> = [
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

  return (
    <Box sx={{ mx: 5, my: 5 }}>
      <TaskDescription summary={summary}>
        <TaskParagraph>
          Santa's reindeer typically eat regular reindeer food, but they need a 
          lot of <TaskLink href="https://adventofcode.com/2018/day/25">magical energy</TaskLink> to deliver 
          presents on Christmas. For that, their favorite snack is a special type 
          of <TaskKeyword variant="star">star</TaskKeyword> fruit that only grows 
          deep in the jungle. The Elves have brought you on their annual expedition to 
          the grove where the fruit grows.
        </TaskParagraph>
        <TaskParagraph>
          To supply enough magical energy, the expedition needs to retrieve a minimum 
          of <TaskKeyword variant="star">fifty stars</TaskKeyword> by December 25th. 
          Although the Elves assure you that the grove has plenty of fruit, you decide 
          to grab any fruit you see along the way, just in case.
        </TaskParagraph>
        <TaskParagraph>
          Collect stars by solving puzzles. Two puzzles will be made available on each 
          day in the Advent calendar; the second puzzle is unlocked when you complete 
          the first. Each puzzle grants <TaskKeyword variant="star">one star</TaskKeyword>. 
          Good luck!
        </TaskParagraph>
        <TaskParagraph>
          The jungle must be too overgrown and difficult to navigate in vehicles or access from 
          the air; the Elves' expedition traditionally goes on foot. As your boats approach land, 
          the Elves begin taking inventory of their supplies. One important consideration is 
          food - in particular, the number of <TaskKeyword>Calories</TaskKeyword> each Elf is 
          carrying (your puzzle input).
        </TaskParagraph>
        <TaskParagraph>
          The Elves take turns writing down the number of Calories contained by the various meals, 
          snacks, rations, etc. that they've brought with them, one item per line. Each Elf 
          separates their own inventory from the previous Elf's inventory (if any) by a blank line.
        </TaskParagraph>
        <TaskParagraph>
          For example, suppose the Elves finish writing their items' Calories and end up with the 
          following list: 
          <TaskCodeBlock lines={exampleData} />
        </TaskParagraph>
        <TaskParagraph>
          This list represents the Calories of the food carried by five Elves:
          <TaskList>
            <TaskListItem>
              The first Elf is carrying food with <TaskCode text="1000" />, <TaskCode text="2000" />, 
              and <TaskCode text="3000" /> Calories, a total of <TaskCode text="6000" bold /> Calories.
            </TaskListItem>
            <TaskListItem>
              The second Elf is carrying one food item with <TaskCode text="4000" bold /> Calories.
            </TaskListItem>
            <TaskListItem>
              The third Elf is carrying food with <TaskCode text="5000" /> and <TaskCode text="6000" /> Calories, 
              a total of <TaskCode text="11000" bold /> Calories.
            </TaskListItem>
            <TaskListItem>
              The fourth Elf is carrying food with <TaskCode text="7000" />, <TaskCode text="8000" />, 
              and <TaskCode text="9000" /> Calories, a total of <TaskCode text="24000" bold /> Calories.
            </TaskListItem>
            <TaskListItem>
              The fifth Elf is carrying one food item with <TaskCode text="10000" bold /> Calories.
            </TaskListItem>
          </TaskList>
        </TaskParagraph>
        <TaskParagraph>
          In case the Elves get hungry and need extra snacks, they need to know which Elf to ask: they'd 
          like to know how many Calories are being carried by the Elf carrying the <TaskKeyword>most</TaskKeyword> Calories. In 
          the example above, this is <TaskCode text="24000" bold /> (carried by the fourth Elf).
        </TaskParagraph>
        <TaskParagraph>
          Find the Elf carrying the most Calories. <TaskKeyword>How many total Calories is that Elf carrying?</TaskKeyword>
        </TaskParagraph>
        <br />
        <TaskHeader>--- Part Two ---</TaskHeader>
        <TaskParagraph>
          By the time you calculate the answer to the Elves' question, they've already realized that the 
          Elf carrying the most Calories of food might eventually <TaskKeyword>run out of snacks</TaskKeyword>.
        </TaskParagraph>
        <TaskParagraph>
          To avoid this unacceptable situation, the Elves would instead like to know the total Calories 
          carried by the <TaskKeyword>top three</TaskKeyword> Elves carrying the most Calories. That way, 
          even if one of those Elves runs out of snacks, they still have two backups.
        </TaskParagraph>
        <TaskParagraph>
          In the example above, the top three Elves are the fourth Elf (with <TaskCode text="24000" /> Calories), 
          then the third Elf (with <TaskCode text="11000" /> Calories), then the fifth Elf 
          (with <TaskCode text="10000" /> Calories). The sum of the Calories carried by these three 
          elves is <TaskCode text="45000" bold />.
        </TaskParagraph>
        <TaskParagraph>
          Find the top three Elves carrying the most Calories. <TaskKeyword>How many Calories are those Elves carrying in total?</TaskKeyword>
        </TaskParagraph>
      </TaskDescription>
      <Solution data={inputData} />
    </Box>
  )
}

interface Elf {
  id: number;
  items: Array<number>;
  total: number;
}
function getElves(data: Array<string>): Array<Elf> {
  let elves: Array<Elf> = [];

  let index: number = 0;
  let items: Array<number> = [];
  for (let line of data) {
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

interface SolutionProps {
  data: Array<string>;
}
function Solution(props: SolutionProps) {
  const { data } = props;
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [orderBy, setOrderBy] = React.useState("ID");
  const [order, setOrder] = React.useState<"asc" | "desc">("asc");

  // Read in data
  const elves: Array<Elf> = getElves(data);
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
          <Typography key={idx} variant="body1">Elf {idx}: <b>[id:{elf.id}, total:{elf.total}]</b></Typography>
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