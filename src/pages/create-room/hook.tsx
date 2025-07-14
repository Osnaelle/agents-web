import type { RoomInterface } from "@/models/rooms.interface";
import { useQuery } from "@tanstack/react-query";


export function useCreateRoomHook() {


        const {data, isLoading} =useQuery({
            queryKey:['get-rooms'],
            queryFn: async () => {
                const response = await fetch('http://localhost:3333/rooms');
                const result:RoomInterface[] = await response.json();

                return result;
    },
})



    return{
        data,
        isLoading
    }
}