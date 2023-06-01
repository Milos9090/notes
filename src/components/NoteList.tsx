import React, { useMemo, useState } from 'react'
import { Button, Col, Form, Row, Stack } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import ReactSelect from "react-select"
import { Note, Tag } from '../App'
import NoteCard from './NoteCard'
import EditTagsModal from './EditTagsModal'

export type SimplifiedNotes = {
  tags: Tag[]
  title: string
  id: string
}

type NoteListProps = {
  availableTags: Tag[];
  notes: SimplifiedNotes[];
  deleteTag: (id: string) => void
  updateTag: (id: string, label: string) => void
}

const NoteList = ({ availableTags, notes, updateTag,deleteTag }: NoteListProps) => {
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [title, setTitle] = useState("");
  const [editTagsModelOpen, setEditTagsModelOpen] = useState<boolean>(false)

  const filteredNotes = useMemo(() => {
    return notes.filter(note => {
      return ((title === "" || note.title.toLowerCase().includes(title.toLowerCase()))
        && (selectedTags.length === 0 || selectedTags.every(tag => note.tags.some(noteTag => noteTag.id === tag.id))))
    })
  }, [title, selectedTags, notes])

  const handleClose = () => setEditTagsModelOpen(false)

  return (
    <>
      <Row className='align-items-center mb-4'>
        <Col>
          <h1>Notes</h1>
        </Col>
        <Col xs="auto">
          <Stack gap={2} direction="horizontal">
            <Link to="/new">
              <Button variant="primary">Create</Button>
            </Link>
            <Button onClick={() => setEditTagsModelOpen(true)} variant="outline-secondary">Edit Tags</Button>
          </Stack>
        </Col>
      </Row>
      <Form>
        <Row className="mb-4" >
          <Col>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId='title'>
              <Form.Label>Tag</Form.Label>
              <ReactSelect
                options={availableTags.map(tag => ({ label: tag.label, value: tag.id })
                )}

                value={
                  selectedTags.map(tag => (
                    { label: tag.label, value: tag.id }
                  ))}
                onChange={(tags) => {
                  setSelectedTags(
                    tags.map(tag =>
                      ({ label: tag.label, id: tag.value })
                    ))
                }}
                isMulti />
            </Form.Group>
          </Col>
        </Row>
      </Form>
      <Row xs={1} sm={2} lg={3} xl={4} className="g-3">
        {filteredNotes.map(note => (
          <Col key={note.id}>
            <NoteCard id={note.id} title={note.title} tags={note.tags} />
          </Col>
        ))}
      </Row >
      <EditTagsModal show={editTagsModelOpen} deleteTag={deleteTag} updateTag={updateTag} handleClose={handleClose} availableTags={availableTags} />
    </>
  )
}

export default NoteList