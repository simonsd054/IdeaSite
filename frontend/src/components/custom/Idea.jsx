import { useState } from "react"
import { Link } from "react-router-dom"
import { EditIcon, Loader2, Trash } from "lucide-react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import TextTruncate from "react-text-truncate"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useToast } from "@/components/ui/use-toast"

import { deleteIdea } from "@/apis/idea"
import { graphqlError } from "@/utils/error"
import { useGlobalContext } from "@/utils/reducer"

export default function Idea({ idea }) {
  const {
    id,
    title,
    body,
    createdAt,
    user: { id: userId, name },
  } = idea

  let date = new Date(+createdAt)
  date = date.toLocaleString("en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Australia/Sydney",
  })

  const [open, setOpen] = useState(false)

  const { store } = useGlobalContext()

  const queryClient = useQueryClient()

  const deleteIdeaMutation = useMutation({
    mutationFn: (variables) => {
      return deleteIdea(variables)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ideas"] })
      queryClient.invalidateQueries({ queryKey: ["myIdeas"] })
    },
  })

  const { toast } = useToast()

  const onClickDelete = async () => {
    try {
      const deleteIdeaResp = await deleteIdeaMutation.mutateAsync({ id })
      const errors = graphqlError(deleteIdeaResp)
      if (errors) {
        toast({
          title: errors,
        })
      } else {
        toast({
          title: "Idea Deleted",
        })
      }
      setOpen(false)
    } catch (err) {
      console.log(err)
      toast({
        title: "Something went wrong!",
      })
    }
  }

  return (
    <Card className="w-1/2 bg-slate-100 hover:shadow-lg">
      <CardHeader>
        <Link to={`/ideas/${id}`} state={{ idea }} className="hover:underline">
          <CardTitle className="text-center">{title}</CardTitle>
        </Link>
        <h1 className="text-lg">{name}</h1>
        <CardDescription>{date}</CardDescription>
      </CardHeader>
      <Link to={`/ideas/${id}`}>
        <CardContent>
          <TextTruncate
            line={4}
            element="div"
            truncateText="…"
            text={body}
            textTruncateChild={
              <span className="text-blue-800 hover:underline">
                Click to read more
              </span>
            }
          />
        </CardContent>
      </Link>
      {store?.user?.id === userId && (
        <CardFooter className="flex justify-around">
          <Link to={`/ideas/${id}/edit`}>
            <Button variant="outline">
              <EditIcon className="mr-2 h-4 w-4" /> Edit
            </Button>
          </Link>
          <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger asChild>
              <Button variant="outline">
                <Trash className="mr-2 h-4 w-4" />
                Delete
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Are you sure you want to delete this idea?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete the
                  idea and remove it from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <Button
                  disabled={deleteIdeaMutation.isPending}
                  onClick={onClickDelete}
                >
                  {deleteIdeaMutation.isPending && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Yes
                </Button>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardFooter>
      )}
    </Card>
  )
}
