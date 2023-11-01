'use client'
import { TextArea, TextField, Button } from '@radix-ui/themes';

const NewIssuePage = () => {
    return (
        <div className='max-w-xl space-y-3'>
            NewIssuePage
            <TextField.Root>
                <TextField.Input placeholder='Title'/>
            </TextField.Root>
            <TextArea placeholder='Description'/>
            <Button>Submit new issue</Button>
        </div>
    )
}

export default NewIssuePage;