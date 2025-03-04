import Link from 'next/link';
import Head from 'next/head';

const blogPosts = [
  {
    title: 'My first blog post',
    slug: 'my-first-blog-post',
    content: [
      { type: 'h1', value: 'This is the content of my first blog post' },
      { type: 'paragraph', value: 'This is the introduction to my first blog post' },

    ],
    author: 'John Doe',
    date: '2021-01-01',
    readingTime: '5 min',
    image: 'https://vektropol.dk/wp-content/uploads/2023/01/Webp-webdesign.webp',
    tags: ['blog', 'post', 'example'],
  },

  {
    title: 'My first blog post',
    slug: 'my-first-blog-post',
    content: [
      { type: 'h1', value: 'This is the content of my first blog post' },
      { type: 'paragraph', value: 'This is the introduction to my first blog post' },

    ],
    author: 'John Doe',
    date: '2021-01-01',
    readingTime: '5 min',
    image: 'https://vektropol.dk/wp-content/uploads/2023/01/Webp-webdesign.webp',
    tags: ['blog', 'post', 'example'],
  },

  {
    title: 'My first blog post',
    slug: 'my-first-blog-post',
    content: [
      { type: 'h1', value: 'This is the content of my first blog post' },
      { type: 'paragraph', value: 'This is the introduction to my first blog post' },

    ],
    author: 'John Doe',
    date: '2021-01-01',
    readingTime: '5 min',
    image: 'https://vektropol.dk/wp-content/uploads/2023/01/Webp-webdesign.webp',
    tags: ['blog', 'post', 'example'],
  },

];

const BlogListPage = () => {
  return (
    <>
      <Head>
        <title>All Blog Posts</title>
        <meta name="description" content="A list of all blog posts" />
        <meta name="keywords" content="blog, posts, list" />
      </Head>

      <div className='max-w-screen-lg mx-auto px-4'>
        <h1 className='text-5xl font-bold text-center mb-6'>All Blog Posts</h1>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {blogPosts.map((post, index) => (
            <div key={index} className='border p-4 rounded-lg shadow-lg'>
              <div className='mb-4'>
                <img src={post.image} alt={post.title} className='rounded-lg' width="100%" height="auto" />
              </div>
              <h2 className='text-3xl font-semibold'>{post.title}</h2>
              <p className='text-lg text-gray-600'>{post.content[0]?.value}</p>
              <p className='text-gray-500'>{post.author} {post.date} - {post.readingTime} reading time</p>
              <div className='mt-2'>
                {post.tags.map((tag, index) => (
                  <span key={index} className='inline-block bg-blue-100 text-gray-500 text-xs px-2.5 py-0.5 font-semibold rounded mr-2'>{tag}</span>
                ))}


              </div>
              
              <Link href={`/blog/${post.slug}`} className='text-blue-500 hover:underline mt-4 block'>
                Read more
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default BlogListPage;