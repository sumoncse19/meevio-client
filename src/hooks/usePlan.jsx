import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const usePlan = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    const { data: plan = [], isLoading } = useQuery({
        queryKey: ['plan', user?.email],
        queryFn: async () => {
            if (!user?.email) return []; // Avoid undefined query results
            const res = await axiosSecure.get(`/users/${user?.email}`);
            return res.data.plan;
        }
    });
    return [plan, isLoading]
};

export default usePlan;