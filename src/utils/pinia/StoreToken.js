import { defineStore } from "pinia";

export const useTokenStore = defineStore({
  id: "token",
  persist: true, // 這個配置啟用持久化
  state: () => ({
    Sid: "",
    Wid: "",
    permissions: {},
  }),
  actions: {
    setSid(Sid) {
      this.Sid = Sid;
    },
    setWid(Wid) {
      this.Wid = Wid;
    },
    setPermissions(permissions) {
      this.permissions = permissions;
    },
  },
  getters: {
    getSid() {
      return this.Sid;
    },
    getWid() {
      return this.Wid;
    },
    getPermissions() {
      return this.permissions;
    },
  }
});
