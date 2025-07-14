
import { QuestionItem } from '../questionItem/question-item'
import { useQuestionListHook } from './hook'

export type QuestionListProps ={
  roomId: string
}

export function QuestionList(props: QuestionListProps) {
const hook = useQuestionListHook(props.roomId)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-2xl text-foreground">
          Perguntas & Respostas
        </h2>
      </div>

      {hook.data?.map((question) => {
        return <QuestionItem key={question.id} question={question} />
      })}
    </div>
  )
}