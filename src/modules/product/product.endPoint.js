import roles from "../../utils/roles.js"

const productEndpoint ={
    create : [roles.Admin],
    update : [roles.Admin]

}
export default productEndpoint