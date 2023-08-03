import axios from "axios";
const BASE_API_URL =
  process.env.REACT_APP_BASE_API_URL || "https://dev.codeleap.co.uk/careers/";

const deletePost = (id) => {
  return axios({
    method: "delete",
    url: BASE_API_URL + `${id}/`,
  });
};

export { deletePost };
