'use client'
import { AlertDialog, Button, Flex } from '@radix-ui/themes';

const DeleteIssueButton = ({ issueId }: { issueId: number }) => {
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button color='ruby'>Confirm deletion</Button>
      </AlertDialog.Trigger>

      <AlertDialog.Content>
        <AlertDialog.Title>Delete this issue</AlertDialog.Title>
        <AlertDialog.Description>
          Are you sure you want to delete this issue? The action can not be undone.
        </AlertDialog.Description>
        <Flex mt='4' gap='3'>
          <AlertDialog.Cancel>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Button variant="solid" color="red">
              Delete
            </Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
    
  )
}

export default DeleteIssueButton;