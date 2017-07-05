const mongoose = require('mongoose');
const Store = mongoose.model('Store');
const multer = require('multer');
const jimp = require('jimp');
const uuid = require('uuid');

const multerOptions = {
  storage: multer.memoryStorage(),
  fileFilter (req, file, next) {
    const isPhoto = file.mimetype.startsWith('image/');
    if (isPhoto) {
      next(null, true);
    } else {
      next({
        message: 'That filetype is not allowed'
      }, false);
    }
  }
};

exports.upload = multer(multerOptions).single('photo');

exports.getHome = (req, res) => {
  res.render('index', {
    title: 'Home'
  });
};

exports.getStores = async (req, res) => {
  const page = req.params.page || 1;
  const limit = 4;
  const skip = (page * limit) - limit;

  const storesPromise = Store
    .find()
    .skip(skip)
    .limit(limit)
    .sort({ created: 'desc' });

  const countPromise = Store.count();

  const [stores, count] = await Promise.all([storesPromise, countPromise]);

  const pages = Math.ceil(count / limit);

  if (!stores.length && skip) {
    req.flash('info', `Hey! You asked for page ${page}. The last one is page ${pages}`);
    res.redirect(`/stores/page/${pages}`);
    return;
  }
  res.render('stores', {
    title: 'Stores',
    stores, page, pages, count
  });
};

exports.addStore = (req, res) => {
  res.render('editStore', {
    title: 'Add Store'
  });
};

exports.createStore = async (req, res) => {
  const store = await (new Store(req.body)).save();
  await store.save();
  req.flash('success', `Successfully Created ${store.name}. Care to leave a review?`);
  res.redirect(`/store/${store.slug}`);
};

exports.editStore = async (req, res) => {
  const store = await Store.findOne({
    _id: req.params.id
  });
  res.render('editStore', {
    title: `Edit ${store.name}`,
    store: store
  });
};

exports.updateStore = async (req, res) => {
  // set the location data to be a point
  req.body.location.type = 'Point';
  // find and update store
  const store = await Store.findOneAndUpdate({
    _id: req.params.id
  },
  req.body,
  {
    // returns new store instead of the old one
    new: true,
    runValidators: true
  }).exec();
  req.flash('success', `Successfully updated <strong>${store.name}</strong>. <a href='/>stores/${store.slug}'>View Store</a>`);
  res.redirect(`/stores/${store._id}/edit`);
};

exports.getStoreBySlug = async (req, res, next) => {
  const store = await Store.findOne({
    slug: req.params.slug
  });
  if (!store) return next();
  res.render('store', {
    store: store,
    title: store.name
  });
};

exports.getStoresByTag = async (req, res, next) => {
  // get a list of all the stores
  const tagsPromise = Store.getTagsList();
  const tag = req.params.tag;
  const tagQuery = tag || {
    $exists: true
  };
  const storesPromise = Store.find({
    tags: tagQuery
  });
  const [tags, stores] = await Promise.all([
    tagsPromise, storesPromise
  ]);
  res.render('tags', {
    tags: tags,
    tag: tag,
    stores: stores,
    title: 'Tags'
  });
};

exports.searchStores = async (req, res) => {
  const stores = await Store
  // find stores that match
  .find({
    $text: {
      $search: req.query.q,
    }
  }, {
    score: { $meta: 'textScore' }
  })
  // then sort them
  .sort({
    score: { $meta: 'textScore' }
  })
  // limit to only 5 results
  .limit(5);
  res.json(stores);
};
