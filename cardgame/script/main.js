class Card{
   constructor(value,suit) {
        this.CardValue = value;
        this.CardSuit = suit;       
    }
}
class CardEngine{
    constructor(){
        this.Deck = [];  
        this.GroundCards=[];     
        this.PlayerOneCards;
        this.PlayerTwoCards; 
        this.PlayerTurn=false;
        this.CurrentCardEl;
        this.MessageEl;
    }
    init=()=>{
        this.GetHtmlElements();
        this.BuildDeck();
        this.shuffleDeck();
        this.Deal();
    } 
    GetHtmlElements=()=>{
        this.CurrentCardEl=document.querySelector('.groundCards');
        this.MessageEl=document.querySelector('.message');
        document.querySelector(".PlayerOneCards")
            .addEventListener('click',this.playerOneTurn);
        document.querySelector(".PlayerTwoCards")
            .addEventListener('click',this.playerTwoTurn);
        document.querySelector(".Resetbtn")
            .addEventListener('click',this.Reset);
    }
    BuildDeck=()=>{
        var cards = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13"];
        var suits = ["diamonds", "hearts", "spades", "clubs"];
        for(var i = 0; i < suits.length; i++){
            for(var j = 0; j < cards.length; j++){
                var card=new Card(cards[j],suits[i])
                this.Deck.push(card);
            }      
        }       
    }  
    shuffleDeck=()=>{
        for (var i = 0; i < this.Deck.length; i++){
            var location = Math.floor((Math.random() * this.Deck.length));
            var tmp = this.Deck[i];
            this.Deck[i] = this.Deck[location];
            this.Deck[location] = tmp;
        }
    }   
    Deal=()=>{
        this.PlayerOneCards=this.Deck.slice(0, 26);
        this.PlayerTwoCards=this.Deck.slice(26,52);
    }  
    playerOneTurn=(e)=>{
        if(this.PlayerTurn){
            this.DisplayMessage('Player Two Turn');
            return;
        }
        this.PlayerTurn=true; 
        this.DisplayMessage('');   
        if(!this.CheckPlayerCardMatch(this.PlayerOneCards)){
            var LastCard=this.PlayerOneCards.pop();
            this.GroundCards.push(LastCard);                  
            this.showGroudCard(LastCard);    
        }
        if(this.PlayerOneCards.length==0){
            this.DisplayMessage('Player Two Is The Winner with:'+ this.PlayerTwoCards.length + 'Card');
            this.Reset();
        }
    } 
    playerTwoTurn=(e)=>{
        if(!this.PlayerTurn){
            this.DisplayMessage('Player One Turn');
            return;
        }
        this.PlayerTurn=false;
        this.DisplayMessage(''); 
        if(!this.CheckPlayerCardMatch(this.PlayerTwoCards)){
            var LastCard=this.PlayerTwoCards.pop();
            this.GroundCards.push(LastCard);                  
            this.showGroudCard(LastCard);
        }
        if(this.PlayerTwoCards.length==0){
            this.DisplayMessage(' Player One Is The Winner with:'+ this.PlayerOneCards.length + 'Card');
            this.Reset();
        }
    } 
    CheckPlayerCardMatch=(PlayerCards)=>{
        if(!this.GroundCards.length>0){
            return;
        }
        var CurrentGroundCardValue=this.GroundCards[this.GroundCards.length-1].CardValue;
        var PlayerLastCardValue=PlayerCards[PlayerCards.length-1].CardValue;
        if(CurrentGroundCardValue==PlayerLastCardValue){ 
            this.moveGroundCardToPlayerCards(this.PlayerTwoCards);
            this.DisplayMessage('the cards are Matched'); 
            this.ResetPlayGround();
            return true;
        }
        return false;
    }
    moveGroundCardToPlayerCards=(playercards)=>{ 
        for(var i=0;i<this.GroundCards.length;){
            playercards.push(this.GroundCards[i]);
            this.GroundCards.shift();
        } 
    }
    showGroudCard=(Card)=>{
        this.CurrentCardEl.className=Card.CardSuit;
        this.CurrentCardEl.innerText=Card.CardValue; 
    }
    ResetPlayGround=()=>{
        this.CurrentCardEl.className='';
        this.CurrentCardEl.innerText='.'; 
    }
    Reset=()=>{
        this.PlayerTurn=false;
        this.BuildDeck();
        this.shuffleDeck();
        this.Deal();
        this.ResetPlayGround();
    }
    DisplayMessage=(text)=>{
        this.MessageEl.innerHTML=text;
    }          
}
var CardsGame = new CardEngine();
document.onreadystatechange =()=>{
  if (document.readyState== "complete"){
    CardsGame.init();
  }
} 