import { useQuery } from "@tanstack/react-query"

import { Loader } from "../components/Loader"
import { fetchme } from "../api/User"
import { queryClient } from "../api/queryClient"
import { AuthForm } from "../components/AuthForm"
import { LogoutButton } from "../components/LogoutButton"

import { getNotes } from "../api/NoteApi"
import { NoteForm } from '../components/NoteForm/NoteForm'
import { NotesListView } from "../components/NotesListView"
import { UserView } from "../components/UserView"

export const Account = () => {
    const meQuery = useQuery({
        queryFn: fetchme,
        queryKey: ['users', 'me'],
        retry: 0,
    }, queryClient);

    const userId = meQuery.data?.id;
    console.log(meQuery.data?.username)

    const notesQuery = useQuery({
        queryFn: () => {
            if (!userId) {
                return Promise.reject("userId is undefined");
            }
            return getNotes(userId);
        },
        queryKey: ['notes', userId],
        enabled: !!userId,
    }, queryClient);

    if (meQuery.isLoading || notesQuery.isLoading) {
        return (
            <div className="app">
                <Loader />
            </div>
        );
    }

    if (meQuery.isError) return <AuthForm />;
    if (notesQuery.isError) return <div>Ошибка при загрузке заметок: {(notesQuery.error as Error).message}</div>;

    if (meQuery.isSuccess && notesQuery.isSuccess) {
        return (
            <>
                <NoteForm />
                <UserView username={meQuery.data.username} />
                <NotesListView notes={notesQuery.data?.list} />
                <LogoutButton />
            </>
        );
    }


    return null;
};