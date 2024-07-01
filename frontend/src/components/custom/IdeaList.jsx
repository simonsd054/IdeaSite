import { useQuery } from "@tanstack/react-query"
import { Loader2 } from "lucide-react"

import Idea from "@/components/custom/Idea"
import { useToast } from "@/components/ui/use-toast"

import { getIdeas } from "@/apis/idea"

export default function IdeaList({ queryKey, queryName }) {
  const { toast } = useToast()
  const { data, isPending, isSuccess, isError } = useQuery({
    queryKey: [queryKey],
    queryFn: () => {
      return getIdeas(null, toast, queryName)
    },
  })

  const ideas = data?.data?.[queryKey]

  return (
    <div className="flex flex-col items-center gap-5">
      {isError && (
        <h1 className="text-2xl text-red-700">
          Something's wrong! Try again later!
        </h1>
      )}
      {isPending ? (
        <Loader2 />
      ) : isSuccess && ideas?.length === 0 ? (
        "No Ideas Found"
      ) : (
        ideas?.map((idea) => <Idea key={idea.id} idea={idea} />)
      )}
    </div>
  )
}
