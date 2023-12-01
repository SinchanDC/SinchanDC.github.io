document.addEventListener("DOMContentLoaded", () => {
  const inputField = document.getElementById("input");
  const submitBtn = document.getElementById("submitBtn"); // Get the submit button by its ID

  // Function to handle the submission of input
  function sendMessage() {
    let input = inputField.value;
    inputField.value = ""; // Clear the input field
    output(input); // Process the input
  }

  // Event listener for the Enter key in the input field
  inputField.addEventListener("keydown", (e) => {
    if (e.code === "Enter") {
      sendMessage(); // Call the sendMessage function
    }
  });

  // Event listener for the click event on the Send button
  submitBtn.addEventListener("click", sendMessage); // Use the same sendMessage function for the click event
});

function output(input) {
  let product;

  // Regex remove non word/space chars
  // Trim trailing whitespce
  // Remove digits - not sure if this is best
  // But solves problem of entering something like 'hi1'

  let text = input.toLowerCase().replace(/[^\w\s]/gi, "").replace(/[\d]/gi, "").trim();
  text = text
    .replace(/ a /g, " ")   // 'tell me a story' -> 'tell me story'
    .replace(/i feel /g, "")
    .replace(/whats/g, "what is")
    .replace(/please /g, "")
    .replace(/ please/g, "")
    .replace(/r u/g, "are you");

    if ((product = compare(prompts, replies, text))) {
      addChat(input, product);
    } 
    else if (text.includes("time") || text.includes("date")) {
      displayDateTime();
    }
    // Handle weather requests
    else if (text.startsWith("weather in ")) {
      const city = text.replace("weather in ", "").trim();
      fetchWeather(city);}
      else {
      // No predefined answer found, so search Wikipedia
      searchWikipedia(input);
    }
  // Update DOM
 
}

function compare(promptsArray, repliesArray, string) {
  let reply;
  let replyFound = false;
  for (let x = 0; x < promptsArray.length; x++) {
    for (let y = 0; y < promptsArray[x].length; y++) {
      if (promptsArray[x][y] === string) {
        let replies = repliesArray[x];
        reply = replies[Math.floor(Math.random() * replies.length)];
        replyFound = true;
        // Stop inner loop when input value matches prompts
        break;
      }
    }
    if (replyFound) {
      // Stop outer loop when reply is found instead of interating through the entire array
      break;
    }
  }
  return reply;
}

function addChat(input, product) {
  const messagesContainer = document.getElementById("messages");

  let userDiv = document.createElement("div");
  userDiv.id = "user";
  userDiv.className = "user response";
  userDiv.innerHTML = `<img src="user.png" class="avatar"><span>${input}</span>`;
  messagesContainer.appendChild(userDiv);

  let botDiv = document.createElement("div");
  let botImg = document.createElement("img");
  let botText = document.createElement("span");
  botDiv.id = "bot";
  botImg.src = "bot-mini.png";
  botImg.className = "avatar";
  botDiv.className = "bot response";
  botText.innerText = "Typing...";
  botDiv.appendChild(botText);
  botDiv.appendChild(botImg);
  messagesContainer.appendChild(botDiv);
  // Keep messages at most recent
  messagesContainer.scrollTop = messagesContainer.scrollHeight - messagesContainer.clientHeight;

  // Fake delay to seem "real"
  setTimeout(() => {
    botText.innerText = `${product}`;
    textToSpeech(product)
  }, 2000
  )

}
function searchWikipedia(query) {
  const endpoint = `https://en.wikipedia.org/w/api.php?`;
  
  const params = new URLSearchParams({
    action: "query",
    list: "search",
    srsearch: query,
    format: "json",
    origin: "*" // This is necessary for CORS
  });

  const url = endpoint + params.toString();

  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data.query.search.length > 0) {
        const title = data.query.search[0].title;
        getWikiExtract(title, query);
      } else {
        addChat(query, "Sorry, I couldn't find an answer to your question.");
      }
    })
    .catch(error => {
      console.error('Error:', error);
      addChat(query, "There was an error processing your request.");
    });
}

function getWikiExtract(title, userQuery) {
  const endpoint = `https://en.wikipedia.org/w/api.php?`;

  const params = new URLSearchParams({
    action: "query",
    prop: "extracts",
    exintro: true,
    explaintext: true,
    titles: title,
    format: "json",
    origin: "*" // This is necessary for CORS
  });

  const url = endpoint + params.toString();

  fetch(url)
    .then(response => response.json())
    .then(data => {
      const page = data.query.pages;
      const pageId = Object.keys(data.query.pages)[0];
      const extract = page[pageId].extract;
      addChat(userQuery, extract);
    })
    .catch(error => {
      console.error('Error:', error);
      addChat(userQuery, "There was an error processing your request.");
    });
}

function displayDateTime() {
  const now = new Date();
  addChat("date and time in IST", now.toLocaleString()); // Adjust to your preferred format
}
function fetchWeather(city) {
  const apiKey = '46d611924601b666a63b47f8b4607153'; // Replace with your actual API key
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      const weather = `The weather in ${city} is ${data.weather[0].description} with a temperature of ${data.main.temp}°C.`;
      addChat("weather in "+ city, weather);
    })
    .catch(error => {
      console.error('Error:', error);
      addChat("system", "I'm unable to fetch the weather at this time.");
    });
}
