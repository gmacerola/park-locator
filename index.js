//API Key - 214qEA18yQLXg4vSGZLQtMa5X4pFMmmhebOmZuV0
//Example - https://developer.nps.gov/api/v1/parks?parkCode=acad&api_key=214qEA18yQLXg4vSGZLQtMa5X4pFMmmhebOmZuV0
//State Example - https://developer.nps.gov/api/v1/parks?stateCode=tx&api_key=214qEA18yQLXg4vSGZLQtMa5X4pFMmmhebOmZuV0

const apiKey = "214qEA18yQLXg4vSGZLQtMa5X4pFMmmhebOmZuV0";
const searchURL = "https://developer.nps.gov/api/v1/parks";

function formatQueryParams(params) {
  const queryItems = Object.keys(params).map(
    (key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
  );
  return queryItems.join("&");
}

function displayResults(responseJson) {
  console.log(responseJson);
  $("#results-list").empty();
  for (let i = 0; i < responseJson.data.length; i++) {
    $("#results-list").append(
      `<li><h3>${responseJson.data[i].name}</h3>
            <p>${responseJson.data[i].name}</p>
            <p>${responseJson.data[i].url}</p>
            </li>`
    );
  }
  $("#results").removeClass("hidden");
}

function getParks(query, limit = 10) {
  const params = {
    api_key: apiKey,
    stateCode: query,
    limit,
  };

  const queryString = formatQueryParams(params);
  const url = searchURL + "?" + queryString;

  console.log(url);

  fetch(url)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then((responseJson) => displayResults(responseJson))
    .catch((err) => {
      $("#js-error-message").text(`Something went wrong: ${err.message}`);
    });
}

function watchForm() {
  $("form").submit((event) => {
    event.preventDefault();
    const state = $("#js-search-term").val();
    const maxResults = $("#js-max-results").val();
    getParks(state, maxResults);
  });
}

$(watchForm());
