import { read } from 'fs'
import Image from 'next/image'
import Head from 'next/head'



const BlogPost = {
  title: "My Blog Post",
  slug: "my-blog-post",
  content: [
    {
      type: "h1",
      value: "This is the content of my blog post"
    },
    {
    type: "paragraph",
    value: "This is the introduction to my blog post" 
  }, {
    type: "header image",
    value: "https://vektropol.dk/wp-content/uploads/2023/01/Webp-webdesign.webp" // webp format für bessere performane verwenden
  }, 
  {
    type: "h2",
    value: "Main topic of the blog post"
  },
  {
    type: "paragraph",
    value: "This is the main content of the blog post, explaining the main topic in detail"
  },
  {
    type: "h3",
    value: "A Subsection within the Main Topic"
  },
  {
    type: "paragraph",
    value: "Further explanation of the subsection "
  },
  {
    type: "h2",
    value: "Another Important Aspect"
  },
  {
    type: "main image",
    value: "https://vektropol.dk/wp-content/uploads/2023/01/Webp-webdesign.webp"
  },
  {
    type: "h2",
    value: "Conclusion & next steps"
  },
   {
    type: "paragraph",
    value: "Final thoughts and a summary of the key points of the blog post"
  },
  {
    type: "small image",
    value: "https://vektropol.dk/wp-content/uploads/2023/01/Webp-webdesign.webp"
  },

  ],
  author: "John Doe",
  date: "2021-01-01",
  tags: ["blog", "post", "example"],
  readingTime: "5 min",
  image: "https://vektropol.dk/wp-content/uploads/2023/01/Webp-webdesign.webp",
  
}





const Page = async ({params}: {params: Promise<{slug: string}>}) => {





  const resolvedParams = await params
  
  return <> 
  
  
  <Head> 
  <title>{BlogPost.title}</title>
  <meta name="description" content={BlogPost.content.find(c => c.type === "paragraph")?.value.slice(0, 160) || "Default description"} />
  <meta name="keywords" content="blog, post, example" />
  <meta name="author" content={BlogPost.author} />
  <meta name="date" content={BlogPost.date} />
  <meta name="robots" content="index, follow" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta property="og:title" content={BlogPost.title} />
  <meta property="og:description" content="This is the description of the blog post" />
  <meta property="og:type" content="article" />
  <meta property="og:url" content={`https://yourwebsite.com/blog/${BlogPost.slug}`} />
  <meta property="og:image" content={BlogPost.image} />
  <meta property="og:site_name" content="Your Website" />
  <meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content={BlogPost.title} />
<meta name="twitter:description" content={BlogPost.content.find(c => c.type === "paragraph")?.value.slice(0, 160) || "Default description"} />
<meta name="twitter:image" content={BlogPost.image} />



<script type='application/ld+json'>
{JSON.stringify({
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": BlogPost.title,
  "author": {
    "@type": "Person",
    "name": BlogPost.author
  },
  "datePublished": BlogPost.date,
  "image": BlogPost.image,
  "description": "This is the description of the blog post",
  "articleBody": BlogPost.content.map(content => content.value).join(" ")
})}
</script>
</Head>

  
   <div className="max-w-screen-lg mx-auto p-4">
    {resolvedParams.slug}
  <h1 className="text-5xl md:text-6xl font-bold text-center mb-6">{BlogPost.title}</h1>
  <p className="text-lg md:text-xl text-gray-600 text-center mb-4">
    By {BlogPost.author} - {BlogPost.date} - reading time: {BlogPost.readingTime}
  </p>
    

    <div className='blog-layout grid gap-6'>
    {
      BlogPost.content.map((content, index) => {
        switch(content.type) {
          case "paragraph":
          return <p key={index} className="text-lg md:text-xl leading-relaxed text-justify max-w-3xl">{content.value}</p>
          case "h1":
          return <h1 key={index} className="text-4xl md:text-5xl font-bold text-center mt-8 mb-4">{content.value}</h1>
        case "h2":
          return <h2 key={index} className="text-3xl md:text-4xl font-semibold text-center mt-8 mb-3">{content.value}</h2>
        case "h3":
          return <h3 key={index} className="text-2xl md:text-3xl font-medium text-center mt-4 mb-2">{content.value}</h3>

          case "header image":
          return (
          <div key={index} className='w-full flex justify-center'><Image src={content.value} alt={`${BlogPost.title} - ${content.type}`} width={1200} height={630} layout='responsive' priority={index === 0} loading='lazy' className='rounded-lg' />
          </div>)
          case "main image":
          return(<div key={index} className='w-full flex justify-center'><Image key={index} src={content.value} alt={`${BlogPost.title} - ${content.type}`} width={800} height={450} layout='responsive' loading='lazy' className='rounded-lg'/>
           </div>) //16:9 aspect ratio für bessere UX
          case "small image": 
          return (<div key={index} className='w-full max-w-xs mx-auto flex justify-center'><Image key={index} src={content.value} alt={`${BlogPost.title} - ${content.type}`} width={400} height={300} layout='responsive' loading='lazy' className='rounded-lg flex'/>
          </div>)
          default:  
          return null;
      
      }
    })
    }

    </div>
  </div>
  </>
}

export default Page 