import roles from "../../utils/roles.js";

const subcategoryEndpoint = {
  create: [roles.Admin],
  update: [roles.Admin],
};
export default subcategoryEndpoint;
