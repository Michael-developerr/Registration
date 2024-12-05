import { FormField } from "../FormField";
import { Button } from "../Button";
import "./NoteForm.css";

import { z } from "zod";
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { PostNotes } from "../../api/User";
import { queryClient } from "../../api/queryClient";


export const NoteForm = () => {


  const NoteFormSchema = z.object({
    title: z.string().min(5, { message: "Должно быть 5 или более символов длиной" }),
    text: z.string().min(8).max(300, { message: "Должно быть 8 и до 300 символов" })
  })

  type NoteForm = z.infer<typeof NoteFormSchema>;
  const { register, handleSubmit, formState: { errors } } = useForm<NoteForm>({
    resolver: zodResolver(NoteFormSchema)
  })


  const NoteMutation = useMutation({
    mutationFn: PostNotes,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['notes'] })
    },
    onError(error) {
      console.error("Ошибка при создании заметки:", error);
    }
  }, queryClient)

  return (
    <div className="form-container">

      <form className="note-form" onSubmit={handleSubmit((data) => {
        NoteMutation.mutate(data)
      })}>


        <FormField label="Заголовок" errorMessage={errors.title?.message}>
          <input
            type="text"

            {...register('title')}
          />
        </FormField>
        <FormField label="Текст" errorMessage={errors.text?.message}>
          <textarea

            {...register('text')}
          />
        </FormField  >
        <Button type="submit" isLoading={NoteMutation.isPending}>Сохранить</Button>
      </form>
    </div>
  );
};
