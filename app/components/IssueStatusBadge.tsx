import { Status } from "@prisma/client";
import { Badge } from "@radix-ui/themes";
// type of the map
const statusMap: Record<
  // type of key and type of value
  Status,
  { label: string; color: "red" | "violet" | "green" }
> = {
  // map object
  OPEN: { label: "Open", color: "red" },
  IN_PROGRESS: { label: "In progress", color: "violet" },
  CLOSED: { label: "Closed", color: "green" },
};

const IssueStatusBadge = ({ status }: { status: Status }) => {
  return (
    <Badge color={statusMap[status].color}>{statusMap[status].label}</Badge>
  );
};

export default IssueStatusBadge;
