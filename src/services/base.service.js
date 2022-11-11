import Store from "../store";
import Router from "../router/index";

export const authHeader = () => {
  const { currentUser } = Store.state;

  return {
    "Content-Type": "application/json",
    authorization: "Bearer " + currentUser?.token,
  };
};

export const handleResponseWithLoginCheck = (promise) => {
  return promise
    .then((data) => {
      return data;
    })
    .catch((error) => {
      const status = error?.response?.status;
      if (status === 403 || status === 401 || status === 500) {
        Store.dispatch("clearUser").then(() => {
          Router.push({ name: "login" }).catch((err) => {
            console.log(err);
          });
        });
      }
      return Promise.reject(error);
    });
};
