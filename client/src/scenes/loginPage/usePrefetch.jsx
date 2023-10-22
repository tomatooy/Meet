import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import { setIncomingMessageByValue,  setTotalUnreadMessages } from "state/notification";
import { setLogin } from "state/auth";
import { setSender } from "state/message";

const URL = process.env.NODE_ENV === 'production' ? process.env.REACT.USER.API : "http://localhost:3001"
export const usePrefetch = () => {
    const dispatch = useDispatch()
    const { totalUnread } = useSelector(state => state.notification)
    let sum = totalUnread

    const prefetch = async (user, token) => {
        dispatch(
            setLogin({
                user: user,
                token: token,
            })
        );
        dispatch(setSender({
            sender: user._id
        }));
        await axios.get(`${URL}/users/${user._id}/getOfflineMessage`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((res) => {
            const {data} = res
            for (let id in data) {
                sum += data[id].numberOfMessages
                dispatch(setIncomingMessageByValue({ id: id, value: data[id].numberOfMessages }))
            }
            dispatch(setTotalUnreadMessages({ value: sum }))
        })
    }
    return { prefetch }
}