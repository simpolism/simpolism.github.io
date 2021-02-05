/*
Format of post:
<div class="author-post single-post-show">
  <div class="post-content ">
    <div class="post-header">
      <h2 class="post-title">
        <a class="post-title" href="[link-to-post]">[Title]</a>
      </h2>
      <div class="post-date">March 5, 2019</div>
    </div>
    <div class="post-body">
      body contents
    </div>
  </div>
</div>
*/
async function queryBlog() {
  // TODO: error handling
  const blogResponse = await fetch('https://listed.to/@simpolism');
  const blogText = await blogResponse.text();

  const domparser = new DOMParser()
  const blogDoc = domparser.parseFromString(blogText, 'text/html');

  // locate and insert stylesheet
  const links = [ ...blogDoc.getElementsByTagName('link') ];
  const stylesheetLink = links.find((link) => {
    const rel = link.attributes.getNamedItem('rel');
    return rel.value === 'stylesheet';
  });
  console.log(stylesheetLink);

  // parse stylesheet url to add explicit domain
  const stylesheetUrl = stylesheetLink.attributes.getNamedItem('href').value;
  stylesheetLink.setAttribute('href', `https://listed.to${stylesheetUrl}`);
  document.head.appendChild(stylesheetLink);

  // locate posts and insert their headers
  const posts = [ ...blogDoc.getElementsByClassName('post-header') ];
  document.body.innerHTML = '<h1>Simpolism <a href="https://listed.to/@simpolism">Listed Blog</a> Master Index</h1>';
  for (const post of posts) {
    document.body.appendChild(post)
  }
}

queryBlog();