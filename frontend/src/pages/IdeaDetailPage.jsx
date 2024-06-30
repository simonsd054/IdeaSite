import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Loader2 } from "lucide-react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import { useToast } from "@/components/ui/use-toast"
import IdeaDetailCard from "@/components/custom/IdeaDetailCard"
import CommentInputCard from "@/components/custom/CommentInputCard"
import AllCommentsCard from "@/components/custom/AllCommentsCard"

import { deleteIdea, getIdeaWithUserAndComment } from "@/apis/idea"
import { createComment, updateComment, deleteComment } from "@/apis/comment"
import { graphqlError } from "@/utils/error"
import { useGlobalContext } from "@/utils/reducer"

export default function IdeaDetailPage() {
  const params = useParams()

  const { toast } = useToast()
  const { data, isPending, isError, isSuccess } = useQuery({
    queryKey: ["ideas", params.id, "user", "comment"],
    queryFn: () => {
      return getIdeaWithUserAndComment({ id: params.id }, toast)
    },
  })

  const [openIdeaDeleteAlert, setOpenIdeaDeleteAlert] = useState(false)
  const [openCommentEditAlert, setOpenCommentEditAlert] = useState(false)
  const [openCommentDeleteAlert, setOpenCommentDeleteAlert] = useState(false)

  const { store } = useGlobalContext()

  const queryClient = useQueryClient()

  const navigate = useNavigate()

  const deleteIdeaMutation = useMutation({
    mutationFn: (variables) => {
      return deleteIdea(variables)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ideas"] })
      queryClient.invalidateQueries({ queryKey: ["myIdeas"] })
    },
  })

  const createCommentMutation = useMutation({
    mutationFn: (variables) => {
      return createComment({ ...variables, ideaId: params.id })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["ideas", params.id, "user", "comment"],
      })
    },
  })

  const updateCommentMutation = useMutation({
    mutationFn: (variables) => {
      return updateComment(variables)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["ideas", params.id, "user", "comment"],
      })
    },
  })

  const deleteCommentMutation = useMutation({
    mutationFn: (variables) => {
      return deleteComment(variables)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["ideas", params.id, "user", "comment"],
      })
    },
  })

  if (isPending) {
    return (
      <div className="flex justify-center">
        <Loader2 />
      </div>
    )
  }

  const idea = data?.data?.idea

  const onClickDelete = async (id) => {
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
        navigate(-1)
      }
      setOpenIdeaDeleteAlert(false)
    } catch (err) {
      console.log(err)
      toast({
        title: "Something went wrong!",
      })
    }
  }

  const onClickComment = async (values, reset) => {
    try {
      const createCommentResp = await createCommentMutation.mutateAsync(values)
      const errors = graphqlError(createCommentResp)
      if (errors) {
        toast({
          title: errors,
        })
      } else {
        toast({
          title: "Comment created",
        })
        reset()
      }
    } catch (err) {
      console.log(err)
      toast({
        title: "Something went wrong!",
      })
    }
  }

  const onClickEditComment = async (values) => {
    try {
      console.log(values)
      const editCommentResp = await updateCommentMutation.mutateAsync({
        ...values,
        ideaId: idea?.id,
      })
      const errors = graphqlError(editCommentResp)
      if (errors) {
        toast({
          title: errors,
        })
      } else {
        toast({
          title: "Comment edited",
        })
        setOpenCommentEditAlert(false)
      }
    } catch (err) {
      console.log(err)
      toast({
        title: "Something went wrong!",
      })
    }
  }
  const onClickDeleteComment = async (id) => {
    try {
      const deleteCommentResp = await deleteCommentMutation.mutateAsync({
        id,
        ideaId: idea?.id,
      })
      const errors = graphqlError(deleteCommentResp)
      if (errors) {
        toast({
          title: errors,
        })
      } else {
        toast({
          title: "Comment Deleted",
        })
      }
      setOpenCommentDeleteAlert(false)
    } catch (err) {
      console.log(err)
      toast({
        title: "Something went wrong!",
      })
    }
  }

  return (
    <>
      <div className="flex flex-col items-center">
        {isError && (
          <h1 className="text-2xl text-red-700">
            Something's wrong! Try again later!
          </h1>
        )}
        {isSuccess && (
          <>
            {/* Idea Detail Card */}
            <IdeaDetailCard
              idea={idea}
              loggedInUserId={store?.user?.id}
              openIdeaDeleteAlert={openIdeaDeleteAlert}
              setOpenIdeaDeleteAlert={setOpenIdeaDeleteAlert}
              isDeleteIdeaMutationPending={deleteIdeaMutation.isPending}
              onClickDelete={onClickDelete}
            />
            {/* Comment Input Card */}
            <CommentInputCard onClickComment={onClickComment} />
            {/* Comment Card */}
            <AllCommentsCard
              comments={idea?.comments}
              openCommentEditAlert={openCommentEditAlert}
              setOpenCommentEditAlert={setOpenCommentEditAlert}
              openCommentDeleteAlert={openCommentDeleteAlert}
              setOpenCommentDeleteAlert={setOpenCommentDeleteAlert}
              isDeleteCommentMutationPending={deleteCommentMutation.isPending}
              onClickEditComment={onClickEditComment}
              onClickDeleteComment={onClickDeleteComment}
              loggedInUserId={store?.user?.id}
            />
          </>
        )}
      </div>
    </>
  )
}
