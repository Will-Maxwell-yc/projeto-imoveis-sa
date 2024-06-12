import React, {useState} from 'react'

const config = [
{
    title: "image01",
    image: 'https://images.adsttc.com/media/images/624c/abf4/0ba6/da01/66c7/d26d/newsletter/014-casa-dotta-galeria-733.jpg?1649191946'
}




]

const Carrossel = () => {
    const [count, setCount] = useState()
  return (
    <div>
      <image src={config} />
    </div>
  )
}

export default Carrossel
