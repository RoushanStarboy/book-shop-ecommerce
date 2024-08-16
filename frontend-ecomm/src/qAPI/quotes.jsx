async function randomQuote(){
  try {
    const response = await fetch('https://api.api-ninjas.com/v1/quotes?category=happiness',{
      headers: {
        'X-Api-Key': 'HPrGlclFfEP+RumTwvy8Dg==uvwfpc6nVR1aS93S'
    }});
    const quotes = await response.json();
    const content = quotes.quote;
    const author = quotes.author;
  
    return{content,author};
    
  } catch (error) {
    console.log(error.message);
    const content = "Thinking.....";
    const author = "Not Sure...";
    return{content,author};
  }
   
  
  }

export default randomQuote;