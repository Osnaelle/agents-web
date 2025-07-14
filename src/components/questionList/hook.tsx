
import type { GetRoomQuestionsResponse } from "@/models/get-room-question-response"
import { useQuery } from "@tanstack/react-query"

export const useQuestionListHook = (roomId:string) => {

      const { data } = useQuery({
    queryKey: ['get-questions', roomId],
    queryFn: async () => {
      const response = await fetch(
        `http://localhost:3333/rooms/${roomId}/questions`
      )
      const result: GetRoomQuestionsResponse[] = await response.json()

      return result
    },
  })


return{
    data

}

}