import roles from "../../utils/roles.js";

const authEndpoint = {
  updatePassword: [roles.Admin, roles.User],
  updateAccount: [roles.Admin, roles.User],
  deleteAccount: [roles.Admin, roles.User]
};
export default authEndpoint;
