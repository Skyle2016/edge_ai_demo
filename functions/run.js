async function handleEvent(event) {
  // parse prompt
  let body = await event.request.json();
  let data = body["data"]

  // call AI
  let result = await AI.txt2img(data[0], data[1]);

  event.respondWith(new Response(
                JSON.stringify(result)));
}

addEventListener('fetch', (event) => {
        handleEvent(event);
});
