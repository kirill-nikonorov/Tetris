import DevRoot from './Root.dev';
import ProdRoot from './Root.prod';
import {hot} from 'react-hot-loader';

export default hot(module)(process.env.NODE_ENV === 'production' ? ProdRoot : DevRoot);
