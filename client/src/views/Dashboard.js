import { useContext, useEffect } from 'react'
import { PostContext } from '../contexts/PostContexts'
import { AuthContext } from '../contexts/AuthContexts'
import Container from 'react-bootstrap/Container'
import Spinner from 'react-bootstrap/Spinner'
import Button from 'react-bootstrap/Button'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
// import Toast from 'react-bootstrap/Toast'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import SinglePost from '../components/posts/SinglePost'
import AddPostModal from '../components/posts/AddPostModal'
import addIcon from '../assets/plus-circle-fill.svg'
import UpdatePostModal from '../components/posts/UpdatePostModal'
// import AToast from '../components/layout/AToast'

const Dashboard = () => {
    const { authState: { user: { username } } } = useContext(AuthContext)
    const {
        postState: { post, posts, postLoading },
        getPosts,
        setShowAddPostModal,
    } = useContext(PostContext)

    //Start: Get all posts
    useEffect(() => getPosts(), [getPosts])
    let body = null
    if (postLoading) {
        body = (
            <>
                <div className="spinner-container">
                    <Spinner animation='border' variant='info' />
                </div>
            </>
        )
    } else if (posts.length === 0) {
        body = (
            <>
                <Card className='text-center mx-5 my-5'>
                    <Card.Header as='h1'>Hi {username}</Card.Header>
                    <Card.Body>
                        <Card.Title>Wellcome to LearnIt</Card.Title>
                        <Card.Text>
                            Click the button below to track your first skill to learn
                        </Card.Text>
                        <Button variant='primary'>LearnIt</Button>
                    </Card.Body>
                </Card>
            </>
        )
    } else {
        body = (
            <>
                <Row className='row-cols-1 row-cols-md-3 g-4 mx-auto mt-3'>
                    {posts.map(post => (
                        <Col key={post._id} className='my-2'>
                            <SinglePost post={post} />
                        </Col>
                    ))}
                </Row>
            </>
        )
    }
    let btnAddPost = (
        <OverlayTrigger placement='left' overlay={<Tooltip>Add a new thing to learn</Tooltip>}>
            <Button className='btn-floating' onClick={setShowAddPostModal.bind(this, true)}>
                <img src={addIcon} alt='add-post' width='60' height='60' />
            </Button>
        </OverlayTrigger>
    )
    return (
        <Container>
            {body}
            {btnAddPost}
            <AddPostModal />
            {(post !== null) && <UpdatePostModal />}
        </Container>
    )
}

export default Dashboard
