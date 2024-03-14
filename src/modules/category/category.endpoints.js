import roles from "../../utils/roles.js"

const categoryEndpoint ={
    create : [roles.Admin],
    update : [roles.Admin]

}
export default categoryEndpoint