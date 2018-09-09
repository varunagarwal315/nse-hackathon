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

    let payload = {
      invoiceRequestId: invoiceRequestId
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
