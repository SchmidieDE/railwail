import { useParams } from "react-router-dom"
import api from "../../../lib/api"
import { useEffect, useState } from "react"

const ImageModel = () => {

  const { modelName } = useParams()
  const [imageUrl, setImageUrl] = useState<string | Boolean>(false)


  const handleGenerateImage = async () => {
    console.log(modelName, "MODEL NAME ")
    const response = await api.post("/image-models/generate", {
      //model: modelName
    })

    const convertedJson = await response.json()
    console.log(await convertedJson)
    setImageUrl(convertedJson.data.image_url)
    
  }

  useEffect(() => {
    handleGenerateImage()
  }, [])


  
    return <div>ImageModel {modelName}
    {imageUrl ? <img src={imageUrl as string} alt="Generated Image" /> : <p>Loading... gdfgdf</p>}
    </div>
}

export default ImageModel