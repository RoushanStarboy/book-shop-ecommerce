async function randomQuote(){
  try {
    const response = await fetch('https://api.quotable.io/random');
    const quote = await response.json();
    const content = quote.content;
    const author = quote.author;
  
    return{content,author};
    
  } catch (error) {
    console.log(error.message);
    const content = "Thinking.....";
    const author = "Not Sure...";
    return{content,author};
  }
   
  
  }

export default randomQuote;