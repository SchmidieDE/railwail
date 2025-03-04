const BlogPost = {
  title: "My Blog Post",
  slug: "my-blog-post",
  content: [{
    type: "paragraph",
    value: "This is the content of my blog post" 
  }, {
    type: "image",
    value: "https://via.placeholder.com/150"
  }, {
    type: "h2",
    value: "This is the content of my blog post"
  }, {
    type: "h2",
    value: "This is the content of my blog post"
  }, {
    type: "paragraph",
    value: "This is the content of my blog post"
  }, {
    type: "paragraph",
    value: "This is the content of my blog post"
  }

  ],
  author: "John Doe",
  date: "2021-01-01",
  tags: ["blog", "post", "example"],
  image: "https://via.placeholder.com/150",
}


const Page = async ({params}: {params: Promise<{slug: string}>}) => {
  const resolvedParams = await params
  
  return <div>
    {resolvedParams.slug}
    {
      BlogPost.content.map((content) => {
        switch(content.type) {
          case "paragraph":
          return <p>{BlogPost.content[0].value}</p>
        case "image":
          return <img src={BlogPost.content[0].value} alt="Blog Post Image" />
      }
    })
    }
  </div>
}

export default Page 