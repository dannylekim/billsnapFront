// setup file
/** 
 * DON'T TOUCH THIS FILE.
 * IT'S REQUIRED TO TEST COMPONENTS
*/
import Enzyme, { shallow, render, mount } from 'enzyme';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer  from 'react-test-renderer';

configure({ adapter: new Adapter() });

const matches = children => expect(
    renderer.create(children).toJSON()
  ).toMatchSnapshot();
  
global.shallow = shallow;
global.render = render;
global.mount = mount;
global.matches = matches;
global.localStorage = {
  setItem: jest.fn()
};