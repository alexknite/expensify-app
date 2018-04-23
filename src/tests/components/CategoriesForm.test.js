import React from 'react';
import { shallow } from 'enzyme';
import moment from 'moment';
import { CategoriesForm } from '../../components/CategoriesForm';
import categories from '../fixtures/categories';

test('should render CategoriesForm correctly', () => {
  const wrapper = shallow(<CategoriesForm />);
  expect(wrapper).toMatchSnapshot();
});

test('should render CategoriesForm correctly with category data', () => {
  const wrapper = shallow(<CategoriesForm category={categories[2]} />);
  expect(wrapper).toMatchSnapshot();
});

test('should render error for invalid for submission', () => {
  const wrapper = shallow(<CategoriesForm />);
  expect(wrapper).toMatchSnapshot();
  wrapper.find('form').simulate('submit', {
    preventDefault: () => {}
  });
  expect(wrapper.state('error').length).toBeGreaterThan(0);
  expect(wrapper).toMatchSnapshot();
});

test('should set name on input change', () => {
  const value = 'New name';
  const wrapper = shallow(<CategoriesForm />);
  wrapper.find('input').at(0).simulate('change', {
    target: { value }
  });
  expect(wrapper.state('name')).toBe(value);
});

test('should call onSubmit for valid form submission', () => {
  const onSubmitSpy = jest.fn();
  const wrapper = shallow(<CategoriesForm category={categories[0]} onSubmit={onSubmitSpy} />);
  wrapper.find('form').simulate('submit', {
    preventDefault: () => {}
  });
  expect(wrapper.state('error')).toBe('');
  expect(onSubmitSpy).toHaveBeenLastCalledWith({
    name: categories[0].name
  });
});
