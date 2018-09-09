$(document).ready(function() {
  console.log('Corp js loaded');

  function getAllRequirements() {
    $.ajax({
      type: 'GET',
      url: '../api/v0/nse/requirements',
      success: function(data) {
        // console.log(data)
        if (data.error) {

          return false;
        } else {
          console.log(data);
          let requirements = data.requirements;
          for (var i = 0; i < requirements.length; i++) {
            $("#select-po").append("<option>"+requirements[i].id+"</option>");
          };
        };
      }
    });
  };

  getAllRequirements();


  $('#btn-create-invoice').click(function () {
    //
    // tx.id = 'vendor1234' + req.body.invoiceId;
    // tx.amountRequested = parseFloat(req.body.amountRequested);
    // tx.invoiceId = req.body.invoiceId;
    // tx.requirementsId = req.body.requirementsId;

    let payload = {
      invoiceId: $('#invoice-id').val(),
      amountRequested: $('#invoice-amount').val(),
      requirementsId: $("#select-po").val()
    };
    console.log(payload);

    $.ajax({
      type: 'POST',
      url: '../api/v0/nse/invoiceRequests',
      dataType: 'json',
      data: payload,
      success: function(data) {
        console.log(data)
        if (data.error) {
          $('#response').text('Failed to create an invoice request')
          return false;
        } else {
          $('#response').text('Invoice request has been created')
        };
      }
    });
    return false;
  });
});
