$(document).ready(function() {
  console.log('Invoice js loaded');

  function callOffers() {
    $.ajax({
      type: 'GET',
      url: '../api/v0/nse/proposals',
      success: function(data) {
        console.log(data)
        if (data.error) {
          $('#response').text('Failed to create a purchase order')
          return false;
        } else {
          let offers = data.proposal;
          console.log(offers[0]);
          for (var i = 0; i < offers.length; i++) {
            var markup =
            `<tr>
                <td>${offers[i].id}</td>
                <td>${offers[i].invoiceId}</td>
                <td>${offers[i].dateOfCreation}</td>
                <td>${offers[i].interestRate}</td>
                <td>${offers[i].amount}</td>
                <td>${offers[i].numberOfDays}</td>
                <td>${offers[i].proposalStatus}</td>
            <tr>`;
            $("table tbody:last-child").append(markup);
          };

        };
      }
    });
  };
  callOffers();

  $('#btn-approve').click(function () {
    let input = $('#input').val();
    let payload = {
      proposalId: input,
      approve: true
    };
    $.ajax({
      type: 'POST',
      url: '../api/v0/nse/proposal/vendor/approve',
      dataType: 'json',
      data: payload,
      success: function(data) {
        console.log(data)
        if (data.error) {
          $('#response').text('Failed to accept offer')
          return false;
        } else {
          $('#response').text('Invoice discounting offer has been accepted')

          $.ajax({
            type: 'POST',
            url: '../api/v0/nse/proposal/corporation/approve',
            dataType: 'json',
            data: payload,
            success: function(data) {
              console.log(data)
              if (data.error) {
              $('#response').text('Failed to accept offer')
                return false;
              } else {
                $('#response').text('Invoice discounting offer has been accepted')
              };
            }
          });
        };
      }
    });



    return false;
  })
});
