import { SiteClient } from "datocms-client";

export default async function recieveCommunities(request, response){
  const TOKEN = process.env.TOKEN;
  
  const client = new SiteClient(TOKEN);

  if(request.method === 'POST') {
    const record = await client.items.create({
        itemType: '967967',
        ...request.body
      })

    response.json({
      community: record
    })
    
    return;
  }

  response.status(404).json({
    message: 'Only POST method'
  })
}