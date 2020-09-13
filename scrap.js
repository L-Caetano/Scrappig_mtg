const request = require('request');
const cheerio = require('cheerio');
const fs = require("fs");
const readline = require('readline');
let haha = 0;
let deckvalor = 0;
 function procurar(procura,number){
request(`https://www.ligamagic.com.br/?view=cards%2Fsearch&card=${procura}+searchprod%3D0&tipo=1`, (error, response, html)=>{
    if(!error && response.statusCode == 200){
       const $ = cheerio.load(html);
        let preco = $('.price-min').text();
        preco = parseFloat(preco.slice(3).replace(/,/g, "."));
        //siteHeading = string(siteHeading);
       //siteHeading = siteHeading.substr(3, siteHeading.length);
      if(isNaN(preco)){
        preco = String($('.bigger'));
      // console.log('teste',preco);
        preco = parseFloat(preco.slice(21,-40).replace(/,/g, "."));
       // console.log('teste',preco);
     
       }
       if(!isNaN(number) && !isNaN(preco)){
deckvalor = parseFloat(((preco * number) + deckvalor));  
console.log('-------------------------------------');
console.log('carta',procura,'Row: ',haha,'Numero: ',number,'Preço: ',preco);
console.log('-------------------------------------');
 console.log('valor do deck atual: ',deckvalor);
      // console.debug(procura,preco,haha);
       haha++;
       //console.log(preco);
       }
    }
})

}
/*fs.readFile("Deck.txt", function(err, buf) {
  console.log(buf.toString());
});*/


async function processLineByLine() {
  const fileStream = fs.createReadStream('deck1.txt');

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });
  // Note: we use the crlfDelay option to recognize all instances of CR LF
  // ('\r\n') in input.txt as a single line break.

  for await (let line of rl) {
    
   line1= line;
    number = line1.slice(0,-(line1.length -1));
    number = parseInt(number);
   //console.log('linha',line,'number',number);
    line = line.slice(2).replace(/,/g, "%2C").replace(/ /g, "+");
   
 procurar(line,number); 
  //console.log("preco");
  //calculo(number);
  // console.log(`Line from file: ${line}`);

  }
}

/*function calculo(number){
deckvalor = (preco * number) + deckvalor;  
console.log(number,preco);
console.log(haha);
}*/
processLineByLine();
