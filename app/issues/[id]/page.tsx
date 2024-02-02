import prisma from "@/prisma/client";
import { Box, Grid, Flex } from "@radix-ui/themes";
import delay from "delay";
import { notFound } from "next/navigation";
import EditIssueButton from "./EditIssueButton";
import IssueDetails from "./IssueDetails";
import DeleteIssueButton from "./DeleteIssueButton";
import authOptions from "@/app/auth/authOptions";
import { getServerSession } from "next-auth";
import AssigneeSelect from "./AssigneeSelect";
import { cache } from "react";

interface Props {
  params: { id: string };
}

const fetchIssue = cache((issueId: number) => prisma.issue.findUnique({ where: { id: issueId }}));

const IssueDetailsPage = async ({ params }: Props) => {
  const session = await getServerSession(authOptions);

  const issue = await fetchIssue(parseInt(params.id));

  if (!issue) notFound();

  await delay(900);

  return (
    <Grid columns={{ initial: "1", sm: "5" }} gap="5">
      <Box className="md:col-span-4">
        <IssueDetails issue={issue} />
      </Box>
      {session && (
        <Box>
          <Flex direction="column" gap="4">
            <AssigneeSelect issue={issue} />
            <EditIssueButton issueId={issue.id} />
            <DeleteIssueButton issueId={issue.id} />
          </Flex>
        </Box>
      )}
    </Grid>
  );
};
// want to have dynamic metadata depending on the issue we are viewing:
export async function generateMetadata({ params }: Props) {
  const issue = await fetchIssue(parseInt(params.id));

  return {
    title: issue?.title,
    description: 'Details of issue ' + issue?.id
  }
}

export default IssueDetailsPage;
