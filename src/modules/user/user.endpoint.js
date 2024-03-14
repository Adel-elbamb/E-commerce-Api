import roles from "../../utils/roles.js";

const userEndpoint = {
  add: [roles.User],
  remove: [roles.User],
  getData: [roles.User, roles.Admin],
};
export default userEndpoint;
