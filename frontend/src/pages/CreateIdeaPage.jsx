import { useMutation } from "@tanstack/react-query"

import IdeaForm from "@/components/custom/IdeaForm"
import { useToast } from "@/components/ui/use-toast"

import { createIdea } from "@/apis/idea"
import { graphqlError } from "@/utils/error"
import { useNavigate } from "react-router"

export default function CreateIdeaPage() {
  const createIdeaMutation = useMutation({
    mutationFn: (variables) => {
      return createIdea(variables)
    },
  })

  const { toast } = useToast()

  const navigate = useNavigate()

  const onSubmit = async (values) => {
    try {
      const createIdeaResp = await createIdeaMutation.mutateAsync(values)
      const errors = graphqlError(createIdeaResp)
      if (errors) {
        toast({
          title: errors,
        })
      } else {
        toast({
          title: "Idea Posted",
        })
        navigate("/")
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
      <h2 className="text-3xl font-bold text-center mb-10">Post Idea</h2>
      <IdeaForm onSubmit={onSubmit} />
    </>
  )
}
