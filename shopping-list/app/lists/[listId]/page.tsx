import { SingleListView } from "@/components/lists/single-list-view"

const SingleListPage =  async ({ params } 
  : { params:  Promise<{ listId: string }>
 }) => {
  const { listId } = await params
  return (
  <SingleListView listId={listId} />
  )
}

export default SingleListPage