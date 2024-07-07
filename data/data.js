const express = require('express');
const { buildSchema } = require('graphql');
const { graphqlHTTP } = require('express-graphql');

// Dados fictícios (simulando os dados do seu data.json)
const data = [
  {
    "name": "Camiseta do Brasil",
    "image_url": "https://imgnike-a.akamaihd.net/1300x1300/0228340L.jpg",
    "type": "Camiseta",
    "price": 349.99,
    "seller": "Nike",
    "available_sizes": ["P", "M", "G", "GG"],
    "details": "Lorem ipsum dolor sit amet...",
    "sport": "Futebol"
  },
  {
    "name": "Regata do Chicago Bulls",
    "image_url": "https://static.lojanba.com/produtos/camiseta-regata-nba-adidas-swingman-chicago-bulls-rose/68/D13-0209-068/D13-0209-068_zoom1.jpg?ts=1600856952",
    "type": "Regata",
    "price": 499.99,
    "seller": "Adidas",
    "available_sizes": ["P", "M", "G", "XPP"],
    "details": "Lorem ipsum dolor sit amet...",
    "sport": "Basquete"
  },
  {
    "name": "Calção da Puma",
    "image_url": "https://static.netshoes.com.br/produtos/calcao-puma-liga-core-masculino/56/NWG-1619-056/NWG-1619-056_zoom1.jpg?ts=1643646713&",
    "type": "Calção",
    "price": 99.69,
    "seller": "Puma",
    "available_sizes": ["P", "M", "G"],
    "details": "Lorem ipsum dolor sit amet...",
    "sport": "Corrida"
  },
  {
    "name": "Calção da Nike",
    "image_url": "https://static.netshoes.com.br/produtos/calcao-nike-dri-fit-academy-masculino/26/HZM-0829-326/HZM-0829-326_zoom1.jpg?ts=1660657811",
    "type": "Calção",
    "price": 109.69,
    "seller": "Nike",
    "available_sizes": [],
    "details": "Lorem ipsum dolor sit amet...",
    "sport": "Corrida"
  },
  {
    "name": "Meia da Jordan",
    "image_url": "https://artwalk.vteximg.com.br/arquivos/ids/193193-1000-1000/Meia-Nike-Jordan-Jumpman-Masculina.jpg?v=636210228372600000",
    "type": "Acessório",
    "price": 119.69,
    "seller": "Jordan",
    "available_sizes": ["44", "39"],
    "details": "Lorem ipsum dolor sit amet...",
    "sport": "Basquete"
  }
];

// Definição do schema GraphQL
const schema = buildSchema(`
  type Query {
    products(filter: ProductFilterInput, sortField: String, sortOrder: String): [Product]
  }

  type Product {
    name: String
    image_url: String
    type: String
    price: Float
    seller: String
    available_sizes: [String]
    details: String
    sport: String
  }

  input ProductFilterInput {
    type: String
  }
`);

// Resolver para a query de produtos
const root = {
  products: ({ filter, sortField, sortOrder }) => {
    let result = data;

    if (filter) {
      result = result.filter(product => {
        let isValid = true;
        if (filter.type) {
          isValid = isValid && product.type === filter.type;
        }
        return isValid;
      });
    }

    if (sortField) {
      result = result.sort((a, b) => {
        if (sortOrder === 'ASC') {
          return a[sortField] > b[sortField] ? 1 : -1;
        } else if (sortOrder === 'DESC') {
          return a[sortField] < b[sortField] ? 1 : -1;
        }
        return 0;
      });
    }

    return result;
  }
};

// Cria uma instância do servidor express
const app = express();

// Endpoint GraphQL
app.use('/graphql', express.json(), graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true, // Habilita o IDE GraphQL (opcional)
}));

// Porta em que o servidor irá rodar
const port = 4000;

// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor GraphQL rodando em http://localhost:${port}/graphql`);
});
