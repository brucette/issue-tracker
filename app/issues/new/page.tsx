"use client";
import { TextField, Text, Button, Callout } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { Controller, useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { createIssueSchema } from "@/app/validationSchemas";
import { z } from "zod";
import ErrorMessage from "@/app/components/ErrorMessage";
import Spinner from "@/app/components/Spinner";

// define the shape of our form - what fiels they have and their types
// interface IssueForm {
//     title: string,
//     description: string
// }

// though a bit redundant as also being defined in the zod createIssueSchema
// alternatively, it can be generated based on the schema and stored in a type object:
type IssueForm = z.infer<typeof createIssueSchema>;

const NewIssuePage = () => {
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  // useForm returns an object, which when restructed
  // provides the register function
  // using register to register the inputfields with react hook form, so it can keep track of them
  // formState object represents everything we need to know about our form
  const { register, control, handleSubmit,formState: { errors },} = useForm<IssueForm>({
    // pass configuration object here:
    resolver: zodResolver(createIssueSchema),
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      setIsSubmitting(true)
      await axios.post("/api/issues", data);
      router.push("/issues");
    } catch (error) {
      setIsSubmitting(false)
      setError("An unknown error occured.");
    }
  });

  return (
    <div className="max-w-xl">
      {error && (
        <Callout.Root className="mb-5">
          {/* <Callout.Icon>
            <InfoCircledIcon />
          </Callout.Icon> */}
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form
        className="space-y-3"
        onSubmit={onSubmit}>
        <TextField.Root>
          {/*use the spread op so that we get access to all the properties the function comes with */}
          <TextField.Input placeholder="Title" {...register("title")} />
        </TextField.Root>
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />
        {/* above way not supported for SimpleMDE, have to use the controller component in react-hook-form */}
        <ErrorMessage>{errors.description?.message}</ErrorMessage>
        <Button disabled={isSubmitting}>
          Submit new issue 
          {isSubmitting && <Spinner />}
        </Button>
      </form>
    </div>
  );
};

export default NewIssuePage;
