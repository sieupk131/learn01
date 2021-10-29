import { createContext, useReducer, useState, useCallback } from 'react';
import { postReducer } from '../reducers/postReducer';
import { apiUrl, POST_LOADED_SUCCESS, POST_LOADED_FAIL, ADD_POST, DELETE_POST, UPDATE_POST, FIND_POST } from './constants';
import axios from 'axios';

export const PostContext = createContext()

const PostContextProvider = ({ children }) => {
    const [postState, dispatch] = useReducer(
        postReducer, {
        post: null,
        posts: [],
        postLoading: true
    })
    const [showAddPostModal, setShowAddPostModal] = useState(null)
    const [showUpdatePostModal, setShowUpdatePostModal] = useState(null)
    const [showToast, setShowToast] = useState({
        show: false,
        message: '',
        type: null
    })
    //Get all posts
    const getPosts = useCallback(async () => {
        try {
            const response = await axios.get(`${apiUrl}/posts`)
            if (response.data.success) {
                dispatch({
                    type: POST_LOADED_SUCCESS,
                    payload: response.data.posts
                })
            } else {
                dispatch({
                    type: POST_LOADED_FAIL
                })
            }
        } catch (error) {
            dispatch({
                type: POST_LOADED_FAIL
            })
        }
    }, [])

    //Add Post
    const addPost = async newPost => {
        try {
            const response = await axios.post(`${apiUrl}/posts`, newPost)
            if (response.data.success) {
                dispatch({
                    type: ADD_POST,
                    payload: response.data.post
                })
                return response.data
            } else {
                return { success: false, message: 'Add error' }
            }
        } catch (error) {
            return error.response.data ? error.response.data : { success: false, message: 'Server error' }
        }
    }

    //Delete Post
    const deletePost = async postId => {
        try {
            const response = await axios.delete(`${apiUrl}/posts/${postId}`)
            if (response.data.success) {
                dispatch({ type: DELETE_POST, payload: postId })
                return { success: true, message: `Deleted: ${response.data.post.title}` }
            } else {
                return { success: false, message: response.data.message }
            }
        } catch (error) {
            return error.response.data ? error.response.data : { success: false, message: 'Server error' }
        }
    }

    //Update Post
    const updatePost = async updatePost => {
        try {
            const response = await axios.put(`${apiUrl}/posts/${updatePost._id}`, updatePost)
            if (response.data.success) {
                dispatch({ type: UPDATE_POST, payload: response.data.post })
            }
            return response.data
        } catch (error) {
            return error.response.data ? error.response.data : { success: false, message: 'Server error' }
        }
    }

    //Find Post when user selected
    const findPost = postId => {
        const post = postState.posts.find(post => post._id === postId)
        dispatch({ type: FIND_POST, payload: post })
    }

    //Post context data
    const postContextData = {
        getPosts, postState,
        showAddPostModal, setShowAddPostModal,
        showUpdatePostModal, setShowUpdatePostModal, addPost,
        showToast, setShowToast, deletePost, updatePost, findPost
    }

    return (
        <PostContext.Provider value={postContextData}>
            {children}
        </PostContext.Provider>
    )
}

export default PostContextProvider