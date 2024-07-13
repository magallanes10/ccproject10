const apis = [
  {
      name: "FB COVER",
      description: "Create Own Facebook Cover Use this Api",
      url: "/api/fbcover?name=Harold Hutchins &color=blue&address=Bahay ng Mga Pogi&email=pogi@gmail.com&subname=ccproject&uid=100036956043695&sdt=0973626171892"
  },
  {
      name: "FB COVER V2",
      description: "Create Own Facebook Cover Version 2",
      url: "/api/fbcoverv2?name=Harold&id=100036956043695&subname=haroldcc&color=blue"
  },
  {
      name: "FB COVER V3",
      description: "Create your Own Facebook Cover Using Version 3",
      url: "http://localhost:8080/api/fbcover/v3?uid=100036956043695&name=Harold&birthday=01-01-2000&love=Idk&location=Philippines &hometown=SanEnrique&follow=Yes&gender=Male"
  }
];

const apiCardsContainer = document.getElementById('api-cards');

apis.forEach(api => {
  const card = document.createElement('div');
  card.className = 'col-md-4';
  card.innerHTML = `
      <div class="card text-center">
          <div class="card-body">
              <h5 class="card-title">${api.name}</h5>
              <p class="card-text">${api.description}</p>
              <a href="${api.url}" class="btn btn-primary">TRY API</a>
          </div>
      </div>
  `;
  apiCardsContainer.appendChild(card);
});
