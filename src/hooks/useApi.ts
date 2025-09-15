import { useQuery } from "@tanstack/react-query";
import Api from "../config/Api";

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
    })
    return response;
}