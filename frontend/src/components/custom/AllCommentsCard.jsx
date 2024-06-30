import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import CommentCard from "./CommentCard"

export default function AllCommentsCard({ comments, ...restProps }) {
  return (
    <Card className="w-1/2 bg-slate-100 rounded-t-none">
      <CardHeader>
        <CardTitle className="font-bold text-xl">Comments</CardTitle>
      </CardHeader>
      <CardContent className="pb-0">
        {comments.length === 0 ? (
          <div className="mb-5">No Comments</div>
        ) : (
          comments.map((comment) => (
            <CommentCard key={comment.id} comment={comment} {...restProps} />
          ))
        )}
      </CardContent>
    </Card>
  )
}
