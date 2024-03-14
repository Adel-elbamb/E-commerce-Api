import roles from "../../utils/roles.js";

const couponEndpoint = {
  create: [roles.Admin],
  update: [roles.Admin],
};
export default couponEndpoint;
