'use client'
import { TextArea, TextField, Button } from '@radix-ui/themes';
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { Controller, useForm  } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/navigation';

// define the shape of our form - what fiels they have and their types
interface IssueForm {
    title: string,
    description: string
}

const NewIssuePage = () => {
    const router = useRouter();
    // useForm returns an object, which when restructed 
    // provides the register function
    // using register to register the inputfields with react hook form, so it can keep track of them
    const { register, control, handleSubmit } = useForm<IssueForm>();

    return (
        <form 
          className='max-w-xl space-y-3' 
          onSubmit={handleSubmit(async (data) => { 
            await axios.post('/api/issues', data);
            router.push('/issues')
          })}>
            NewIssuePage
            <TextField.Root>                         {/*use the spread op so that we get access to all the properties the function comes with */}
                <TextField.Input placeholder='Title' {...register('title')}/>
            </TextField.Root>                      
            <Controller             
              name='description'
              control={control}
              render={({ field }) => <SimpleMDE placeholder='Description' {...field}/>} 
            /> {/* above way not supported for SimpleMDE, have to use the controller component in react-hook-form */}
            <Button>Submit new issue</Button>
        </form>
    )
}

export default NewIssuePage;