// increase exclusive value
document.getElementById('increase-exclusive').addEventListener('click', function(){
        getCostUpdate(true, 'exclusive', 'exclusive-show');
});
// decrease exclusive value
document.getElementById('decrease-exclusive').addEventListener('click', function(){
        getCostUpdate(false, 'exclusive', 'exclusive-show');
});
// increase economy value
document.getElementById('increase-economy').addEventListener('click', function(){
    getCostUpdate(true, 'economy', 'economy-show');
});
// decrease economy value
document.getElementById('decrease-economy').addEventListener('click', function(){
    getCostUpdate(false, 'economy', 'economy-show');
});

// ticket input & update
function getInputUpdate(ticketInput){
    let inputNum = document.getElementById(ticketInput).value;
    let inputCount = parseInt(inputNum);
    return inputCount;
}
// ticket cost & update
function getCostUpdate(isChange, ticketInput, costShow){
    let ticketInputCount = getInputUpdate(ticketInput);
    let totalInputTicket = ticketInputCount;
    if(isChange == false && totalInputTicket > 0){
        totalInputTicket = ticketInputCount - 1;
    }
    if(isChange == true){
        totalInputTicket = ticketInputCount + 1;
    }
    document.getElementById(ticketInput).value = totalInputTicket;

    let ticketCost = 0;
    if(ticketInput == 'exclusive'){
        ticketCost = totalInputTicket * 150;
    }
    if(ticketInput == 'economy'){
        ticketCost = totalInputTicket * 100;
    }
    document.getElementById(costShow).innerHTML = ticketCost;

    calculateTotal();
}
// final calculate including vat
function calculateTotal(){
    let exclusiveTicketInputCount = getInputUpdate('exclusive');
    let economyTicketInputCount = getInputUpdate('economy');
    let totalTicketCost = exclusiveTicketInputCount * 150 + economyTicketInputCount * 100;



    document.getElementById('gross-total').innerHTML = totalTicketCost;
    let tax_vat = Math.round( totalTicketCost * 0.1);
    document.getElementById('vat').innerHTML = tax_vat;
    let finalTotal = totalTicketCost + tax_vat;
    document.getElementById('grand-total').innerHTML = finalTotal;
    return finalTotal;
}
// success & unsuccess details 
document.getElementById('submit-btn').addEventListener('click', function(){
    let finalTotal = document.getElementById('grand-total').innerHTML;
   
    if(finalTotal == 0){
        let unSuccess = document.getElementById('unsuccess-booking');
        unSuccess.style.display = 'block';
        let success = document.getElementById('booking-success');
        success.style.display = 'none';
    }else{
        let unSuccess = document.getElementById('unsuccess-booking');
        unSuccess.style.display = 'none';
        let success = document.getElementById('booking-success');
        success.style.display = 'block';

        let exclusiveTicketInputCount = getInputUpdate('exclusive');
        document.getElementById('exclusive-purchased').innerHTML = exclusiveTicketInputCount;

        let economyTicketInputCount = getInputUpdate('economy');
        document.getElementById('economy-purchased').innerHTML = economyTicketInputCount;

        let totalPurchasedTicket = exclusiveTicketInputCount + economyTicketInputCount;
        document.getElementById('total-purchased-ticket').innerHTML = totalPurchasedTicket;

       let finalTotal =  calculateTotal();
       document.getElementById('success-total-cost').innerHTML = finalTotal;
    }
});
