const { v4: uuidv4 } = require('uuid');
const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');

// Define your schema
const schema = buildSchema(`
  type Product {
    id: ID!
    name: String
    image_url: String
    type: String
    price: Float
    seller: String
    available_sizes: [String]
    details: String
    sport: String
  }

  type Query {
    products(type: String, sortField: String, sortOrder: String): [Product]
  }
`);

// Sample data with unique IDs
const products = [
  {
    id: uuidv4(),
    name: "Camiseta do Brasil",
    image_url: "https://imgnike-a.akamaihd.net/1300x1300/0228340L.jpg",
    type: "Camiseta",
    price: 349.99,
    seller: "Nike",
    available_sizes: ["P", "M", "G", "GG"],
    details: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    sport: "Futebol"
  },
  {
    id: uuidv4(),
    name: "Regata do Chicago Bulls",
    image_url: "https://static.lojanba.com/produtos/camiseta-regata-nba-adidas-swingman-chicago-bulls-rose/68/D13-0209-068/D13-0209-068_zoom1.jpg?ts=1600856952",
    type: "Regata",
    price: 499.99,
    seller: "Adidas",
    available_sizes: ["P", "M", "G", "XPP"],
    details: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    sport: "Basquete"
  },
  {
    id: uuidv4(),
    name: "Calção da Puma",
    image_url: "https://static.netshoes.com.br/produtos/calcao-puma-liga-core-masculino/56/NWG-1619-056/NWG-1619-056_zoom1.jpg?ts=1643646713&",
    type: "Calção",
    price: 99.69,
    seller: "Puma",
    available_sizes: ["P", "M", "G"],
    details: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    sport: "Corrida"
  },
  {
    id: uuidv4(),
    name: "Calção da Nike",
    image_url: "https://static.netshoes.com.br/produtos/calcao-nike-dri-fit-academy-masculino/26/HZM-0829-326/HZM-0829-326_zoom1.jpg?ts=1660657811",
    type: "Calção",
    price: 109.69,
    seller: "Nike",
    available_sizes: [],
    details: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    sport: "Corrida"
  },
  {
    id: uuidv4(),
    name: "Meia da Jordan",
    image_url: "https://artwalk.vteximg.com.br/arquivos/ids/193193-1000-1000/Meia-Nike-Jordan-Jumpman-Masculina.jpg?v=636210228372600000",
    type: "Acessório",
    price: 119.69,
    seller: "Jordan",
    available_sizes: ["44", "39"],
    details: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    sport: "Basquete"
  }
];

// Define resolvers
const root = {
  products: ({ type, sortField, sortOrder }) => {
    let filteredProducts = products;

    if (type) {
      filteredProducts = filteredProducts.filter(product => product.type === type);
    }

    if (sortField) {
      filteredProducts.sort((a, b) => {
        if (sortOrder === 'ASC') {
          return a[sortField] > b[sortField] ? 1 : -1;
        } else if (sortOrder === 'DESC') {
          return a[sortField] < b[sortField] ? 1 : -1;
        }
        return 0;
      });
    }

    return filteredProducts;
  }
};

// Create an express server and a GraphQL endpoint
const app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));

app.listen(4000, () => console.log('Express GraphQL Server Now Running On localhost:4000/graphql'));
