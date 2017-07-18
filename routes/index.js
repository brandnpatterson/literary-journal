const express = require('express');
const router = express.Router();
const storeController = require('../controllers/storeController');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const { catchErrors } = require('../handlers/errorHandlers');

router.get('/', storeController.getFeatured);
router.get('/posts', catchErrors(storeController.getStores));
router.get('/posts/:page', catchErrors(storeController.getStores));
router.get('/posts/page/:page', catchErrors(storeController.getStores));

router.get('/add',
  authController.isLoggedIn,
  storeController.addStore
);
router.post('/add', catchErrors(storeController.createStore));
router.post('/add/:id', catchErrors(storeController.updateStore));

router.get('/posts/:id/edit', catchErrors(storeController.editStore));
router.get('/post/:slug', catchErrors(storeController.getStoreBySlug));

router.get('/tags/', catchErrors(storeController.getStoresByTag));
router.get('/tags/:tag', catchErrors(storeController.getStoresByTag));

router.get('/login', userController.loginForm);
router.post('/login', authController.login);

router.get('/register', userController.registerForm);
router.post('/register',
  userController.validateRegister,
  userController.register,
  authController.login
);

router.get('/register-knight', userController.registerKnightForm);
router.post('/register-knight',
  userController.validateRegister,
  userController.registerKnight
);

router.get('/logout', authController.logout);

router.get('/account',
  authController.isLoggedIn,
  userController.account
);
router.post('/account', catchErrors(userController.updateAccount));
router.post('/account/forgot', catchErrors(authController.forgot));

router.get('/account/reset/:token', catchErrors(authController.reset));
router.post('/account/reset/:token',
  authController.confirmedPasswords,
  catchErrors(authController.update)
);

/* API - Search Bar */
router.get('/api/search', catchErrors(storeController.searchStores));

module.exports = router;
