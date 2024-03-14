import roles from "../../utils/roles.js";

const cartEndpoint = {
  addTocart: [roles.User],
  deleteFromCart : [roles.User],
};

export default cartEndpoint;
