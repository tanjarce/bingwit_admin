import { toast } from 'react-toastify'

export function toastPop({message, type = 'success', autoClose= 3000}) {
    toast(message, {type, autoClose})
}