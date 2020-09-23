class Journal{
  constructor(){
    this.modal=new Model();
    this.Validation=new Validation();
    this.Table=new Table();
    this.CurrentRowEl;
    this.Amount;
    this.Account;
    this.Description;
    this.JournalType;
    this.mode;
  }
  init=()=>{
    this.GetHtmlElements();
    this.modal.init();
    this.Table.init();
    this.mode='AdditionMode';
  }
  GetHtmlElements=()=>{
    $('input[type="radio"]').checkboxradio();
    $('select').selectmenu();
    $('input[name="datepicker"]').datepicker();
    document.querySelector('#mymodalBtn')
    .addEventListener('click',this.modal.openModel);
    document.querySelector('.OkModelbtn')
      .addEventListener('click',this.Setmode);
    document.querySelector('.CancelModelbtn')
      .addEventListener('click',this.Reset);
    document.getElementsByClassName("close")[0]
      .addEventListener('click',this.Reset);
    this.Account=document.getElementById('Account');
    this.Amount=document.getElementById('Amount');
    this.Description=document.getElementById('Description');
    this.JournalType= document.querySelector('input[name="journalType"]');    
  }
  Setmode=()=>{
    if(this.mode=='AdditionMode'){
      this.AddRecord();
      this.CheckBalance();
      return;
    }
    else{
      this.saveChanges();
      this.CheckBalance();
    }
  }
  AddRecord=()=> {
    if(this.HTMLVAlidations()){
      return;
    }
    var row=this.Table.CreateRow();
    var JournalTypechecked = document.querySelector('input[name="journalType"]:checked').id;
    this.Table.CreateCell(row,0,'p',this.Account.value);
    this.Table.CreateCell(row,1,'p',this.Description.value);
    this.Table.CreateCell(row,2,'p',this.Amount.value);
    this.Table.CreateCell(row,3,'p',JournalTypechecked);
    this.Table.CreateBtnCell(row,4,'button',' btn btn-danger glyphicon  glyphicon-trash col-md-12',' Delete',this.DeleteRecord);
    this.Table.CreateBtnCell(row,4,'button','btn btn-primary glyphicon glyphicon-pencil col-md-12',' Edit',this.EditRecord);
    this.Reset();
  }
  DeleteRecord=(e)=>{
    e.target.parentElement.parentElement.remove();
  }
  EditRecord=(e)=>{
   $('h4').val('Edit Journal');
    this.modal.openModel();
    this.CurrentRowEl=e.target.parentElement.parentElement;
    this.Account.value=this.CurrentRowEl.childNodes[0].value;
    this.Description.value=this.CurrentRowEl.childNodes[1].innerText;
    this.Amount.value=this.CurrentRowEl.childNodes[2].innerText;
    this.JournalType.value=this.CurrentRowEl.childNodes[3].innerText;
    this.mode='EditMode';
  }
  saveChanges=()=>{
    this.CurrentRowEl.childNodes[0].value=this.Account.value;
    this.CurrentRowEl.childNodes[1].innerText= this.Description.value;
    this.CurrentRowEl.childNodes[2].innerText= this.Amount.value;
    var JournalTypechecked = document.querySelector('input[name="journalType"]:checked').id;
    this.CurrentRowEl.childNodes[3].innerText= JournalTypechecked;
    this.mode='AdditionMode';
    this.Reset();
   }
  HTMLVAlidations=()=>{
    var DescriptionValidate=this.Validation.checkValidition(this.Description);
    var AmountValidate=this.Validation.checkValidition(this.Amount);
    var AccountValidate=this.Validation.checkValidition(this.Account);
    var journalTypeValidate=this.Validation.checkValidition(this.JournalType);
    if(AmountValidate || DescriptionValidate || AccountValidate || journalTypeValidate) {
      return true;
    }
    return false;
  }
  CheckBalance=()=>{
    var Totalcredit=0;
    var Totaldebit=0;
    var balance=0;
    this.table = document.getElementById('dataTable');
    var rowCount = this.table.rows.length;
    for(var i=0;i<rowCount;i++){
      if(this.table.rows[i].childNodes[3].innerText=='credit'){
        Totalcredit=Totalcredit+1;
        document.querySelector('.Totalcredit').innerText=Totalcredit;

      }
      else if(this.table.rows[i].childNodes[3].innerText=='Debit'){
        Totaldebit=Totaldebit+1;
        document.querySelector('.TotalDedit').innerText = Totaldebit;
      }
      if(Totalcredit>Totaldebit){
        balance=Totalcredit-Totaldebit;
      }else{
        balance= Totaldebit -Totalcredit;

      }
      document.querySelector('.Balance').innerText= balance;

   }
  }
  Reset=()=>{
    this.modal.resetModel();
    this.Validation.ResetRequiredMesseage();
    this.modal.closeModel();
  }
}
class Table{
  constructor(){
    this.table;
  }
  init=()=>{
    this.table = document.getElementById('dataTable');
  }
  CreateRow=()=>{
    var rowCount = this.table.rows.length;
    var rows = this.table.insertRow(rowCount);
    return rows;
  }
  CreateBtnCell=(Row,i,Element,type,text,method)=>{
    var BtnCell= Row.insertCell(i);
    var BtnEL = document.createElement(Element);
    BtnEL.className=type;
    BtnEL.innerText=text;
    BtnEL.addEventListener('click',method);
    BtnCell.appendChild(BtnEL);
  }
  CreateCell=(Row,i,Element,text)=>{
    var cellNo = Row.insertCell(i);
    var TextEl = document.createElement(Element);
    TextEl.innerText=text;
    cellNo.appendChild(TextEl);
  }
}
class Validation{
  constructor(){
    this.msgEl;
    this.CurrentEl;
   }
   init=(Element)=>{
    this.CurrentEl=Element;
    this.msgEl=document.getElementById(this.CurrentEl.dataset.validationlabel);
   }
  checkValidition=(Element)=>{
    this.init(Element);
    if(!this.CurrentEl.checkValidity()){
      this.ShowRequiredMesseage();
      return true;
    }
    else {
      this.ResetRequiredMesseage();
      return false;
    }
  }
  ShowRequiredMesseage=()=>{
    this.msgEl.className='required';
    this.msgEl.innerText=' '+ 'This field is Required';
  }
  ResetRequiredMesseage=()=>{
    this.msgEl.className='';
    this.msgEl.innerText='';

  }
}
class Model{
  constructor(){
    this.modal;
  }
  init=()=>{
    this.modal= document.getElementById("add-edit-journal");
  }
  openModel=()=>{
    this.modal.style.display = "block";
  }
  closeModel=()=>{
    this.modal.style.display = "none";
  }
  resetModel=()=>{
    $(":input").val("");
    if($('input[type="radio"]').val() !== "1"){
      $('input[type="radio"]').prop("checked",false);
    }
    $('input[type="radio"]').checkboxradio("refresh");
    $("select").selectmenu("refresh");
  }
}
var voucher = new Journal();
$(function() {
  voucher.init();
  });