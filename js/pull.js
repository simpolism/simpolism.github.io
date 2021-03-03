async function queryBlog() {
  // TODO: error handling
  const blogResponse = await fetch('https://listed.to/@simpolism');
  const blogText = await blogResponse.text();

  const domparser = new DOMParser()
  const blogDoc = domparser.parseFromString(blogText, 'text/html');

  // locate posts and insert their headers
  const posts = [ ...blogDoc.getElementsByClassName('post-header') ];
  
  // dedup posts (had a weird double publish for one of them)
  const dedupedPosts = { };
  for (const post of posts) {
    try {
      const title = post.childNodes[0].childNodes[0].textContent;
      if (!dedupedPosts[title]) {
        dedupedPosts[title] = post;
      } else {
        const date = post.childNodes[1].textContent;
        console.log(`Skipping duplicate post "${title}" (${date}).`);
      }
    } catch (e) {
      console.error('Failed to locate title for post:', post);
    }
  }

  const loadingText = document.getElementById('loading');
  document.body.removeChild(loadingText);
  document.body.append(...Object.values(dedupedPosts));
}

queryBlog();
