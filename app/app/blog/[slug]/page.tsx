"use server"

import { H1, P } from "@/components/custom/text"
 const beispielBlog = {
  slug: "ki-modelle",
  title: "Was sind KI-Modelle und wie verändern sie unsere Welt?",
  reaadTime: 6,
  author: "Max Mustermann",
  keywords: ["KI", "Modelle", "Welt", "Vorhersagen", "Entscheidungen"],
  content:[
    {
      type: "heading 2",
      content: "Was ist ein KI-Modell?"
    },
    {
      type: "paragraph",
      content: "Ein KI-Modell ist ein mathematisches System, das darauf trainiert wird, Muster in großen Datenmengen zu erkennen und basierend darauf Vorhersagen oder Entscheidungen zu treffen. Dabei nutzen KI-Modelle Algorithmen aus dem Bereich des maschinellen Lernens, um sich eigenständig weiterzuentwickeln und ihre Genauigkeit stetig zu verbessern."
    },
    {   // Bild hinzufügen um bessere SEO zu haben
      type: "photo",          
      content: "https://example.com/ki-modelle.jpg",
      alt: "KI-Modelle"                             
    },
    {
      type: "heading 2",
      content: "Anwendungsbereiche von KI-Modellen"
    },
    {
      type: "paragraph",
      content: "KI-Modelle werden heute in zahlreichen Bereichen eingesetzt. Von personalisierten Empfehlungen in Online-Shops über autonome Fahrzeuge bis hin zu medizinischen Diagnosesystemen – die Einsatzmöglichkeiten sind enorm vielfältig und nehmen kontinuierlich zu. Dabei verändern KI-Modelle zunehmend ganze Branchen und ermöglichen innovative Lösungen, die vorher nicht denkbar waren."
    },
    {
      type: "heading 2",
      content: "Zukunftsaussichten von KI-Modellen"
    },
    {
      type: "paragraph",
      content: "Die Zukunft von KI-Modellen ist vielversprechend und bietet großes Potenzial für weitere bahnbrechende Entwicklungen. Gleichzeitig ist es entscheidend, ethische und gesellschaftliche Fragen zu berücksichtigen. Transparenz, Datenschutz und Fairness werden dabei entscheidend sein, um das Vertrauen der Menschen in KI-Technologien langfristig zu sichern."
    }
  ]
};

const BlogPostPage = ({ params }: { params: { blog: string } }) => {



  /*
  Frag ChatGPT wie man SEO freundliche Aritkel machen kann 
  welche Meta Tags man setzen muss, strukturierte Daten (jsonp), wie man diese in nextjs umsetzen kann 
  in Blog Artikel   
  -> Meta SEO FREUNDLICH WAS MUSS HTML ALLES DRIN SIND 
  -> Strukturierte Daten (jsonp) 

  MIT OPENAI API FUNKTION SCHREIBEN WIE MAN AUTOAMTISIERT blog Posts bekommt, es sollen auch dabei Bilder generiert werden  

  
  */


  return <div>BlogPostPage Hier sehen sie einen einzelnen blog post: {params.blog}
    <div>
      <H1>{beispielBlog.title}</H1>
      <P>{beispielBlog.reaadTime} Minuten Lesezeit</P>
      <P>{beispielBlog.author}</P>
    </div>
    {
      beispielBlog.content.map((content) => {
        switch (content.type) {
          case "heading 2":
            return <h2 key={content.type}>{content.content}</h2>
          case "paragraph":
            return <p key={content.type}>{content.content}</p>
          case "photo":
            return <img key={content.type} src={content.content} alt={content.alt} />   
          default:
            return null
        }
      })
    }
  </div>;
};

export default BlogPostPage;