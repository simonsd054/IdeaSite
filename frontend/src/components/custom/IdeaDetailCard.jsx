import { Link } from "react-router-dom"
import { EditIcon, Loader2, Trash } from "lucide-react"

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

export default function IdeaDetailCard({
  idea,
  loggedInUserId,
  openIdeaDeleteAlert,
  setOpenIdeaDeleteAlert,
  isDeleteIdeaMutationPending,
  onClickDelete,
}) {
  let {
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
  return (
    <Card className="w-1/2 bg-slate-100 rounded-b-none">
      <CardHeader>
        <CardTitle className="text-center">{title}</CardTitle>
        <h1 className="text-lg">{name}</h1>
        <CardDescription>{date}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>{body}</p>
      </CardContent>
      {loggedInUserId === userId && (
        <CardFooter className="flex justify-around">
          <Link to={`/ideas/${id}/edit`}>
            <Button variant="outline">
              <EditIcon className="mr-2 h-4 w-4" /> Edit
            </Button>
          </Link>
          <AlertDialog open={openIdeaDeleteAlert} onOpenChange={setOpenIdeaDeleteAlert}>
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
                  disabled={isDeleteIdeaMutationPending}
                  onClick={() => onClickDelete(id)}
                >
                  {isDeleteIdeaMutationPending && (
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
