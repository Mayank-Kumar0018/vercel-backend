export default async (req,res) => {
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*'); 
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
    const access_token = req.query.access_token;
    try {
        const notionData = await fetch("https://api.notion.com/v1/search", {
            method: "POST",
            headers: {
              "Authorization": `Bearer ${access_token}`,
              "Content-Type": "application/json",
              "Notion-Version": "2022-06-28"
            },
            body: JSON.stringify({
              query: "",
              filter: {
                value: "page",
                property: "object"
              }
            })
          })
    
          const rawData = await notionData.json();
        //   console.log(rawData);
          res.status(200).json({"data" : rawData});
    } catch (error) {
        console.log(error);
    }


    
}