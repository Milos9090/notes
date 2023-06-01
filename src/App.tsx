import "bootstrap/dist/css/bootstrap.min.css"
import { useMemo } from "react"
import { Container } from "react-bootstrap"
import { Routes, Route, Navigate } from "react-router-dom"
import NewNote from "./components/NewNote"
import EditNote from "./components/EditNote"
import Note from "./components/Note"
import { useLocalStorage } from "./useLocalStorage"
import { v4 as uuidV4 } from "uuid"
import NoteList from "./components/NoteList"
import NoteLayout from "./components/NoteLayout"

export type Note = {
  id: string;
} & NoteData;

export type RawNote = {
  id: string;
} & RawNoteData;

export type RawNoteData = {
  title: string;
  markdown: string;
  tagsIds: string[]
}

export type NoteData = {
  id?: string;
  title: string;
  markdown: string;
  tags: Tag[]
}

export type Tag = {
  id: string;
  label: string;
}

function App() {

  const [notes, setNotes] = useLocalStorage<RawNote[]>("NOTES", [])
  const [tags, setTags] = useLocalStorage<Tag[]>("TAGS", [])

  const notesWithTags = useMemo(() =>
    notes.map(note =>
      ({ ...note, tags: tags.filter(tag => note.tagsIds.includes(tag.id)) })
    ), [notes, tags]
  );

  function onCreateNote({ tags, ...data }: NoteData) {
    setNotes(prevNotes => [...prevNotes, { ...data, id: uuidV4(), tagsIds: tags.map(tag => tag.id) }])
  }

  function onDelete(id: string) {
    setNotes(prevNotes => prevNotes.filter(note => note.id !== id));
  }

  function onUpdateNote({ id, tags, ...data }: NoteData) {
    setNotes(prevNotes => prevNotes.map(note => {
      if (note.id === id) {
        return {
          ...note, ...data, id: uuidV4(), tagIds:
            tags.map(tag => tag.id)
        }
      } else {
        return note;
      }
    }))
  }

  function addTag(tag: Tag) {
    setTags(prev => [...prev, tag])
  }

  function updateTag(id: string, label: string) {
    setTags(prev => prev.map(tag => {
      if (tag.id === id) {
        return { ...tag, label };
      } else {
        return tag;
      }
    }))
  }

  function deleteTag(id: string) {
    setTags(prev => prev.filter(note => note.id !== id))
  }

  return (
    <Container className="my-4">
      <Routes>
        <Route path="/" element={<NoteList notes={notesWithTags} availableTags={tags} deleteTag={deleteTag} updateTag={updateTag} />} />
        <Route path="/new" element={<NewNote onSubmit={onCreateNote} onAddTag={addTag} availableTags={tags} />} />
        <Route path="/:id" element={<NoteLayout notes={notesWithTags} />}>
          <Route index element={<Note onDelete={onDelete} />} />
          <Route path="edit" element={<EditNote onSubmit={onUpdateNote} onAddTag={addTag} availableTags={tags} />} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Container>
  )
}

export default App
