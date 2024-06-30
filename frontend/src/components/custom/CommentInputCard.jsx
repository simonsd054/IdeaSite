import { useEffect } from "react"
import { useForm } from "react-hook-form"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"

import FormTextArea from "./form/FormTextArea"

export default function CommentInputCard({ onClickComment }) {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    reset,
  } = useForm()

  return (
    <Card className="w-1/2 bg-slate-100 rounded-none">
      {/* <CardHeader>
        <Link to={`/ideas/${id}`} className="hover:underline">
          <CardTitle className="text-center">{title}</CardTitle>
        </Link>
        <h1 className="text-lg">{name}</h1>
        <CardDescription>{date}</CardDescription>
      </CardHeader> */}
      <form
        className="w-full"
        onSubmit={handleSubmit((values) => onClickComment(values, reset))}
      >
        <CardContent className="pb-0">
          <FormTextArea
            id="body"
            registerName="body"
            label="Comment"
            placeholder="Comment"
            register={register}
            validation={{
              required: "Comment is required",
            }}
            errors={errors}
            className="w-full"
          />
        </CardContent>
        <CardFooter className="flex justify-around">
          <Button disabled={isSubmitting}>Comment</Button>
        </CardFooter>
      </form>
    </Card>
  )
}
