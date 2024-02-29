import axios from "axios";

export const LogInUser = async (
  username: string,
  password: string
): Promise<string> => {
  let isOk: string = "";
  await axios
    .post("${BASE_URL}auth/login", {
      username,
      password,
    })
    .then((data) => {
      if (data.status == 200) {
      } else {
        isOk = "";
        console.log("Data", data);
      }
    });
  return isOk;
};
