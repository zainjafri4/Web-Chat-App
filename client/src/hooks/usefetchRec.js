import { useEffect, useState } from "react";
import { baseUrl, getRequest } from "../utils/services";

export const useFetchRec = (chat, user) => {
    const [recUser, setRecUser] = useState(null)
    const [error, setError] = useState(null)

    const recId = chat?.members.find((id) => id !== user?._id)

    useEffect(() => {
        const getUser = async () => {
            if (!recId) return null;
            
            const response = await getRequest(`${baseUrl}/users/find/${recId}`);

            if (response.error) {
                return setError(error)
            }

            setRecUser(response);
        };

        getUser();
    }, [recId]);
    return {recUser};
};