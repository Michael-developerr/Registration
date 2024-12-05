import "./NotesListView.css";
import { NoteView } from "../NoteView";
import { FC } from "react";

type NotesViewProps = {
  id: string;
  title: string;
  text: string;
  createdAt: number;

}
type NotesListViewProps = {
  notes: NotesViewProps[]
}


export const NotesListView: FC<NotesListViewProps> = ({ notes }) => {

  return (
    <ul className="note-list-view">
      {notes.map(note => (
        <li key={note.id}>
          <NoteView title={note.title} text={note.text} createdAt={note.createdAt} />
        </li>
      ))}

    </ul>
  );
};
