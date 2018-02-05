/*
  Webpack entry point
*/

import '../scss/style.scss';

import './log-in.js';
import './register.js';
// import './bulma-style.js';

import { $, $$ } from './modules/bling';
import typeAhead from './modules/typeAhead';

typeAhead( $('.search') );
