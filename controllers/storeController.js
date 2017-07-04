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

exports.resize = async (req, res, next) => {
  if (!req.file) {
    return next();
  }
  // split the mimetype and use the extension
  const extension = req.file.mimetype.split('/')[1];
  // create uuid and give it the file's extension type
  req.body.photo = `${uuid.v4()}.${extension}`;

  const photo = await jimp.read(req.file.buffer);
  await photo.resize(800, jimp.AUTO);
  await photo.write(`./public/uploads/${req.body.photo}`);

  // once we have written the photo to our filesystem, keep going!
  return next();
};

exports.getHome = async (req, res) => {
  res.render('index', {
    title: 'Home'
  });
};

exports.getStores = async (req, res) => {
  const stores = await Store.find();
  res.render('stores', {
    title: 'Stores',
    stores: stores
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
  res.json(stores);
};
