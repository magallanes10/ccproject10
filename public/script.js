function createStars() {
    for (let i = 0; i < 50; i++) {
        let star = document.createElement('div');
        star.className = 'star';
        star.style.top = `${Math.random() * 100}vh`;
        star.style.left = `${Math.random() * 100}vw`;
        star.style.animationDuration = `${Math.random() * 2 + 1}s`;
        document.querySelector('.stars').appendChild(star);
    }
}


function showPopup() {
    document.getElementById('welcomePopup').style.opacity = '1';
}

function closePopup() {
    let welcomePopup = document.getElementById('welcomePopup');
    welcomePopup.style.opacity = '0';
    setTimeout(function() {
        welcomePopup.style.display = 'none'; 
        document.querySelectorAll('.card').forEach((card, index) => {
            setTimeout(function() {
                card.style.opacity = '1';
            }, index * 200);
        });
    }, 500); 
}


function renderApiList() {
    const apiData = [
        { name: "AI Hercai", description: "Ask Questions with AI Powered By Hercai", usage: "/api/ai?ask=example" },
        {name: "CHATGPT 4o", description: "Ask Questions with GPT4o (credit: kenlie and clean response by Jonell Magallanes modification", usage: "/api/gpt4o?context=hi"},
        { name: "Appstate Getter", description: "Get your season key or Appstate using this api", usage: "/api/appstate?e=emailhere&p=password here"},
        { name: "Uptimer Robot", description: "Uptime 24/7 your website using this api", usage: "/api/create?name=website name&url=website url"}, 
        { name: "Random Bible Verse", description: "Get a Random Verse of Bible using thus API", usage: "/api/randomverse"},
        { name: "Youtube Mp3 Downloaer", description: "Can Download Music from youtube using youtube link", usage: "/api/music?url="},
        { name: "GPT 4", description: "Chat With GPT 4 AI", usage: "/api/gpt4?text=hi"},
        { name: "BlackBox AI", description: "This AI use commonly for write codes but can answer the question like not about codes (Tagalog language can't send it)", usage: "/api/blackbox?text=hi"},
        { name: "AlightMotion Info Getter", description: "This API Give you information about AlightMotion Project Also As AlightLink", usage: "/api/am?alighLink=" },
        { name: "SoundCloud", description: "Download The Song From SoundCloud", usage: "/api/sc?search="},
        { name: "Newgrounds Song ID Search", description: "Get Song Newgrounds Using Song ID", usage: "/api/ng?songid="},
        { name: "Google Drive Uploader", description: "Upload your file to Google Drive via URL FILE", usage: "/api/gdrive?url="},
        { name: "Capcut Downloder", description: "Allows You To download video from Capcut Template using url", usage: "/api/capcut?url="},
        { name: "ChatGPT", description: "Ask Questions With ChatGPT 3.5", usage: "/api/chatgpt?input="},
     //*   { name: "FB Cover V2", description: "Create Your Own Facebook Conver Using this API", usage: "/api/fbcoverv2?name=Harold&id=100036956043695&subname=cc&color=blue"}, { name: "FB Cover V3", description: "Create Own Facebook Cover Using Version 3", usage: "/api/fbcover/v3?uid=12345&name=Harold&birthday=01-01-2000&love=Idk&location=Pogi&hometown=idk&follow=Yes&gender=Male"},
        { name: "Tiktok Trend API", description: "Sends Response fyp or Trend TikTok Video [Only Based on PH]", usage: "/api/tiktrend"},
        { name: "Random Edit Video", description: "Allows you to watch random video random edit video from tiktok trends edit preset edit", usage: "/api/edit"},
        { name: "Emoji React Messages", description: "This API is use to react message from chat message every message reacted the bot based on the context of chats", usage: "/api/message/emoji?text="},
        { name: "Facebook Downloader", description: "Allows you to download video from Facebook video and even post and reels via url", usage: "/api/fbdl=url"},
        { name: "Geometry Dash Random Video", description: "Allows you to watch random videos from geometry dash content from TikTok :>", usage: "/api/gd"},
        { name: "Gemini AI", description: "Chat With Gemini AI New AI from Google LLM (ONLY TEXT)", usage: "/api/gen?ask="},
        { name: "Gemini Vision Pro", description: "Gemini Image Recognition to help you answer using image to describe", usage: "/api/geminivision?ask=&url="},
        { name: "GPT Conversational Continues", description: "Chat with GPT Feature Conversation Continue to interact the AI Continues and Chats", usage: "/api/gptconvo?ask=hello&id=1"},
        { name: "Riddle API", description: "Get Random Riddle Logic with Answer", usage: "/api/randomriddle"},
        { name: "Google Scholar", description: "Allows you to search the Documents like for research papers and sources of information library", usage: "/api/gs?q=biology"},
        { name: "Instagram Stalk", description: "This Api Allows you to stalk the user from Instagram", usage: "/api/insta/stalk?ig="},
        { name: "IP LOCATOR", description: "This API is to use to locate the users using ip adress but in public ip only", usage: "/api/ip?ipnum="}, { name: "LLMA AI", description: "Chat With LLMA AI Powered By Facebook", usage: "/api/meta? prompt="}, { name: "Pinterest Search Images", description: "Allows you to search images from Pinterest and browse", usage: "/api/pin?title=wallpaper&count=10"}, { name: "Remini API", description: "You want to increase the image use this api powered by Remini", usage: "/api/remini?imageUrl="},
        { name: "Remove Background API", description: "Allows you to ability to remove background for free powered by removebg.com", usage: "/api/rbg?imageUrl="}, { name: "TikTok Stalk User", description: "This API is to use to stalk the user from Tiktok In real time data", usage: "/api/tikstalk?unique_id="}, { name: "Tiktok Search Video", description: "This Api to browse the tiktok video based on the content title and hashtags", usage: "/api/tiktok/searchvideo?keywords="},
        {name: "Tiktok Downloader", description: "This API is to downloade the video from tiktok using url copylink", usage: "/api/tikdl=url"},
        {name: "TinyUrl", description: "This API ability to short the link using this api", usage: "/api/tinyurl?url="},
        { name: "Twitter Video Downloader", description: "This API to allowed to download the twitter videos", usage: "/api/twitter?url="}, { name: "DreamForth", description: "Search meaning your dreams want to know", usage: "/api/df?title=&page="}, { name: "Facebook UID Finder", description: "Get Uid using Url Profile Facebook", usage: "/api/fb?url="}, 
    ];

    let apiList = document.getElementById('api-list');
    apiList.innerHTML = '';

    apiData.forEach((api, index) => {
        let apiUrl = `${api.usage}`;
        let card = document.createElement('div');
        card.className = 'card mb-4';
        card.style.animationDelay = `${index * 0.1}s`; 
        card.innerHTML = `
            <div class="card-body">
                <h5 class="card-title">${api.name}</h5>
                <p class="card-text">${api.description}</p>
                <p class="card-text"><small class="text-muted">Usage: ${apiUrl}</small></p>
                <button class="btn btn-light-blue" onclick="tryApi('${apiUrl}')">Try API</button>
            </div>
        `;
        apiList.appendChild(card);
    });

    fadeInCards();
}



function tryApi(apiUrl) {
    window.location.href = apiUrl; 
}

createStars();


setTimeout(function() {
    createStars(); 
    showPopup();
}, 1000); 

document.querySelector('.popup-btn').addEventListener('click', function() {
    closePopup(); 
    renderApiList(); 
});
