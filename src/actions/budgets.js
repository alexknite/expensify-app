import database from '../firebase/firebase';

export const addBudget = (budget) => ({
  type: 'ADD_BUDGET',
  budget
});

export const startAddBudget = (budgetData = {}) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    const {
      amount = 0,
      startDate = 0,
      endDate = 0,
      note = '',
      category = '',
    } = budgetData;
    const budget = { amount, startDate, endDate, note, category };

    return database.ref(`users/${uid}/budgets`).push(budget).then((ref) => {
      dispatch(addBudget({
        id: ref.key,
        ...budget
      }));
    });
  };
};

export const removeBudget = ({ id } = {}) => ({
    type: 'REMOVE_BUDGET',
    id
});

export const startRemoveBudget = ({ id } = {}) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database.ref(`users/${uid}/budgets/${id}`).remove().then(() => {
      dispatch(removeBudget({ id }));
    });
  };
};

export const editBudget = (id, updates) => ({
  type: 'EDIT_BUDGET',
  id,
  updates
});

export const startEditBudget = (id, updates) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database.ref(`users/${uid}/budgets/${id}`).update(updates).then(() => {
      dispatch(editBudget(id, updates));
    });
  };
};

export const setBudgets = (budgets) => ({
  type: 'SET_BUDGETS',
  budgets
});

export const startSetBudgets = () => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database.ref(`users/${uid}/budgets`).once('value').then((snapshot) => {
      const budgets = [];

      snapshot.forEach((childSnapshot) => {
        budgets.push({
          id: childSnapshot.key,
          ...childSnapshot.val()
        });
      });

       dispatch(setBudgets(budgets));
    });
  };
};
