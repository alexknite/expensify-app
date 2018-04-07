import database from '../firebase/firebase';

export const addCategory = (category) => ({
  type: 'ADD_CATEGORY',
  category
});

export const startAddCategory = (categoryData = {}) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    const {
      name = ''
     } = categoryData;
     const category = { name };

    return database.ref(`users/${uid}/categories`).push(category).then((ref) => {
      dispatch(addCategory({
        id: ref.key,
        ...category
      }));
    });
  };
};

export const removeCategory = ({ id } = {}) => ({
  type: 'REMOVE_CATEGORY',
  id
});

export const startRemoveCategory = ({ id } = {}) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;

    return database.ref(`users/${uid}/categories/${id}`).remove().then(() => {
      dispatch(removeCategory({ id }));
    });
  };
};

export const editCategory = (id, updates) => ({
  type: 'EDIT_CATEGORY',
  id,
  updates
});

export const startEditCategory = (id, updates) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;

    database.ref(`users/${uid}/categories/${id}`).update(updates).then(() => {
      dispatch(editCategory(id, updates));
    });
  };
};

export const setCategories = (categories) => ({
  type: 'SET_CATEGORIES',
  categories
});

export const startSetCategories = () => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;

    return database.ref(`users/${uid}/categories`).once('value').then((snapshot) => {
      const categories = [];

      snapshot.forEach((childSnapshot) => {
        categories.push({
          id: childSnapshot.key,
          ...childSnapshot.val()
        });
      });

      dispatch(setCategories(categories));
    });
  };
};
