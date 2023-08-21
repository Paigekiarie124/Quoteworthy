const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn  = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

//show loading

 
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

//hide loading
function complete () {
    if(!loader.hidden) {
        quoteContainer.hidden = false
        loader.hidden = true;
    }
}



let apiQuotes = [];

//show New Quote
function newQuote() {
    //pick a random quote from apiQuotes array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

    // if author field is blank'
    if(!quote.author) {
        authorText.textContent = 'unknown';
    } else {
        authorText.textContent = quote.author;
    }

    // check quote length for styling
    if (quote.text.length >50) {
        quoteText.classList.add('long-quote'); 
    } else {
        quoteText.classList.remove ('long-quote');
    }


    quoteText.textContent = quote.text;

}

// get Quotes from API
async function getQuotes() {
    loading();
    const apiUrl = 'https://type.fit/api/quotes';
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();

    //stop lader, show quote
    complete();
    } catch (error) {
        //catch error here
    }
}

//Tweet Quote

//tweet a quote 
function tweetQuote() {
    const twitterURL = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterURL, '_blank');
}

//event listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

//on load
getQuotes();

