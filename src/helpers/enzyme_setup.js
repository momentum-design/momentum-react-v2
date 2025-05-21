// import polyfill for element internals - needed when testing web components with attachInternals
import 'element-internals-polyfill';

import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

Enzyme.configure({ adapter: new Adapter() });
