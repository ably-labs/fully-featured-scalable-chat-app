import { useEffect } from "react";
import { useAuth } from "../AppProviders";

export function useProfileData(userIds, callback, watch) {
  const { api } = useAuth();
  const uniqueUserIds = userIds.filter((n, i) => userIds.indexOf(n) === i);

  useEffect(async () => {
    const profiles = await api.getUsersDetails(uniqueUserIds);
    callback(profiles);
  }, watch);
}

export default useProfileData;
