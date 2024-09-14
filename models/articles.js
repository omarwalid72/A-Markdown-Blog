const mongoose = require('mongoose')
const slugify = require('slugify')
const createDomPurify = require('dompurify')
const {marked} = require('marked')
const { JSDOM } = require('jsdom')
const dompurify = createDomPurify(new JSDOM().window)

const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  markdown: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  slug: {
    type: String,
    required: true,
    unique: true
  },
  sanitizedHtml: {
    type: String,
    required: true
  }
})

articleSchema.pre('validate', function(next) {
  try {
    if (this.title) {
      this.slug = slugify(this.title, { lower: true, strict: true });
    }

    if (this.markdown) {
      const html = marked(this.markdown);
      console.log("Converted HTML:", html);
      this.sanitizedHtml = dompurify.sanitize(html);
      console.log("Sanitized HTML:", this.sanitizedHtml);
    }
  } catch (error) {
    console.error("Error in Markdown or Dompurify processing:", error);
  }

  next();
});


module.exports = mongoose.model('Article', articleSchema)