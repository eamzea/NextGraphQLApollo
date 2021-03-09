const UserModel = require('../models/UserModel');
const bcrypt = require('bcrypt');
const { createToken, validateToken } = require('../token/actions');
const ProductModel = require('../models/ProductModel');

const resolvers = {
  Mutation: {
    newUser: async (_, { input }) => {
      const { email, password } = input;

      const exist = await UserModel.findOne({ email });

      if (exist) {
        throw new Error('There is already a user with this email');
      }

      const salt = await bcrypt.genSalt(10);
      input.password = await bcrypt.hash(password, salt);

      try {
        const user = new UserModel(input);
        const newUser = await newUser.save();

        return newUser;
      } catch (error) {
        console.log(error);
      }
    },
    authenticate: async (_, { input }) => {
      const { email, password } = input;

      const user = await UserModel.findOne({ email });

      if (!user) {
        throw new Error('There is not a user with this email');
      }

      const correctPassword = await bcrypt.compare(password, user.password);

      if (!correctPassword) {
        throw new Error('Incorrect Password');
      }

      return {
        token: createToken(user, process.env.SECRET_WORD, '24h'),
      };
    },
    newProduct: async (_, { input }) => {
      try {
        const product = new ProductModel(input);
        const newProduct = await product.save();

        return newProduct;
      } catch (error) {
        console.log(error);
      }
    },
  },
  Query: {
    getUser: async (_, { token }) => {
      const userID = await validateToken(token, process.env.SECRET_WORD);

      return userID;
    },
    getProducts: async () => {
      try {
        const products = await ProductModel.find({});

        return products;
      } catch (error) {
        console.log(error);
      }
    },
    getProduct: async (_, { id }) => {
      try {
        const product = await ProductModel.findById(id);
        console.log(product);

        if (!product) {
          throw new Error('There is not a Product with this ID');
        }

        return product;
      } catch (error) {
        console.log(error);
      }
    },
  },
};

module.exports = resolvers;
