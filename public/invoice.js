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
            var today = new Date();
            var dd = today.getDate();
            var mm = today.getMonth()+1; //January is 0!
            var yyyy = today.getFullYear();

            if(dd<10) {
                dd = '0'+dd
            }

            if(mm<10) {
                mm = '0'+mm
            }

            today = dd + '/' + mm + '/' + yyyy;
            var markup =
            `<tr>
                <td>${invoices[i].invoiceId}</td>
                <td>${invoices[i].requirementsId}</td>
                <td>${today}</td>
                <td>${invoices[i].vendorId}</td>
                <td>${invoices[i].amountRequested}</td>
                <td>12%</td>
                <td>${parseInt(invoices[i].amountRequested*1.12)}</td>
                <td>${invoices[i].requestStatus}</td>
            <tr>`;
            $("table tbody:last-child").append(markup);
          };
        };
      }
    });
  };
  callInvoice();
});
