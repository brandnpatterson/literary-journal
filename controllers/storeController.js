const mongoose = require('mongoose');
const Store = mongoose.model('Store');

// promotion
exports.promotion = (req, res) => {
  res.render('promo', {
    title: 'Promotion'
  });
}

// getStores
exports.getStores = async (req, res) => {
  const page = req.params.page || 1;
  const limit = 6;
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
    res.redirect(`/posts/page/${pages}`);
    return;
  }
  res.render('posts', {
    title: 'Posts',
    stores, page, pages, count
  });
};

// getTableOfContentsStores
exports.getTableOfContents = async (req, res) => {
  const page = req.params.page || 1;

  const storesPromise = Store
    .find()
    .sort({ created: 'desc' });

  const countPromise = Store.count();

  const [stores, count] = await Promise.all([storesPromise, countPromise]);

  const pages = count;

  if (!stores.length && skip) {
    req.flash('info', `Hey! You asked for page ${page}. The last one is page ${pages}`);
    res.redirect(`/posts/page/${pages}`);
    return;
  }

  res.render('tableOfContents', {
    title: 'Table of Contentz',
    stores, page, pages, count
  });
};

// getFeaturedStores
exports.getFeatured = async (req, res) => {
  const page = req.params.page || 1;
  const limit = 3;
  const skip = (page * limit) - limit;
  
  const allPromise = Store
    .find()
    .sort({ created: 'desc' });

  const storesPromise = Store
    .find()
    .skip(skip)
    .limit(limit)
    .sort({ created: 'desc' });

  const countPromise = Store.count();

  const [allStores, stores, count] = await Promise.all([allPromise, storesPromise, countPromise]);

  const pages = Math.ceil(count / limit);

  const allPages = count;
  
  if (!stores.length && skip) {
    req.flash('info', `Hey! You asked for page ${page}. The last one is page ${pages}`);
    res.redirect(`/posts/page/${pages}`);
    return;
  }
  res.render('featured', {
    title: 'Featured',
    stores, page, pages, count, allPages, allStores
  });
};

// addStore
exports.addStore = (req, res) => {
  res.render('editStore', {
    title: 'Add Store'
  });
};

// createStore
exports.createStore = async (req, res) => {
  const store = await (new Store(req.body)).save();
  await store.save();
  req.flash('success', `Successfully Created ${store.name}.`);
  res.redirect(`/post/${store.slug}`);
};

// editStore
exports.editStore = async (req, res) => {
  const store = await Store.findOne({
    _id: req.params.id
  });
  res.render('editStore', {
    title: `Edit ${store.name}`,
    store: store
  });
};

// updateStore
exports.updateStore = async (req, res) => {
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
  req.flash('success', `Successfully updated <strong>${store.name}</strong>. <a href='/post/${store.slug}'>View Post</a>`);
  res.redirect(`/posts/${store._id}/edit`);
};

// getStoreBySlug
exports.getStoreBySlug = async (req, res, next) => {
  const store = await Store.findOne({
    slug: req.params.slug
  });
  if (!store) return next();
  res.render('post', {
    store: store,
    title: store.name
  });
};

// getStoreBySlug
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

// searchStores
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
