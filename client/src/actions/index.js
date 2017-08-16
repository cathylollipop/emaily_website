import axios from 'axios';
import { FETCH_USER } from './types';

// export const fetchUser = () => {
//     // when reduxThunk sees an actionCreator returns a function rather than a normal action object, it will automatically pass dispatch as argument
//     return function (dispatch) {
//         axios
//             .get('/api/current_user') // returns a promise - wants to dispatch after this finishes
//             .then(res => dispatch({ type: FETCH_USER, payload: res }));
//     };
// };


export const fetchUser = () => async dispatch => {
    const res = await axios.get('/api/current_user');
    dispatch({ type: FETCH_USER, payload: res.data });
};

export const handleToken = (token) => async dispatch => {
    const res = await axios.post('/api/stripe', token);
    dispatch({ type: FETCH_USER, payload: res.data });
};