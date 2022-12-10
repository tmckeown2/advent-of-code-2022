import {
  Code,
  CodeBlock
} from "react-code-blocks";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Link
} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface TaskKeywordProps {
  variant?: "star";
  children?: any;
}
export function TaskKeyword(props: TaskKeywordProps) {
  const { variant, children } = props;
  
  let color = "#000000";
  if (variant === "star") {
    color = "#fac002";
  }

  return (
    <Typography component="span" sx={{ fontWeight: "bold", color: {color} }}>
      {children}
    </Typography>
  );
}
interface TaskLinkProps {
  href: string;
  children?: any;
}
export function TaskLink(props: TaskLinkProps) {
  const { href, children } = props;
  
  return (
    <Link href={href} sx={{ color: "#00aa33" }}>
      {children}
    </Link>
  );
}
interface TaskCodeBlockProps {
  lines: Array<string>;
}
export function TaskCodeBlock(props: TaskCodeBlockProps) {
  const { lines } = props;

  return (
    <CodeBlock text={lines.join("\n")} showLineNumbers={false} />
  );
}
interface TaskCodeProps {
  text: string;
  bold?: boolean;
}
export function TaskCode(props: TaskCodeProps) {
  const { text, bold } = props;

  return (
    <Typography component="span" sx={{ fontWeight: bold ? "bold" : "regular" }}>
      <Code text={text} language="text" />
    </Typography>
  );
}
interface TaskListProps {
  children?: any;
}
export function TaskList(props: TaskListProps) {
  const { children } = props;

  return (
    <ul>
      {children}
    </ul>
  )
}
interface TaskListItemProps {
  children?: any;
}
export function TaskListItem(props: TaskListItemProps) {
  const { children } = props;

  return (
    <li>{children}</li>
  )
}

interface TaskParagraphProps {
  children?: any;
}
export function TaskParagraph(props: TaskParagraphProps) {
  const { children } = props;
  
  return (
    <Typography component="div" variant="body1" gutterBottom>
      { children }
    </Typography>
  );
}
interface TaskHeaderProps {
  children?: any;
}
export function TaskHeader(props: TaskHeaderProps) {
  const { children } = props;

  return (
    <Typography component="div" variant="h6" gutterBottom>
      { children }
    </Typography>
  );
}

interface TaskDescriptionProps {
  summary: string;
  children?: any;
}
export function TaskDescription(props: TaskDescriptionProps) {
  const { summary, children } = props;
  
  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant="h4">{summary}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        {children}
      </AccordionDetails>
    </Accordion>
  )
}