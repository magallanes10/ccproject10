$(document).ready(function(){
    const apiData = [
        { name: "AI Hercai", description: "Ask Questions with AI Powered By Hercai", usage: "/api/ai?query=example" },
        { name: "AlightMotion Info Getter", description: "This API Give you information about AlightMotion Project Also As AlightLink", usage: "/api/am?alighLink=" },
        { name: "Capcut Downloder", description: "Allows You To download video from Capcut Template using url", usage: "/api/capcut?url="},
        { name: "ChatGPT", description: "Ask Questions With ChatGPT 3.5", usage: "/api/chatgpt?input="},
        { name: "Random Edit Video", description: "Allows you to watch random video random edit video from tiktok trends edit preset edit", usage: "api/edit"},
        { name: "Emoji React Messages", description: "This API is use to react message from chat message every message reacted the bot based on the context of chats", usage: "/api/text?content="}, { name: "Facebook Downloader", description: "Allows you to download video from Facebook video and even post and reels via url", usage: "/api/fbdl=url"}, { name: "Geometry Dash Random Video", description: "Allows you to watch random videos from geometry dash content from TikTok :>", usages: "/api/gd"}, { name: "Gemini AI", description: "Chat With Gemini AI New AI from Google LLM (ONLY TEXT)", usage: "/api/gen?ask="}, { name: "GPT Conversational Continues", description: "Chat with GPT Feature Conversation Continue to interact the AI Continues and Chats", usages: "/api/gptconvo?ask=hello&id=1"}, { name: "Google Scholar", description: "Allows you to search the Documents like for research papers and sources of information library", usage: "/api/gs?q=biology"}, 
        { name: "Instagram Stalk", description: "This Api Allows you to stalk the user from Instagram", usage: "/api/insta/stalk?ig="},
        { name: "IP LOCATOR", description: "This API is to use to locate the users using ip adress but in public ip only", usage: "/api/ip?ipnum="},  
        
        
    ];

    let apiList = $('#api-list');
    apiData.forEach(function(api) {
        let apiUrl = `${window.location.origin}${api.usage}`; // Constructing full API URL
        apiList.append(`
            <div class="card mb-4"> <!-- Added mb-4 class to create space between cards -->
                <div class="card-body">
                    <h5 class="card-title">${api.name}</h5>
                    <p class="card-text">${api.description}</p>
                    <p class="card-text"><small class="text-muted">Usage: ${apiUrl}</small></p>
                    <button class="btn btn-light-blue" onclick="tryApi('${apiUrl}')">Try API</button>
                </div>
            </div>
        `);
    });
});

function tryApi(apiUrl) {
    window.location.href = apiUrl; // Redirect to the API URL
}
