const faker = require('faker');

const TOTAL_PAGES = 5;

const baseProducts = [
  { name: 'Camiseta do Brasil', description: faker.lorem.paragraph(), image_url: 'https://imgnike-a.akamaihd.net/1300x1300/0228340L.jpg', category: 't-shirts' },
  { name: 'Regata do Chicago Bulls', description: faker.lorem.paragraph(), image_url: 'https://static.lojanba.com/produtos/camiseta-regata-nba-adidas-swingman-chicago-bulls-rose/68/D13-0209-068/D13-0209-068_zoom1.jpg?ts=1600856952', category: 't-shirts' },
  { name: 'Calção da Puma', description: faker.lorem.paragraph(), image_url: 'https://static.netshoes.com.br/produtos/calcao-puma-liga-core-masculino/56/NWG-1619-056/NWG-1619-056_zoom1.jpg?ts=1643646713&', category: 'mugs' },
  { name: 'Calção da Nike', description: faker.lorem.paragraph(), image_url: 'https://static.netshoes.com.br/produtos/calcao-nike-dri-fit-academy-masculino/26/HZM-0829-326/HZM-0829-326_zoom1.jpg?ts=1660657811', category: 'mugs' },
  { name: 'Meia da Jordan', description: faker.lorem.paragraph(), image_url: 'https://artwalk.vteximg.com.br/arquivos/ids/193193-1000-1000/Meia-Nike-Jordan-Jumpman-Masculina.jpg?v=636210228372600000', category: 'sock' },
]

const allProducts = new Array(TOTAL_PAGES).fill(1).reduce((acc) => {
  const products = baseProducts.map(product => ({
    ...product, 
    id: faker.datatype.uuid(),
    price_in_cents: faker.datatype.number({
      min: 2000,
      max: 10000,
    }),
    sales: faker.datatype.number(40),
    created_at: faker.date.past()
  })).sort(() => .5 - Math.random());

  return [...acc, ...products]
}, [])

module.exports = {
  products: allProducts
}