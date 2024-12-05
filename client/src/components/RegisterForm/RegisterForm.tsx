import { FormField } from "../FormField";
import { Button } from "../Button";
import "./RegisterForm.css";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../api/queryClient";
import registration from "../../api/User";
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';


export const RegisterForm = () => {

  const CreateRegSchema = z.object({
    username: z.string().min(5, { message: "Должно быть 5 или более символов длиной" }),
    email: z.string().email({ message: "Недопустимый адрес электронной почты" }),
    password: z.string().min(8, { message: "Должно быть 8 или более символов длиной" }),
  })

  type CreateFormRegistration = z.infer<typeof CreateRegSchema>

  const registerMutation = useMutation({
    mutationFn: registration,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users', 'me'] })
    },

  })


  const { register, handleSubmit, formState: { errors } } = useForm<CreateFormRegistration>({
    resolver: zodResolver(CreateRegSchema)
  })

  return (
    <form
      className="register-form"
      onSubmit={handleSubmit((data) => {
        registerMutation.mutate(data)

      })}>
      <FormField label="Имя" errorMessage={errors.username?.message}>
        <input
          required
          type="text"
          {...register('username')}

        />
      </FormField>
      <FormField
        label="Email" errorMessage={errors.email?.message}>
        <input
          required
          {...register('email')}
        />
      </FormField>
      <FormField label="Пароль" errorMessage={errors.password?.message}>
        <input
          type="password"


          {...register('password')}
        />
      </FormField>
      {registerMutation.isPending && <p>Ожидание...</p>}
      {registerMutation.isSuccess && <p>Ура ,данные отправились!</p>}
      {registerMutation.isError && <p>Смотри валидацию...</p>}
      <Button type="submit" isLoading={registerMutation.isPending}>Зарегистрироваться</Button>
    </form>
  );
};
