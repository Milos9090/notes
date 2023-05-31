import React from 'react'
import { useNote } from './NoteLayout'
import { Badge, Button, Col, Row, Stack } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { ReactMarkdown } from 'react-markdown/lib/react-markdown'

const Note = () => {
  const note = useNote()

  return (
    <>
    <Row className="align-items-center mb-4">
      <Col>
        <h1>{note.title}</h1>
        <Stack
          gap={1}
          className='justify-content-center flex-wrap' >
          {note.tags.map(item =>
            <Badge
              key={item.id}
              className='text-truncate'>{item.label}
            </Badge>)}
        </Stack>
      </Col>
      <Col xs="auto">
        <Stack gap={2} direction="horizontal">
          <Link to={`${note.id}'/edit`}>
            <Button variant="primary">Edit</Button>
          </Link>
          <Link to="/">
            <Button variant="outline-danger">Delete</Button>
          </Link>
          <Link to="..">
            <Button variant="outline-secondary">Back</Button>
          </Link>
        </Stack>
      </Col>
    </Row>
    <ReactMarkdown>{note.markdown}</ReactMarkdown>
    </>
  )
}

export default Note