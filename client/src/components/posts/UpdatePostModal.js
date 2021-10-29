import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { PostContext } from '../../contexts/PostContexts'
import { useContext, useState, useEffect } from 'react'

const UpdatePostModal = () => {
    //Contexts
    const {
        postState: { post },
        showUpdatePostModal, setShowUpdatePostModal, setShowToast, updatePost } = useContext(PostContext)
    //Local State
    const [updatedPost, setUpdatePost] = useState(post)
    useEffect(() => setUpdatePost(post), [post])

    const { title, description, url, status } = updatedPost
    const onChangeUpdatePostForm = event => setUpdatePost({ ...updatedPost, [event.target.name]: event.target.value })
    const onSubmit = async event => {
        event.preventDefault()
        try {
            const updatePostData = await updatePost(updatedPost)
            setShowToast({ show: true, message: updatePostData.message, type: updatePostData.success ? 'success' : 'danger' })

        } catch (error) {
            setShowToast({ show: true, message: 'Update error', type: 'danger' })
        }
        setShowUpdatePostModal(false)
    }
    return (
        <Modal show={showUpdatePostModal} onHide={setShowUpdatePostModal.bind(this, false)} animation={true}>
            <Modal.Header closeButton>
                <Modal.Title>Making process?</Modal.Title>
            </Modal.Header>
            <Form onSubmit={onSubmit}>
                <Modal.Body>
                    <Form.Group className='my-4'>
                        <Form.Control type='text' placeholder='Title' name='title' value={title} onChange={onChangeUpdatePostForm} required described='title-help' />
                        <Form.Text id='title-help' muted>Title is Required</Form.Text>
                    </Form.Group>
                    <Form.Group className='my-4'>
                        <Form.Control as='textarea' rows={3} placeholder='Description' name='description' value={description} onChange={onChangeUpdatePostForm} />
                    </Form.Group>
                    <Form.Group className='my-4'>
                        <Form.Control type='text' placeholder='Tutorial Video' name='url' value={url} onChange={onChangeUpdatePostForm} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Control as='select' value={status} name='status' onChange={onChangeUpdatePostForm}>
                            <option value='TO LEARN'>TO LEARN</option>
                            <option value='LEARNING'>LEARNING</option>
                            <option value='LEARNED'>LEARNED</option>
                        </Form.Control>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={setShowUpdatePostModal.bind(this, false)}>Cancel</Button>
                    <Button type='submit' variant='primary'>Update</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}

export default UpdatePostModal
