import { EditIcon, Loader2, Trash } from "lucide-react"
import { useForm } from "react-hook-form"

import { Card, CardContent } from "@/components/ui/card"
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
import FormTextArea from "@/components/custom/form/FormTextArea"

export default function CommentCard({
  comment,
  openCommentEditAlert,
  setOpenCommentEditAlert,
  openCommentDeleteAlert,
  setOpenCommentDeleteAlert,
  isDeleteCommentMutationPending,
  onClickEditComment,
  onClickDeleteComment,
  loggedInUserId,
}) {
  const { id, body, user } = comment

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm({
    defaultValues: comment,
  })
  return (
    <Card className="w-full bg-slate-300 mb-2">
      <CardContent className="p-3">
        <div className="flex justify-between">
          <p className="font-bold">{user.name}</p>
          {loggedInUserId === user.id && (
            <div>
              <AlertDialog
                open={openCommentEditAlert === id}
                onOpenChange={(value) => setOpenCommentEditAlert(value && id)}
              >
                <AlertDialogTrigger asChild>
                  <Button variant="outline" size="icon" className="mr-2">
                    <EditIcon className="h-4 w-4" />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Edit Comment</AlertDialogTitle>
                    <AlertDialogDescription>
                      Make the suitable change and click on Edit Comment.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <form
                    className="w-full"
                    onSubmit={handleSubmit(onClickEditComment)}
                  >
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
                    <AlertDialogFooter>
                      <Button disabled={isSubmitting}>
                        {isSubmitting && (
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        Edit Comment
                      </Button>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                    </AlertDialogFooter>
                  </form>
                </AlertDialogContent>
              </AlertDialog>
              <AlertDialog
                open={openCommentDeleteAlert === id}
                onOpenChange={(value) => setOpenCommentDeleteAlert(value && id)}
              >
                <AlertDialogTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Trash className="h-4 w-4" />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you sure you want to delete this comment?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      the comment and remove it from our servers.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <Button
                      disabled={isDeleteCommentMutationPending}
                      onClick={() => onClickDeleteComment(id)}
                    >
                      {isDeleteCommentMutationPending && (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      )}
                      Yes
                    </Button>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          )}
        </div>
        <p>{body}</p>
      </CardContent>
    </Card>
  )
}
