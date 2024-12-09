import jwt from "jsonwebtoken";
const config = require("../config/jwt");

export default {
  gerarToken: async params => {
    return jwt.sign(params, config.secret, { expiresIn: 864000 });
  },
  verificaTokenAcessoDesconsideracao: async token => {
    if (typeof token != "undefined") {
      const decoded = jwt.verify(token, config.secret);
      return decoded;
    }
  }
};
