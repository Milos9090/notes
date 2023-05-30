import React from 'react'
import { Tag } from '../App';

type NoteCard = {
  id: string;
  title: string;
  tags: Tag[];
}

const NoteCard = ({ id, title, tags }) => {
  return (
    <div>NoteCard</div>
  )
}

export default NoteCard