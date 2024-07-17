import React, {useState, useEffect} from 'react';
import Cookies from 'js-cookie';

const useGetToken = () => {

    const [token, setToken] = useState('');

    useEffect(() => {
        const unparsedToken = Cookies.get('token');

        if(unparsedToken){
            const parsedToken = JSON.parse(unparsedToken);
            setToken(parsedToken);
        }
    }, [token])

  return {token}
}

export default useGetToken
