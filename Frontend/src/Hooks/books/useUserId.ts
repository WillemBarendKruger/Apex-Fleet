import { useEffect, useState } from "react";

const useUserId = (): number | null => {
    const [userId, setUserId] = useState<number | null>(null);

    useEffect(() => {
        const storedId = sessionStorage.getItem("userId");
        if (storedId && !isNaN(parseInt(storedId))) {
            setUserId(parseInt(storedId));
        }
    }, []);

    return userId;
};

export default useUserId;