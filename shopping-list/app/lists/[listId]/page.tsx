import { AppLayout } from "@/components/layout/app-layout"
import { SingleListView } from "@/components/lists/single-list-view"

const SingleListPage =  async ({ params } 
  : { params:  Promise<{ listId: string }>
 }) => {
  const { listId } = await params
  return (
    <AppLayout>
      <SingleListView listId={listId} />
    </AppLayout>
  )
}

export default SingleListPage