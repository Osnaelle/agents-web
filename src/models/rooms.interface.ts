export interface RoomInterface {

    id?: string,
    name: string
    questionCount?:number
    createdAt?: string
    description?: string
    

}

export interface CreateRoomInterface {

    roomId:string
    

}

export interface Question {
  id: string
  question: string
  answer?: string | null
  createdAt: string
  isGeneratingAnswer?: boolean
}

export interface QuestionItemProps {
  question: Question
}

