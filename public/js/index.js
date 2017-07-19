/*
  Webpack entry point
*/

import '../sass/style.scss';

import './log-in.js';
import './register.js';

import { $, $$ } from './modules/bling';
import typeAhead from './modules/typeAhead';

typeAhead( $('.search') );
