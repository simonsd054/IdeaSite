import { useNavigate, useParams } from "react-router"
import { Loader2 } from "lucide-react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import IdeaForm from "@/components/custom/IdeaForm"
import { useToast } from "@/components/ui/use-toast"

import { getIdea, updateIdea } from "@/apis/idea"
import { graphqlError } from "@/utils/error"

export default function EditIdeaPage() {
  const { toast } = useToast()

  const params = useParams()

  const queryClient = useQueryClient()

  const { data, isPending } = useQuery({
    queryKey: [`idea-${params.id}`],
    queryFn: () => {
      return getIdea({ id: params.id }, toast)
    },
  })

  const updateIdeaMutation = useMutation({
    mutationFn: (variables) => {
      return updateIdea(variables)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ideas"] })
      queryClient.invalidateQueries({ queryKey: ["myIdeas"] })
    },
  })

  const navigate = useNavigate()

  const onSubmit = async (values) => {
    try {
      const updateIdeaResp = await updateIdeaMutation.mutateAsync(values)
      const errors = graphqlError(updateIdeaResp)
      if (errors) {
        toast({
          title: errors,
        })
      } else {
        toast({
          title: "Idea Updated",
        })
        navigate(-1)
      }
    } catch (err) {
      console.log(err)
      toast({
        title: "Something went wrong!",
      })
    }
  }

  return (
    <>
      <h2 className="text-3xl font-bold text-center mb-10">Edit Idea</h2>
      {isPending ? (
        <Loader2 />
      ) : (
        <IdeaForm isEdit prevValues={data?.data?.idea} onSubmit={onSubmit} />
      )}
    </>
  )
}
