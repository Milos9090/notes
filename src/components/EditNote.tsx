import React from 'react'
import NoteForm from './NoteForm'
import { NoteData, Tag } from '../App'
import { useNote } from './NoteLayout'

type EditProps = {
  onSubmit: (data : NoteData) => void
  onAddTag: (tag: Tag) => void
  availableTags: Tag[]
}

const Edit = ({ onSubmit, onAddTag, availableTags }: EditProps) => {
const note = useNote();

  return (
    <>
      <h1 className="mb-4" >Edit Note</h1>
      <NoteForm 
      title={note.title}
      tags={note.tags}
      markdown={note.markdown}
      onSubmit={data => onSubmit({...data, id : note.id})} 
      availableTags={availableTags} onAddTag={onAddTag}/>
    </>
  )
}

export default Edit