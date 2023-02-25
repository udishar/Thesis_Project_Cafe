import { atom } from "recoil";

export const UserDetail = atom({
  key: "UserDetail",
  default: [],
});

export const LoggedIn = atom({
  key: "LoggedIn",
  default: true,
});

export const userOrder = atom({
  key: "userOrder",
  default: [],
});
