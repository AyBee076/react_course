import {useState, useEffect} from 'react';

const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);
    const [name, setName] = useState('mario');

   

    useEffect(() => {
        const abortCont = new AbortController();

       setTimeout(() => {
         fetch(url, { signal: abortCont.signal })
        .then(res =>{
            if(!res.ok) {
                throw Error('could not fetch the data for that resource')
            }
            return res.json();
        })
        .then(data =>{
            setData(data)
            setIsPending(false)
            setError(null)
        })
        .catch(err => {
            if (err.name === 'AbortError') {
                console.log('fetch aborted');
            }
            else {
                setIsPending(false)
                setError(err.message)
            }
            
        })
       }, 1000)

       return () => abortCont.abort;
    }, [url]);

    return {data, isPending, error, name, setName};
}



export default useFetch;