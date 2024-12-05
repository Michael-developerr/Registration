import { useMutation } from "@tanstack/react-query";
import { Button } from "../Button";
import "./LogoutButton.css";
import { logout } from "../../api/User";
import { queryClient } from "../../api/queryClient";


export const LogoutButton = () => {


  const outLogMutation = useMutation({
    mutationFn: () => logout(),
    onSuccess() {
    
      queryClient.invalidateQueries({ queryKey: ['users', 'me'] })

    },
    onError: (error) => {
      console.error("Ошибка выхода:", error.message);
    },
  }, queryClient)

  function handleoutLogin() {
    outLogMutation.mutate()
  }


  return (
    <div className="logout-button">
      <Button type="button" kind="secondary"
        onClick={handleoutLogin}
        isLoading={outLogMutation.isPending}
      >Выйти</Button>
   
    </div>
  );
};
