async function randomQuote(){
    const response = await fetch('https://api.quotable.io/random');
    const quote = await response.json();
    const content = quote.content;
    const author = quote.author;
  
    return{content,author}
  
  }

export default randomQuote;