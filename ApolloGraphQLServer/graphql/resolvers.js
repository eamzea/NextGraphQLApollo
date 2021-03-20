const UserModel = require('../models/UserModel');
const bcrypt = require('bcrypt');
const { createToken, validateToken } = require('../token/actions');
const ProductModel = require('../models/ProductModel');
const ClientModel = require('../models/ClientModel');

const resolvers = {
  Mutation: {
    newUser: async (_, { input }) => {
      const { email, password } = input;

      const exist = await UserModel.findOne({ email });

      if (exist) {
        throw new Error('There is already a User with this email');
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
        throw new Error('There is not a User with this email');
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
    updateProduct: async (_, { id, input }) => {
      try {
        let product = await ProductModel.findById(id);
        console.log(product);

        if (!product) {
          throw new Error('There is not a Product with this ID');
        }

        product = await ProductModel.findByIdAndUpdate(id, input, {
          new: true,
        });

        return product;
      } catch (err) {
        console.log(err);
      }
    },
    deleteProduct: async (_, { id }) => {
      try {
        let product = await ProductModel.findById(id);
        console.log(product);

        if (!product) {
          throw new Error('There is not a Product with this ID');
        }

        product = await ProductModel.findByIdAndDelete(id);

        return product;
      } catch (error) {
        console.log(error);
      }
    },
    newClient: async (_, { input }, ctx) => {
      const { email } = input;
      try {
        let exist = await ClientModel.findOne({ email });

        if (exist) {
          throw new Error('There is already a Client registered');
        }
        let newClient = await ClientModel(input);

        newClient.executive = ctx.user.id;

        await newClient.save();

        return newClient;
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
    getClients: async () => {
      try {
        const clients = await ClientModel.find();

        return clients;
      } catch (error) {
        console.log(error);
      }
    },
    getClient: async (_, { id }, ctx) => {
      const { user } = ctx;
      try {
        const client = await ClientModel.findById(id);
        console.log(client);

        if (!client) {
          throw new Error('There is not a Client with this ID');
        }

        if (client.executive !== user.id) {
          throw new Error('You are not authorized to see this information');
        }

        return client;
      } catch (error) {
        console.log(error);
      }
    },
    getExecutiveClients: async (_, {}, ctx) => {
      const { id } = ctx.user;
      try {
        const clients = await ClientModel.find({ executive: id });

        return clients;
      } catch (error) {
        console.log(error);
      }
    },
  },
};

module.exports = resolvers;
