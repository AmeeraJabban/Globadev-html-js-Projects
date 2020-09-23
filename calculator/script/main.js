class CalculatorClass{
  constructor(){
    this.FirstNum='';
    this.SecondNum='';
    this.Operator='';
    this.Result=0;  
  } 
  init=()=>{ 
    var EqualEl=document.getElementsByClassName("Equal");     
    EqualEl[0].addEventListener("click",this.Calculate);      //  addEventListener for ( = ) button 
    var NumbersEl=document.getElementsByClassName("Num");
    for(var i=0; i<=NumbersEl.length; i++){
      NumbersEl[i].addEventListener("click",this.SetEqualationNumbers,false);   //  addEventListener for ( Numbers ) buttons to get the numbers
   } 
    var resetEL=document.getElementsByClassName("reset");
    resetEL[0].addEventListener("click",this.Clear);         //  addEventListener for ( C ) button to reset the numbers
    
    var OperatorEl=document.getElementsByClassName("Oper");
    for(var i=0; i<=OperatorEl.length; i++){
      OperatorEl[i].addEventListener("click",this.SetEqualationOperator,false);    //  addEventListener for ( + - * / ) buttons to get the opreator
    }       
  }
  SetEqualationNumbers=(e)=>{  
    if(this.Operator==''){
      this.FirstNum+=e.target.value;  
      this.UpdateDisplay(this.FirstNum);
    }
    else{
      this.SecondNum+=e.target.value;
      this.UpdateDisplay(this.SecondNum);
    }
  }
  SetEqualationOperator=(e)=>{
    this.Operator=e.target.value;
    this.UpdateDisplay(this.Operator);
  }
  Calculate=()=>{
    this.FirstNum=parseInt(this.FirstNum);
    this.SecondNum=parseInt(this.SecondNum);
    switch (this.Operator){
      case "+":
        this.Result=this.FirstNum + this.SecondNum;
        break;
      case "-":
        this.Result=this.FirstNum - this.SecondNum;
        break;
      case "*":
        this.Result=this.FirstNum * this.SecondNum;
        break;
      case "/":
        this.Result=this.FirstNum / this.SecondNum;
        break;
    } 
    this.UpdateDisplay(this.Result);
    this.Clear();
  } 
  Clear=()=>{
    this.FirstNum="";
    this.SecondNum="";
    this.Operator="";
    this.Result=0;
  }
  UpdateDisplay=(value)=>{   
    document.getElementsByClassName("result")[0].innerHTML=value;
  }
}


document.onreadystatechange =()=>{
if (document.readyState== "complete"){
    var Calculator=new CalculatorClass();
    Calculator.init();
  }
} 

