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

export function TaskKeyword(props: any) {
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
export function TaskLink(props: any) {
  const { href, children } = props;
  
  return (
    <Link href={href} sx={{ color: "#00aa33" }}>
      {children}
    </Link>
  );
}
export function TaskCodeBlock(props: any) {
  const { lines } = props;

  return (
    <CodeBlock text={lines.join("\n")} showLineNumbers={false} />
  );
}
export function TaskCode(props: any) {
  const { text, bold } = props;

  return (
    <Typography component="span" sx={{ fontWeight: bold ? "bold" : "regular" }}>
      <Code text={text} language="text" />
    </Typography>
  );
}
export function TaskList(props: any) {
  const { children } = props;

  return (
    <ul>
      {children}
    </ul>
  )
}
export function TaskListItem(props: any) {
  const { children } = props;

  return (
    <li>{children}</li>
  )
}

export function TaskParagraph(props: any) {
  const { children } = props;
  
  return (
    <Typography component="div" variant="body1" gutterBottom>
      { children }
    </Typography>
  );
}
export function TaskHeader(props: any) {
  const { children } = props;

  return (
    <Typography component="div" variant="h6" gutterBottom>
      { children }
    </Typography>
  );
}

export function TaskDescription(props: any) {
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