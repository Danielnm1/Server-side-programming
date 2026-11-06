const cats = [
  {
    cat_id: 8,
    name: 'Miukuuuuuu',
    birthdate: '2026-10-10',
    weight: 78,
    owner: 'Matti',
    image: 'https://placecats.com/310/240',
  },
  {
    cat_id: 3,
    name: 'Kisu',
    birthdate: '2023-10-08',
    weight: 6,
    owner: 'Ulla',
    image: 'https://placecats.com/320/240',
  },
  {
    cat_id: 1,
    name: 'Misu',
    birthdate: '2021-11-18',
    weight: 7,
    owner: 'Daniel',
    image: 'https://placecats.com/320/240',
  },
];

const listAllCats = () => cats;

const findCatById = (id) => cats.find((item) => item.cat_id == id);

const addCat = (cat) => {
  const { cat_name, weight, owner, filename, birthdate } = cat;
  const newId = cats[0] ? cats[0].cat_id + 1 : 1;
  cats.unshift({
    cat_id: newId,
    cat_name,
    weight,
    owner,
    filename,
    birthdate,
  });
  return newId;
};

const removeCat = (id) => {
  const index = cats.findIndex((cat) => id == cat.cat_id);
  if (index !== -1) {
    cats.splice(index, 1);
    return true;
  }
  return false;
};

const modifyCat = (id, newDetails) => {
  const index = cats.findIndex((cat) => id == cat.cat_id);
  if (index !== -1) {
    cats[index] = { ...cats[index], ...newDetails };
    return true;
  }
  return false;
};

export { listAllCats, findCatById, addCat, removeCat, modifyCat };