import Link from "next/link"
import { Button } from "../ui/button"
import { ArrowLeft } from "lucide-react"

const GoBack = () => {
  return (
    <Link 
        href="/lists"
        className="cursor-pointer"
    >
        <Button variant="ghost" size="icon" className="h-8 w-8">
            <ArrowLeft className="h-4 w-4" />
        </Button>
    </Link>
  )
}

export default GoBack