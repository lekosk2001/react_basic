import { useState,useRef } from "react"
import { v4 as uuidv4 } from 'uuid';

const useToasts = () =>{

    const [, setToastsRerender] =useState(false)
    const toasts = useRef([])

// 토스트 제거 함수.
// 토스트 렌더 시, 온클릭 프롭으로 컴포넌트안에 내려주는 함수로,
// 토스트 배열에서 id인자로 받아온 토스트 스테이트를 걸러주는 함수.
const deleteToast =(id)=>{
const filteredToasts = toasts.current.filter((toast)=>{
return toast.id !== id
})
toasts.current = filteredToasts
setToastsRerender((prev)=>!prev)
}

//토스트 추가 함수,
// 토스트에 아이디를 담고, 토스트 배열에 추가.
    const addToasts = (toast) =>{
        const id = uuidv4();
        const toastWithId = {...toast,id:id}
        toasts.current = [...toasts.current,toastWithId]
        setToastsRerender((prev)=>!prev)
        setTimeout(() => {
            deleteToast(id)
        }, 3000);
    }
    return [toasts.current,addToasts,deleteToast]
}

export default useToasts