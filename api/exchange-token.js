export default async (req,res) => {
    const client_id = process.env.NOTION_CLIENT_ID;
    const client_secret = process.env.NOTION_CLIENT_SECRET;
    const redirect_uri = 'https://vercel-backend-teal-sigma.vercel.app/api/exchange-token';

    const code = req.query.code;

    try {
        const response = await fetch('https://api.notion.com/v1/oauth/token', {
          method: 'POST',
          headers: {
            'Authorization': 'Basic ' + Buffer.from(`${client_id}:${client_secret}`).toString('base64'),
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            grant_type: 'authorization_code',
            code,
            redirect_uri
          })
        });
    
        const data = await response.json();
        console.log('Access Token:', data);
        
        
        res.redirect(`https://send-data-to-chrome-extension.vercel.app/?token=${data.access_token}`);
        // console.log(data.access_token);
        // res.status(201).json({data})
      } catch (err) {
        console.error(err);
        res.status(500).send('OAuth failed');
      }



}