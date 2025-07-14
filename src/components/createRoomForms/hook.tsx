
import type { CreateRoomInterface } from "@/models/create-room-response"
import type { RoomInterface } from "@/models/rooms.interface"
import { createRoomSchema } from "@/schema/createRoom.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useForm } from "react-hook-form"

import type z from "zod/v4"

export function useCreateRoomFormHook (){
    const queryClient = useQueryClient()

    type CreateRoomFormData = z.infer<typeof createRoomSchema>
      const { mutateAsync: createRoom } = useMutation({
        mutationFn: async (data:  RoomInterface ) => {
            const response = await fetch('http://localhost:3333/rooms', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
    
           const result: CreateRoomInterface = await 
    
             response.json()

             return result
            },

            onSuccess:() =>{
                queryClient.invalidateQueries({queryKey:['get-rooms']})
            }
      })
    
      const createRoomForm = useForm<CreateRoomFormData>({
        resolver: zodResolver(createRoomSchema),
        defaultValues: {
          name: '',
          description: '',
        },
      })
    
      async function handleCreateRoom({ name, description }: CreateRoomFormData) {
        await createRoom({ name, description })
    
        createRoomForm.reset()
      }

      return{
        handleCreateRoom,
        createRoomForm
      }
}