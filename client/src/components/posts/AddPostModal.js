import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { PostContext } from '../../contexts/PostContexts'
import { useContext, useState } from 'react'

const AddPostModal = () => {
    //Contexts
    const { showAddPostModal, setShowAddPostModal, addPost, setShowToast } = useContext(PostContext)
    //State
    const [newPost, setNewPost] = useState({
        title: '',
        description: '',
        url: '',
        status: 'TO LEARN'
    })
    const { title, description, url } = newPost
    const onChangeNewPostForm = event => setNewPost({ ...newPost, [event.target.name]: event.target.value })
    //Reset data
    const resetAddPostData = () => {
        setNewPost({
            title: '',
            description: '',
            url: '',
            status: 'TO LEARN'
        })
        setShowAddPostModal(false)
    }
    const onSubmit = async event => {
        event.preventDefault()
        try {
            const addPostData = await addPost(newPost)
            setShowToast({ show: true, message: addPostData.message, type: addPostData.success ? 'success' : 'danger' })
        } catch (error) {

        }
        resetAddPostData()
    }
    return (
        <Modal show={showAddPostModal} onHide={resetAddPostData} animation={true}>
            <Modal.Header closeButton>
                <Modal.Title>What do you want to learn?</Modal.Title>
            </Modal.Header>
            <Form onSubmit={onSubmit}>
                <Modal.Body>
                    <Form.Group className='my-4'>
                        <Form.Control type='text' placeholder='Title' name='title' value={title} onChange={onChangeNewPostForm} required described='title-help' />
                        <Form.Text id='title-help' muted>Title is Required</Form.Text>
                    </Form.Group>
                    <Form.Group className='my-4'>
                        <Form.Control as='textarea' rows={3} placeholder='Description' name='description' value={description} onChange={onChangeNewPostForm} />
                    </Form.Group>
                    <Form.Group className='my-4'>
                        <Form.Control type='text' placeholder='Tutorial Video' name='url' value={url} onChange={onChangeNewPostForm} />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={resetAddPostData}>Cancel</Button>
                    <Button type='submit' variant='primary'>LearnIt</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}

export default AddPostModal
