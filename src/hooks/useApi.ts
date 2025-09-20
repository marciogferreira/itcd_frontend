import { useQuery } from "@tanstack/react-query";
import Api from "../config/Api";
import { useEffect, useState } from "react";


interface UseOptionsResult<T> {
  data: T[];
  pending: boolean;
  error: string | null;
}


export function useOptions(endPoint: string, params?: any) {

    const [data, setData] = useState([]);
    const [pending, setPending] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if(!endPoint) return;
        
        let isMounted = true; // prevent state updates if unmounted
        
        const fetchData = async () => {
            setPending(true);
            setError(null);
            
            try {
                await Api.get(`${endPoint}/options`, params).then((data: any) => {
                    if (isMounted) setData(data.data.data);
                }).catch((err) => {
                    if (isMounted) {
                        throw new Error(`Error ${err}`);
                    }
                });
            } catch (err: any) {
                if (isMounted) setError(err.message || "Something went wrong");
            } finally {
                if (isMounted) setPending(false);
            }
        };

        fetchData();
        return () => {
            isMounted = false; // cleanup on unmount
        };
    }, [endPoint]); // re-run if URL or options change

    return { data, pending, error };
}

export function useGet(endPoint: string, params?: any) {
    const response = Api.get(endPoint, params).then((res: any) => res);
    return response;
}

export function usePost(endPoint: string, params?: any) {
    const response = useQuery({
        queryKey: ['repoData'],
        queryFn: () =>
        Api.get(endPoint, params).then((res: any) => {
            return res
        }),
        refetchOnWindowFocus: false,
        refetchOnMount: true,
        refetchOnReconnect: true,
    })
    return response;
}

export function useDelete(endPoint: string, params?: any) {
    const response = useQuery({
        queryKey: ['repoData'],
        queryFn: () =>
        Api.delete(endPoint, params).then((res: any) => {
            return res
        }),
        refetchOnWindowFocus: false,
        refetchOnMount: true,
        refetchOnReconnect: true,
    })
    return response;
}