/** biome-ignore-all lint/nursery/useSortedClasses: <explanation> */
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useCreateRoomHook } from "./hook"
import { ArrowRight } from "lucide-react"
import { Link } from "react-router-dom"
import { Badge } from "@/components/ui/badge"
import { dayjs } from "@/lib/datejs"
import { CreateRoomForm } from "@/components/createRoomForms/create-room-forms"

export const CreateRoom = () => {   
const hook = useCreateRoomHook()
return(
    <div className="min-h-screen px-4 py-8">

        <div className="mx-auto max-w-4xl">
              
         
       <div className="grid grid-cols-2 items-start gap-8 max-h-screen scroll-auto">
<CreateRoomForm/>
      
       <Card>
        <CardHeader>
            <CardTitle>
                Salas recentes
            </CardTitle>
            <CardDescription>
                Acesso rápido às salas que você criou recentemente.
            </CardDescription>
                
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
            {hook.data?.map((room) => (
            
                <Link
                to={`/room/${room.id}`}
                 key={room.id} 
                 className="flex items-center justify-between rounded-lg border p-3 hover:bg-accent">
                    <div  className=" flex flex-1 flex-col  gap-1">
                        <h3 className="font-medium">{room.name}</h3>
                        

                        <div className="flex items-start gap-2">
                            <Badge variant="secondary" className="text-xs">{dayjs(room.createdAt).toNow()}</Badge>
                          <Badge variant="secondary" className="text-xs">{room.questionCount} pergunta(s)</Badge>
                        </div>
                    </div>

                    <span className="flex items-center gap-2 text-sm">
                        Entrar  
                        <ArrowRight className="size-3"/>
                    </span>

                    </Link>

                
            ))}
            
        </CardContent>
       </Card>

        </div>
   

</div>
    </div>
)

}