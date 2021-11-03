async function queryBlog() {
  // TODO: error handling
  const blogResponse = await fetch('https://listed.to/@simpolism');
  const blogText = await blogResponse.text();

  const domparser = new DOMParser()
  const blogDoc = domparser.parseFromString(blogText, 'text/html');

  // locate posts and insert their headers
  const posts = [ ...blogDoc.getElementsByClassName('post-header') ];

  const loadingText = document.getElementById('loading');
  document.body.removeChild(loadingText);
  document.body.append(...posts);
}

queryBlog();
