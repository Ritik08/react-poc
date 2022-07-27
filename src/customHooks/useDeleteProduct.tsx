import {useEffect, useState} from "react";

const deleteProductApiCall = async () => {
    const res = await fetch('https://dummyjson.com/products/1', {
        method: 'DELETE',
    })
    let {id, isDeleted}: { id: number, isDeleted: boolean } = await res.json();
    return {isDeleted, id}
}
const useDeleteProduct = () => {
        const [isDeleted, setIsDeleted] = useState(false)
        const [id, setId] = useState<number>();
        // @ts-ignore
        deleteProductApiCall().then((data) => (
            setIsDeleted(true), setId(data.id)
        ))
        useEffect(() => {
            if (isDeleted) {
                setTimeout(() => (setIsDeleted(false)), 4000
                )
            }
        }, []);
        return ({id, isDeleted});
    }
;

export default useDeleteProduct;
