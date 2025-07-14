import type { CreateQuestionRequest } from "@/models/create-question-request"
import type { CreateQuestionResponse } from "@/models/create-question-response"
import type { GetRoomQuestionsResponse } from "@/models/get-room-question-response"

import { createQuestionSchema } from "@/schema/createQuestion.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import type z from "zod"

export function useQuestionFormHook(roomId: string) {
  type CreateQuestionFormData = z.infer<typeof createQuestionSchema>

  const queryClient = useQueryClient()

  const { mutateAsync: createQuestion } = useMutation({
    mutationFn: async (data: CreateQuestionRequest) => {
      const response = await fetch(
        `http://localhost:3333/rooms/${roomId}/questions`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        }
      )

      const result: CreateQuestionResponse = await response.json()

      return result
    },

    onMutate({ question }) {
      const questions = queryClient.getQueryData<GetRoomQuestionsResponse[]>([
        'get-questions',
        roomId,
      ])

      const questionsArray = questions ?? []

      const newQuestion = {
        id: crypto.randomUUID(),
        question,
        answer: null,
        createdAt: new Date().toISOString(),
        isGeneratingAnswer: true,
      }

      queryClient.setQueryData<GetRoomQuestionsResponse[]>(
        ['get-questions', roomId],
        [newQuestion, ...questionsArray]
      )

      return { newQuestion, questions }
    },

    onSuccess(data, _variables, context) {
      queryClient.setQueryData<GetRoomQuestionsResponse[]>(
        ['get-questions', roomId],
        (questions) => {
          if (!questions) {
            return questions
          }

          if (!context?.newQuestion) {
            return questions
          }

          return questions.map((question) => {
            if (question.id === context.newQuestion.id) {
              return {
                ...context.newQuestion,
                id: data.questionId,
                answer: data.answer,
                isGeneratingAnswer: false,
              }
            }

            return question
          })
        }
      )
    },

    onError(_error, _variables, context) {
      if (context?.questions) {
        queryClient.setQueryData<GetRoomQuestionsResponse[]>(
          ['get-questions', roomId],
          context.questions
        )
      }
    },
  })

  const form = useForm<CreateQuestionFormData>({
    resolver: zodResolver(createQuestionSchema),
    defaultValues: {
      question: '',
    },
  })

  async function handleCreateQuestion(data: CreateQuestionFormData) {
    await createQuestion(data)
  }

  const { isSubmitting } = form.formState

  return {
    isSubmitting,
    handleCreateQuestion,
    form,
  }
}
