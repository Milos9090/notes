import React, { Children } from 'react'
import NoteForm from './NoteForm'
import { NoteData, Tag } from '../App'
import { useNote } from './NoteLayout'
import { Button, Col, Form, Modal, Row, Stack } from 'react-bootstrap'

type EditTagsModalProps = {
  show: boolean;
  handleClose: () => void;
  availableTags: Tag[];
  deleteTag: (id: string) => void
  updateTag: (id: string, label: string) => void
}

const EditTagsModal = ({ show, handleClose, availableTags, deleteTag, updateTag }: EditTagsModalProps) => {
const note = useNote();

  return (
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>Edit Tags</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
                <Stack gap={2}>
                    {availableTags.map(tag => (
                        <Row key={tag.id}>
                            <Col><Form.Control onChange={(e) => updateTag(tag.id, e.target.value)} type="text" value={tag.label}></Form.Control></Col>
                            <Col xs="auto" >
                                <Button onClick={() => deleteTag(tag.id)} variant='outline-danger'>&times;</Button>
                            </Col>
                        </Row>
                    ))}
                </Stack>
            </Form>
        </Modal.Body>
    </Modal>
  )
}

export default EditTagsModal