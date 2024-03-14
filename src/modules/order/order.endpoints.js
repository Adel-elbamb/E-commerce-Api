import roles from "../../utils/roles.js";

const ordertEndpoint = {
  createOrder: [roles.User],
  cancelOrder: [roles.User],
  deliveredOreder: [roles.Admin],
}

export default ordertEndpoint;
