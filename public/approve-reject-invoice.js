$(document).ready(function() {
  console.log('Corp js loaded');

  function getInvoiceRequest() {

  };

  $('#btn-approve').click(function () {
    let id = $('#po-number').val();
    let description = $('#po-desc').val();
    let vendorId = $('#issue-to').val();
    let amount = $('#po-value').val();
    let payload = {
  	"id": id,
  	"corporationId": "corporation1234",
  	"description": description,
  	"vendorId": vendorId
    };
    console.log(payload);
    $.ajax({
      type: 'POST',
      url: '../api/v0/nse/invoiceRequests/approve',
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

  $('#btn-reject')
});
