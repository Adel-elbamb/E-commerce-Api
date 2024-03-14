import roles from "../../utils/roles.js";

const brandEndpoint = {
  create: [roles.Admin],
  update: [roles.Admin],
};
export default brandEndpoint;
