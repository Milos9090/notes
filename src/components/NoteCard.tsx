import React from 'react'
import { Tag } from '../App';
import { SimplifiedNotes } from './NoteList';
import { Badge, Card, Stack } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import style from "./NoteList.module.css"

type NoteCard = {
  id: string;
  title: string;
  tags: Tag[];
}

const NoteCard = ({ id, title, tags }: SimplifiedNotes) => {
  return <Card as={Link} to={`/${id}`} className={`h-100 text-reset text-decoration-none ${style.card}`}>
    <Card.Body>
<Stack gap={2} className='align-items-center justify-content-center h-100'>
<span className='fs-5' >{title}</span>
<Stack gap={1} direction='horizontal' className='justify-content-center flex-wrap' >
  {tags.map(item => 
    <Badge key={item.id} className='text-truncate'>{item.label}</Badge>)}
</Stack>
</Stack>
    </Card.Body>
  </Card>
}

export default NoteCard