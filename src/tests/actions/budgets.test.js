import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moment from 'moment';
import {
  startAddBudget,
  addBudget,
  startRemoveBudget,
  removeBudget,
  editBudget,
  startEditBudget,
  setBudgets,
  startSetBudgets
} from '../../actions/budgets';
import budgets from '../fixtures/budgets';
import database from '../../firebase/firebase';

const uid = 'thisisatestuid';
const defaultAuthState = { auth: { uid } };
const createMockStore = configureMockStore([thunk]);

beforeEach((done) => {
  const budgetsData = {};
  budgets.forEach(({ id, amount, startDate, endDate, note, category }) => {
    budgetsData[id] = { amount, startDate, endDate, note, category };
  });
  database.ref(`users/${uid}/budgets`).set(budgetsData).then(() => done());
});

test('should setup remove budget aciton object', () => {
  const action = removeBudget({ id: '123abc' });
  expect(action).toEqual({
    type: 'REMOVE_BUDGET',
    id: '123abc'
  });
});

test('should remove budget from firebase', (done) => {
  const store = createMockStore(defaultAuthState);
  const id = budgets[2].id;
  store.dispatch(startRemoveBudget({ id })).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'REMOVE_BUDGET',
      id
    });
    return database.ref(`users/${uid}/budgets/${id}`).once('value');
  }).then((snapshot) => {
    expect(snapshot.val()).toBeFalsy();
    done();
  });
});

test('should setup edit budget action object', () => {
  const action = editBudget('123abc', { note: '😲'});
  expect(action).toEqual({
    type: 'EDIT_BUDGET',
    id: '123abc',
    updates: {
      note: '😲'
    }
  });
});

test('should edit budget from firebase', (done) => {
  const store = createMockStore(defaultAuthState);
  const id = budgets[0].id;
  const updates = { amount: 20000 };
  store.dispatch(startEditBudget(id, updates)).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'EDIT_BUDGET',
      id,
      updates
    });
    return database.ref(`users/${uid}/budgets/${id}`).once('value');
  }).then((snapshot) => {
    expect(snapshot.val().amount).toBe(updates.amount);
    done();
  });
});

test('should setup add budget action object with provided values', () => {
  const budgetData = {
    amount: 20,
    startDate: 0,
    endDate: 1000,
    note: 'This is a note',
    category: 'Food'
  };
  const action = addBudget(budgets[2]);
  expect(action).toEqual({
    type: 'ADD_BUDGET',
    budget: budgets[2]
  });
});

test('should add budget to database and store', (done) => {
  const store = createMockStore(defaultAuthState);
  const budgetData = {
    amount: 40,
    startDate: 1600,
    endDate: 8550,
    note: 'Another note',
    category: 'Transportation'
  };

  store.dispatch(startAddBudget(budgetData)).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'ADD_BUDGET',
      budget: {
        id: expect.any(String),
        ...budgetData
      }
    });
    return database
    .ref(`users/${uid}/budgets/${actions[0].budget.id}`)
    .once('value');
  }).then((snapshot) => {
    expect(snapshot.val()).toEqual(budgetData);
    done();
  });
});

test('should add budget with defaults to database and store', (done) => {
  const store = createMockStore(defaultAuthState);
  const budgetDefaults = {
    amount: 0,
    startDate: 0,
    endDate: 0,
    note: '',
    category: ''
  };

  store.dispatch(startAddBudget({})).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'ADD_BUDGET',
      budget: {
        id: expect.any(String),
        ...budgetDefaults
      }
    });
    return database
    .ref(`users/${uid}/budgets/${actions[0].budget.id}`)
    .once('value');
  }).then((snapshot) => {
    expect(snapshot.val()).toEqual(budgetDefaults);
    done();
  });
});

test('should setup set budget action object with data', () => {
  const action = setBudgets(budgets);
  expect(action).toEqual({
    type: 'SET_BUDGETS',
    budgets
  });
});

test('should fetch budgets from firebase', (done) => {
  const store = createMockStore(defaultAuthState);
  store.dispatch(startSetBudgets()).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'SET_BUDGETS',
      budgets
    });
    done();
  });
});
