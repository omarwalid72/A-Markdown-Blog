const express = require("express");
const Article = require("../models/articles");
const router = express.Router();

// GET route for creating a new article
router.get("/new", (req, res) => {
  res.render("articles/new", { article: new Article() });
});

// GET route for editing an existing article
router.get("/edit/:id", async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) return res.redirect('/');
    res.render("articles/edit", { article: article }); // Use a separate "edit" view
  } catch (e) {
    console.error(e);
    res.redirect('/');
  }
});

// GET route to display an article by slug
router.get("/:slug", async (req, res) => {
  const article = await Article.findOne({ slug: req.params.slug });
  if (article == null) return res.redirect('/');
  res.render("articles/show", { article: article });
});

// POST route to create a new article
router.post("/", async (req, res) => {
  let article = new Article({
    title: req.body.title,
    description: req.body.description,
    markdown: req.body.markdown
  });
  try {
    article = await article.save();
    res.redirect(`/articles/${article.slug}`);
  } catch (e) {
    console.error(e);
    res.render("articles/new", { article: article });
  }
});

// PUT route to update an existing article
router.put('/:id', async (req, res) => {
  let article;
  try {
    article = await Article.findById(req.params.id);
    if (!article) return res.redirect('/');

    // Update article fields
    article.title = req.body.title;
    article.description = req.body.description;
    article.markdown = req.body.markdown;

    // Save updated article
    article = await article.save();
    res.redirect(`/articles/${article.slug}`);
  } catch (e) {
    console.error(e);
    if (article) {
      res.render("articles/edit", { article: article });
    } else {
      res.redirect('/');
    }
  }
});

// DELETE route to remove an article
router.delete("/:id", async (req, res) => {
  try {
    await Article.findByIdAndDelete(req.params.id);
    res.redirect('/');
  } catch (e) {
    console.error(e);
    res.redirect('/');
  }
});

module.exports = router;
