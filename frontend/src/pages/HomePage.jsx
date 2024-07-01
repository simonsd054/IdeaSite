import IdeaList from "@/components/custom/IdeaList"

export default function HomePage() {
  return (
    <div>
      <h2 className="text-3xl font-bold text-center">All Ideas</h2>
      <IdeaList queryKey="ideas" queryName="ideas" />
    </div>
  )
}
