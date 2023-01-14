
import { useDispatch,useSelector } from "react-redux";
import { v4 as uuidv4 } from 'uuid';
import { addToast,removeToast } from '../store/toastSlice'

const useToasts = () =>{

    const toasts = useSelector(state=>state.toast.toasts)
    const dispatch = useDispatch()

    const deleteToast =(id)=>{
        dispatch(removeToast(id))
    }

    const addToasts = (toast) =>{
        const id = uuidv4();
        const toastWithId = {...toast,id:id}

        dispatch(addToast(toastWithId))

        setTimeout(() => {
            deleteToast(id)
        }, 3000);
    }

    return {toasts,addToasts,deleteToast}
}

export default useToasts