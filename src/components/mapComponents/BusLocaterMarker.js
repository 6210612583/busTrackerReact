import { useEffect, useState } from "react"

const BusLocaterMarker = () => {
    const [token, setToken] = useState()
    const [busLocater, setBusLocater] = useState({})
    useEffect(() => {
        fetchBustrackerToken().then(token => {
            setToken(token)
        })
    }, [])

    useEffect(() => {
        if (token) {
            fetchBusLocater(token).then(busLocater => setBusLocater(busLocater))
        }
    }, [token])



    return <></>
}

export default BusLocaterMarker;

async function fetchBustrackerToken() {

    try {
        const response = await fetch('http://supersonixz-env.eba-bxfxd6c3.ap-southeast-1.elasticbeanstalk.com/session', {
            method: 'GET'
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.text();
        console.log(data);
        return data;
    } catch (error) {
        console.error(error);
        if (error.response) {
            console.log(`HTTP error! status: ${error.response.status}`);
        }
    }
}

async function fetchBusLocater(token) {
    if (token != undefined) {
        const body = { token: token, password: 'aaa' }
        const queryParams = new URLSearchParams(body);

        try {
            const response = await fetch('http://supersonixz-env.eba-bxfxd6c3.ap-southeast-1.elasticbeanstalk.com/listAllBusTrackers?' + queryParams.toString(), {
                method: 'GET',
                /* headers: {
                    token: token,
                    password: 'aaa'
                }, */
                /* body: JSON.stringify({
                    body
                }) */
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            console.log(data);
            return data;
        } catch (error) {
            console.error(error);
            if (error.response) {
                console.log(`HTTP error! status: ${error.response.status}`);
            }
        }
    }

    
}
