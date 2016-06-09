
function getQueryParams(qs) {
    qs = qs.split("+").join(" ");
    var params = {},
        tokens,
        re = /[?&]?([^=]+)=([^&]*)/g;

    while (tokens = re.exec(qs)) {
        params[decodeURIComponent(tokens[1])]
            = decodeURIComponent(tokens[2]);
    }
    return params;
}
var $_GET = getQueryParams(document.location.search);

var api_endpoint = "http://invoicer-api.3pjw7ca4hi.us-east-1.elasticbeanstalk.com/invoice/";
$(document).ready(function() {
	var invoiceid = $_GET['invoiceid'];
	if (invoiceid == undefined) {
		invoiceid = "1";
	}
    $('.desc-invoice').replaceWith("Showing invoice ID " + invoiceid);
    $.ajax({
        url: api_endpoint + invoiceid
    }).then(function(invoice) {
		$('.invoice-details').replaceWith("<p>Invoice ID " + invoice.ID + " has amount $" + invoice.amount + "</p>");
    });
});

$(document).ready(function() {
    $("form#invoiceGetter").submit(function(event) {
        event.preventDefault();
    	$('.desc-invoice').replaceWith("Showing invoice ID " + $("#invoiceid").val());
        $.ajax({
            type: "GET",
            url: api_endpoint + $("#invoiceid").val(),
        }).then(function(invoice) {
	 	   $('.invoice-details').replaceWith("<p>Invoice ID " + invoice.ID + " has amount $" + invoice.amount + "</p>");
    	});
	});
});
