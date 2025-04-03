


class BrowserStorageService {

  // ! ----------⬇ sessionStorage Section ⬇----------

  setSession(key: string, value: any) {
    const data = value === undefined ? "" : JSON.stringify(value);
    window?.sessionStorage.setItem(key, data);
  }

  getSession(key: string) {
    const data = window?.sessionStorage.getItem(key);
    if (data) {
      return JSON.parse(data);
    }

    return null;

  }

  removeSession(key: string) {
    window?.sessionStorage.removeItem(key);
  }

  removeAllSessions() {
    for (const key in window?.sessionStorage) {
      if (window?.sessionStorage.hasOwnProperty(key)) {
        this.removeSession(key);
      }
    }
  }

  // ! ----------⬇ localStorage Section ⬇----------

  setLocal(key: string, value: any) {
    const data = value === undefined ? "" : JSON.stringify(value);
    window?.localStorage.setItem(key, data);
  }

  getLocal(key: string) {
    try {
      const data = window?.localStorage.getItem(key);
      if (data) {
        return JSON.parse(data);
      }

      return null;

    } catch (error) {
      return null;
    }
  }

  removeLocal(key: string) {
    window?.localStorage.removeItem(key);
  }

  removeAllLocals() {
    for (const key in window?.localStorage) {
      if (window?.localStorage.hasOwnProperty(key)) {
        this.removeLocal(key);
      }
    }
  }

}
export default new BrowserStorageService();