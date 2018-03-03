/*
  Webpack entry point
*/

import '../scss/style.sass';

import './hamburger.js';
import './log-in.js';
import './register.js';

import { $, $$ } from './modules/bling';
import typeAhead from './modules/typeAhead';

typeAhead( $('.search') );
