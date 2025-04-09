// import polyfill for element internals - needed when testing web components with attachInternals
import 'element-internals-polyfill';

import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });
