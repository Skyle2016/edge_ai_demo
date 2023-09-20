import { getImage } from "./sample-image-urls.ts"
import { inference } from "./inference.js"

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event))
})

async function handleRequest(event) {
  let image = getImage()
  let img_url = `https://skltestai.edgeone.app/assets/${image.text}.jpg`

  let ret = await inference(img_url)
  /*
    { text: 'cat', value: 'https://i.imgur.com/CzXTtJV.jpg' }
    [
      [ {id:'n02124075',index:285,name:'Egyptian cat',probability:0.5033462942712219},
        {id:'n02123045',index:281,name:'tabby',probability:0.08080420522187998},
        {id:'n04522168',index:883,name:'vase',probability:0.056484122961857376},
        {id:'n02127052',index:287,name:'lynx',probability:0.03964573354704083},
        {id:'n02123159',index:282,name:'tiger cat',probability:0.025724733865576475}
      ],
      0.167
    ]
  */

  let output = {
    'name': ret[0][0].name,
    'probability': ret[0][0].probability,
    'inference speed': ret[1],
  }

  let jsonret = JSON.stringify(output)

  let html = `
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>image classify demo</title>
</head>
<body>

<h1>inference</h1>
<image src="${img_url}" height="224" width="224"></image>
<p>${jsonret}</p>

</body>
</html> 
`

  return new Response(html, {
    headers: {
      "Content-Type": "text/html",
    }
  })
}