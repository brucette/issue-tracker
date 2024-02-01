import Pagination from "@/app/components/Pagination";
import prisma from "@/prisma/client";
import { Status } from "@prisma/client";
import delay from "delay";
import IssueActions from "./IssueActions";
import IssueTable, { IssueQuery, columnNames } from "./IssueTable";
import { Flex } from "@radix-ui/themes";

interface Props {
  searchParams: IssueQuery;
}

const IssuesPage = async ({ searchParams }: Props) => {

  const statuses = Object.values(Status);

  // Validate the type of status chosen
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;

  const orderBy = columnNames
    .includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: "asc" }
    : undefined;

  const page = parseInt(searchParams.page) || 1;
  const pageSize = 10;

  const issues = await prisma.issue.findMany({
    where: {
      status,
    },
    orderBy,
    // the no of records that should be skipped
    skip: (page - 1) * pageSize,
    take: pageSize
  });

  // to get the total number of issues in the database:
  const issueCount = await prisma.issue.count({ where: { status } });
  await delay(200);

  return (
    <Flex direction="column" gap="3">
      <IssueActions />
      <IssueTable searchParams={searchParams} issues={issues} />
      <Pagination 
        pageSize={pageSize}
        currentPage={page}
        itemCount={issueCount} />
    </Flex>
  );
};

export const dynamic = "force-dynamic";
export default IssuesPage;
