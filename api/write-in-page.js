export default async (req, res) => {

    try {
      res.setHeader('Access-Control-Allow-Credentials', true);
      res.setHeader('Access-Control-Allow-Origin', '*'); 
      res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
      const {access_token, page_id, tweetUrl} = req.query;
      console.log("query : <..>",req.query);
      console.log(access_token, "     ",  page_id, "      ", tweetUrl);

  
      const response = await fetch(`https://api.notion.com/v1/blocks/${page_id}/children`, {
        method: "PATCH",
        headers: {
          "Authorization": `Bearer ${access_token}`,
          "Content-Type": "application/json",
          "Notion-Version": "2022-06-28"
        },
        body: JSON.stringify({
          children: [
            {
              object: "block",
              type: "embed",
              embed: {
                url: tweetUrl
              }
            }
          ]
        })
      });
    
      const data = await response.json();
      console.log("Bookmark added:", data);
      res.status(200).json({
        data,
        success: true
      })
    } catch (error) {
      console.log(error)
      res.status(401).json({
        success: false
      })
    }
  };
  