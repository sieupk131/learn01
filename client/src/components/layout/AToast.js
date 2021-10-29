import { useContext } from "react"
import { PostContext } from "../../contexts/PostContexts"
import Toast from 'react-bootstrap/Toast'

const AToast = () => {
    const {
        showToast: { show, type, message },
        setShowToast } = useContext(PostContext)

    return (
        <Toast
            show={show}
            style={{ position: 'fixed', top: '15%', right: '10px' }}
            className={`bg-${type} text-white`}
            onClose={setShowToast.bind(this, { show: false, message: '', type: null })}
            delay={3000} autohide
        >
            <Toast.Body>
                <strong>{message}</strong>
            </Toast.Body>
        </Toast>
    )
}

export default AToast
