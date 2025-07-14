
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import { useQuestionFormHook } from './hook'




type QuestionFormProps = {

roomId: string
}

export function QuestionForm(props: QuestionFormProps) {

const hook = useQuestionFormHook(props.roomId)
  return (
    <Card>
      <CardHeader>
        <CardTitle>Fazer uma Pergunta</CardTitle>
        <CardDescription>
          Digite sua pergunta abaixo para receber uma resposta gerada por I.A.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...hook.form}>
          <form
            className="flex flex-col gap-4"
            onSubmit={hook.form.handleSubmit(hook.handleCreateQuestion)}
          >
            <FormField
              control={hook.form.control}
              name="question"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sua Pergunta</FormLabel>
                  <FormControl>
                    <Textarea
                      className="min-h-[100px]"
                      disabled={hook.isSubmitting}
                      placeholder="O que você gostaria de saber?"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button disabled={hook.isSubmitting} type="submit">
              Enviar pergunta
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}