import "./LoginForm.css";
import { FormField } from "../FormField";
import { Button } from "../Button";

import { useMutation } from "@tanstack/react-query";
import { login } from "../../api/User";
import { queryClient } from "../../api/queryClient";
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

export const LoginForm = () => {

  const CreateLogSchema = z.object({
    email: z.string().min(5, { message: "Должно быть 5 или более символов длиной" }),
    password: z.string().min(8, { message: "Должно быть 8 или более символов длиной" })
  })

  type CreateLogForm = z.infer<typeof CreateLogSchema>;

  const { register, handleSubmit, formState: { errors } } = useForm<CreateLogForm>({
    resolver: zodResolver(CreateLogSchema)
  })

  let loginMutation = useMutation({
    mutationFn: login,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['users', 'me'] })
    }

  }, queryClient)



  return (
    <form className="login-form" onSubmit={handleSubmit((data) => {
      loginMutation.mutate(data)

    })}>
      <FormField label="Email" errorMessage={errors.email?.message}>
        <input
          type="text"
          required
          {...register("email")}
        />
      </FormField>
      <FormField label="Пароль" errorMessage={errors.password?.message} >
        <input
          type="password"
          required
          {...register("password")} />
      </FormField>
      {loginMutation.isPending && <p>Ожидание...</p>}
      {loginMutation.isSuccess && <p>Ура ,данные отправились!</p>}
      {loginMutation.isError && <p>Смотри валидацию...</p>}
      <Button isLoading={loginMutation.isPending}>Войти</Button>
    </form >
  );
};

