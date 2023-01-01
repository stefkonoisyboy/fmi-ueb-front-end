export type CurrentUser = {
  username: string;
};

export const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user") as string) as CurrentUser;
};
