---
title: Learning What Ties This All Together!
date: "2020-04-30"
---

# The Story

Recently, I set myself the goal of learning more about Web Development. So, I thought, what better way than to create my own blog? I started by brushing off my rusty JavaScript skills (the last time I wrote anything in JavaScript was probably 2015), sat myself in a crash course on React.js, and in another course on gatsby.js, and I got to work.

I watched [this](https://www.youtube.com/watch?v=Ke90Tje7VS0) wonderful course on React.js by a channel named **Programming with Mosh**. I thoroughly enjoyed it, and I learnt a LOT about React's component-based system. Then, armed with that knowledge, I followed gatsby.js' [wonderful documentation](https://www.gatsbyjs.org/docs/), as well as some [video tutorials](https://www.youtube.com/watch?v=6YhqQ2ZW1sc). However, I find the best way to learn is always in practice. So, I set out looking for a template to get my hands dirty.

While doing research, I found [this](https://github.com/alxshelepenok/gatsby-starter-lumen) template, which was developed by Alexander Shelepenok. I knew about this, as I have recently been reading [Victor Zhou's Website](https://victorzhou.com/), and found out that he helped design the template, and his website itself is a prime example of it. However, this particular template was far too complicated for my needs. It had several features that I felt like I didn't really need with this blog (yet). These were things such as CMS compatibility, a docker deployment system, flow, jest (for testing, though I'll eventually need that), and more.

So, I came across this much more simple template here, which I was able to navigate with much more ease: [Link to Repository](https://github.com/gatsbyjs/gatsby-starter-blog). It was developed by Kyle Matthews, the founder of Gatsby.js. It's much more bare-bones, and I've been having a blast learning about all the nuances by diving deep into this template.

# What I learnt

I'd like to bring you through a brief journey of everything I've learnt so far. As someone completely new to web development, you'll be able to see all the oddly specific things I've learnt. If you're completely new to web development, this might be a useful guide for you. If not, well, I hope you at least get a little laugh out of this.

Anyway, to start off, I found I needed to learn about node.js, and in particular the package manager.

## Node.js Package Manager

Package managers are not unfamiliar to me, but it's always an interesting experiencing discovering a new one altogether. I'm very familiar with `homebrew` and `pip`, as I use those quite a lot on my local python environment on my mac. With web development, the new package management system I had to learn was `npm`. You can install npm yourself if you have homebrew with `brew install npm`.

Unsuprisingly, `npm` stands for "Node.js Package Manager", and is a quick and easy way to download javascript-related dependencies. No knowledge of node.js is necessary to use it, but it seems to be the standard that people use in order to set up their dependencies.

This includes, installing gatsby and react. To install the gatsby-cli (Command Line Interface) you simply enter `npm i -g gatsby-cli` into your command terminal. `i` means install, and `-g` means install globally (if that's what you want). It *should* install all dependencies for you, but if not, you can do `npm install npm-install-peers` and run `npm-install-peers`.

## Using Gatsby-CLI

If you follow Gatsby.js' [wonderful documentation](https://www.gatsbyjs.org/docs/) mentioned earlier, they bring you through the whole process of either cloning a template, or starting a website of your own. I highly suggest reading it, so I won't spoil the secrets for you here ;)

## Navigating and learning about the template

I never realised how much there would be to such a simple template. Looks really do deceive. Below, I have laid out everything I have learnt about the template, and exactly how it works. I'd like to bring to light the ingenious process of how gatsby.js dynamically creates web pages based on simple markdown files. I discuss it in detail below, but it's mind-blowing how interconnected and subtle the system is. As a programmer who has never done much web-development, this was really an eye-opener.

**Here's a reference tree-diagram of the file system, which will help in understanding what I am about to discuss:**

```
src
├── components
│   ├── bio.js
│   ├── layout.js
│   └── seo.js
├── pages
│   ├── 404.js
│   └── index.js
├── templates
│   └── blog-post.js
└── utils
    └── typography.js

content
├── assets
│   ├── gatsby-icon.png
│   └── profile-pic.jpg
└── blog
    ├── hello-world
    │   ├── 000011.JPG
    │   └── index.md
    ├── my-second-post
    │   └── index.md
    └── new-beginnings
        └── index.md
```

In general, my blog (as of 2020-04-30) contains two types of pages. What i'll call **regular pages**, and the **blog pages**. Regular pages are hard-coded, but the blog pages are much more interesting, as you'll see below.

# **Regular Pages**
Regular pages, that is, hard-coded pages (such as index.html and 404.html) are stored in `src/pages/`. Gatsby recognizes this, and these are compiled when `gatsby deploy` is run.

# **Blog Pages**
Each blog page (like the one you are reading now) is not _manually_ created. A template exists in `src/templates/blog-post.js` and the functions (made using a Node* API) written in `gatsby-node.js` create the pages dynamically by using a `GraphQL` query to query the posts from `/content/blog`. The files inside `/content/blog/` are markdown files.

### How are the markdown files processed?
The `content/blog` folder contains markdown files of the blog posts (like this one!). The path of these files is stored in gatsby-config.js, where the `gatsby-source-filesystem` plugin convers these files into nodes*. Then, the `gatsby-transformer-remark` plugin converts those nodes into `MarkdownRemark` nodes, which GraphQL can query later on.

*Note: "Node" is the name associated with all data added to Gatsby. I'm actually not too sure how this works. inside `gatsby-node.js`, there exists an `exports.onCreateNode()` function, which I don't fully understand. I tried looking into the documentation, but couldn't find much on it.

### How does the template work?

The template is essentially a React.js component, that works with the gatsby-node.js file (discussed later).

#### Data sources

It takes in three sources of data:
1. __**data**__\
an object that contains query data within src/templates/blog-post.js. This is passed in when GraphQL is run within the same javascript file. This particular query takes in the `slug` variable from `gatsby-note.js` and queries one markdown file's worth of data (this process is done recursively, as seen later).

This contains the following data:
 - Title of the website
 - Blog slug
 - Blog ID (GraphQL ID)
 - 160 Word excerpt of the article
 - Title of the blog
 - The date of the blog
 - The description of the blog

2. __**pageContext**__\
an object that contains data passed from `gatsby-node.js`. The `createPage()` function returns a dictionary that contains the `context` object, which is passed to the template file. The `context` object can be referenced using the keyword `pageContext`.

This contains the following data:
 - Blog slug
 - Blog title

According to [the guide](https://www.gatsbyjs.org/docs/why-gatsby-uses-graphql/), it's not highly suggested to pass all information as a context, as it often gets unweildy to manage as development progresses. So, only key identifying information is passed, and then subsequent queries are run.

3. __**location**__\
an object that contains information about the site URL, host name, port, protocol, etc. (_I'm not sure what sends this information_).

All three of these data sources are used to fill in the page

#### Populating the Page

First, it populates the **SEO**. That is, the *Search Engine Optimization*. This is essentially the metadata in the HTML. This is actually a component stored in `/src/components/seo.js`, which is used with the two properties `title = title={post.frontmatter.title}` and `description={post.frontmatter.description || post.excerpt}`, where `const post = data.markdownRemark`. Basically, it uses these input variables to populate the various metadata that allows search engines to accurately understand the content of the page, making it more attractive to the user. Upon further research, this is an entire marketing tool in and of itself, and something I might want to look into. However, we must push on.

Then, it populates the article, using a react.js `<article>` component. This takes in the `post.html`, `post.title`, etc. from `data`, and fills it in with the proper styling.

After that, the `<bio>` component is added, which is also yet another custom component stored in `/src/components/bio.js`. That does another graphQL query and fills in my picture, bio information, etc. as seen below.

Then, finally, the navigation component is added, with links to the next and previous blog.

### So, how does gatsby-node.js tie this all together?

It uses gatsby's node API, exposed through the `exports` object.

In particular, the `createPages()` method. This method takes in the parameters `graphQL` and `actions` from an object passed in (the template uses object deconstruction syntax: `createPages({graphQL, actions})`).

*  `graphQL` gives functionality to use the GraphQL query language to look at
*  `actions` contains the action `createPage` which actually creates the page (see below)

Within that, a GraphQL query retrieves the first 1000 markdown posts (in descending order), and parses their slug, and title. If you recognize this, this is what is passed as a context later.

A loop iterates through all instances (Gatsby.js calls them `edges`) and calls the `createPage()` action that determines the path of the blog post (based on the slug), the component to use (blog-post.js), and the context (slug and title). THIS is where the pages are created.

gatsby-node.js also calls exports.onCreateNode(), which I frankly have no idea what it does. I have been looking into the documentation on Gatsby.js' data storage system (which, as mentioned, is based on nodes), and I'm not entirely sure what the purpose of creating new nodes are, and how that affects anything. I believe this step retrieves a file path to the node, the node itself, and the slug of the posts, and stores that within the gatsby data system.

### Anything else?

There are a few more things that I have not yet gotten into, namely:
*  When the /content/assets/ folder is used
*  How `/src/utils/typography.js` interacts with the `gatsby-plugin-react-helmet` and `gatsby-plugin-typography` plugins (though, I think that's self-explanatory)
*  What `gatsby-browser.js` does

But these are mainly stylistic choices, that I might go into in a later blog post. I plan on adding more css-based styling, and javascript animations soon, so I hope I'll get to implementing that.

# Concluding Remarks

In all, this was an extremely insightful process, and I feel like I've learnt SO much about web development. I know I have barely even scratched the surface, but looking into all of this, and reading up on how all of this works together has been extremely fun. If you've gotten to this point of the blog post, I sincerely applaud you and thank you for your patience. I hope you enjoyed that read.

Until next time,\
\
\
Keith Choa

![This beautiful picture of Taal Volcano](./000016.JPG)