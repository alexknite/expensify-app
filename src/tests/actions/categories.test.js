import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  startAddCategory,
  addCategory,
  startRemoveCategory,
  removeCategory,
  editCategory,
  startEditCategory,
  setCategories,
  startSetCategories
} from '../../actions/categories';
import categories from '../fixtures/categories';
import database from '../../firebase/firebase';

const uid = 'thisisatestuid';
const defaultAuthState = { auth: { uid } };
const createMockStore = configureMockStore([thunk]);

beforeEach((done) => {
  const categoriesData = {};
  categories.forEach(({ id, name }) => {
    categoriesData[id] = { name };
  });
  database.ref(`users/${uid}/categories`).set(categoriesData).then(() => done());
});

test('should setup remove category aciton object', () => {
  const action = removeCategory({ id: '123abc' });
  expect(action).toEqual({
    type: 'REMOVE_CATEGORY',
    id: '123abc'
  });
});

test('should remove category from firebase', (done) => {
  const store = createMockStore(defaultAuthState);
  const id = categories[2].id;
  store.dispatch(startRemoveCategory({ id })).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'REMOVE_CATEGORY',
      id
    });
    return database.ref(`users/${uid}/categories/${id}`).once('value');
  }).then((snapshot) => {
    expect(snapshot.val()).toBeFalsy();
    done();
  });
});

test('should setup edit category action object', () => {
  const action = editCategory('123abc', { name: 'Entertainment'});
  expect(action).toEqual({
    type: 'EDIT_CATEGORY',
    id: '123abc',
    updates: {
      name: 'Entertainment'
    }
  });
});

test('should edit category from firebase', (done) => {
  const store = createMockStore(defaultAuthState);
  const id = categories[0].id;
  const updates = { name: 'Target' };
  store.dispatch(startEditCategory(id, updates)).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'EDIT_CATEGORY',
      id,
      updates
    });
    return database.ref(`users/${uid}/categories/${id}`).once('value');
  }).then((snapshot) => {
    expect(snapshot.val().name).toBe(updates.name);
    done();
  });
});

test('should setup add category action object with provided values', () => {
  const action = addCategory(categories[2]);
  expect(action).toEqual({
    type: 'ADD_CATEGORY',
    category: categories[2]
  });
});


test('should add category to database and store', (done) => {
  const store = createMockStore(defaultAuthState);
  const categoryData = {
    name: 'Bill'
  };

  store.dispatch(startAddCategory(categoryData)).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'ADD_CATEGORY',
      category: {
        id: expect.any(String),
        ...categoryData
      }
    });
    return database
    .ref(`users/${uid}/categories/${actions[0].category.id}`)
    .once('value');
  }).then((snapshot) => {
    expect(snapshot.val()).toEqual(categoryData);
    done();
  });
});

test('should add category with defaults to database and store', (done) => {
  const store = createMockStore(defaultAuthState);
  const categoryDefaults = {
    name: ''
  };

  store.dispatch(startAddCategory({})).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'ADD_CATEGORY',
      category: {
        id: expect.any(String),
        ...categoryDefaults
      }
    });
    return database
    .ref(`users/${uid}/categories/${actions[0].category.id}`)
    .once('value');
  }).then((snapshot) => {
    expect(snapshot.val()).toEqual(categoryDefaults);
    done();
  });
});

test('should setup set category action object with data', () => {
  const action = setCategories(categories);
  expect(action).toEqual({
    type: 'SET_CATEGORIES',
    categories
  });
});

test('should fetch categories from firebase', (done) => {
  const store = createMockStore(defaultAuthState);
  store.dispatch(startSetCategories()).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'SET_CATEGORIES',
      categories
    });
    done();
  });
});
