$(document).ready(function() {
  console.log('Invoice js loaded');

  function callInvoice() {
    $.ajax({
      type: 'GET',
      url: '../api/v0/nse/invoiceRequests',
      success: function(data) {
        // console.log(data)
        if (data.error) {
          $('#response').text('Failed to create a purchase order')
          return false;
        } else {
          let invoices = data.invoiceRequest;
          console.log(invoices[0]);

          for (var i = 0; i < invoices.length; i++) {
            $("#select-invoice").append("<option>"+invoices[i].id+"</option>");
          };
        };
      }
    });
  };
  callInvoice();

  $('#singlebutton').click(function () {
    let id = $('#offer-id').val();
    let invoiceRequestId = $('#select-invoice').val();
    let interestRate = $('#discount-rate').val();
    let amount = $('#amount').val();
    let numberOfDays = $('#duration').val();

    let payload = {
    "id": id,
    "invoiceRequestId": invoiceRequestId,
    "invoiceId": invoiceRequestId,
    "interestRate": interestRate,
    "amount": amount,
    "numberOfDays": numberOfDays
    };
    console.log(payload);
    $.ajax({
      type: 'POST',
      url: '../api/v0/nse/proposal',
      dataType: 'json',
      data: payload,
      success: function(data) {
        console.log(data)
        if (data.error) {
          $('#response').text('Failed to create a purchase order')
          return false;
        } else {
          $('#response').text('Purchase order has been created')
        };
      }
    });
    return false;
  });
});
