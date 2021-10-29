import Button from 'react-bootstrap/Button'
import playIcon from '../../assets/play-btn.svg'
import editIcon from '../../assets/pencil.svg'
import deleteIcon from '../../assets/trash.svg'
import { useContext } from 'react'
import { PostContext } from '../../contexts/PostContexts'
const ActionButtons = ({ url, _id }) => {
    const { deletePost, setShowToast, findPost, setShowUpdatePostModal } = useContext(PostContext)
    const deleteAction = async () => {
        const deleteData = await deletePost(_id)
        console.log(deleteData)
        setShowToast({ show: true, message: deleteData.message, type: deleteData.success ? 'success' : 'danger' })
    }
    const choosePost = () => {
        findPost(_id)
        setShowUpdatePostModal(true)
    }
    return (
        <>
            <Button className='post-button' href={url} target='_blank'>
                <img src={playIcon} alt='play' width='32' height='32' />
            </Button>
            <Button className='post-button' onClick={choosePost}>
                <img src={editIcon} alt='edit' width='32' height='32' />
            </Button>
            <Button className='post-button' onClick={deleteAction}>
                <img src={deleteIcon} alt='delete' width='32' height='32' />
            </Button>
        </>
    )
}
export default ActionButtons
