import React from 'react';
import ReactDOM from 'react-dom';

import Adapter from 'enzyme-adapter-react-16';.
import { mount } from 'enzyme';
import { configure } from 'enzyme';

import App from './App';
import SearchForm from './components/SearchForm';
configure({ adapter: new Adapter() });

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('calls onSubmit prop function when form is submitted', () => {
  const onSubmitFn = jest.fn();
  const wrapper = mount(<SearchForm onSubmit={onSubmitFn}/>);  
  const form = wrapper.find('form');
  form.simulate('submit');
  expect(onSubmitFn).toHaveBeenCalledTimes(1);
});