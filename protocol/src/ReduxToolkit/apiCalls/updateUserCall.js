import axios from 'axios'
import {
    updateStart,
    updateSuccess,
    updateFailure
} from '../reducers/userSlice'

//Call to API
export const updateUsers = async (dispatch, id, user, token) => {
    dispatch(updateStart())
    try {
        const res = await axios.put(`/api/user/${id}`, user, {
            headers: {
                token
            }
        })
        dispatch(updateSuccess(res.data));
    } catch (error) {
        dispatch(updateFailure())
    }
}
