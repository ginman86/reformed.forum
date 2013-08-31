var programs, feed;

$(document).ready(function () {
	
	loadPrograms();
	
	initFooter();

	var header = $("#header-main").html();
	$("[id^=header]").empty().append(header);
	$("div[data-role='page']").trigger('create');
	
	$(".summary").on
	("click", function(e) 
	{
		ko.contextFor(this);
		//loadSummary(this.)
	});	
});

function loadPrograms()
{		
	var self = this;
	
	$.getJSON
	(
		"http://ajax.googleapis.com/ajax/services/feed/load?v=1.0&q=" +
		"http://feeds.feedburner.com/ReformedForum?format=xml"  + 
	  	"&callback=?", 
		null, 
		function(response)
		{							
			if (response && response.responseData && response.responseData.feed) 
			{				
				feed = ko.mapping.fromJS(response.responseData.feed);
				ko.applyBindings
				(
					{
						entries: 		feed.entries,
		                arCategories:   
		                function(categories, data)
		                {
		                    console.log(data);
		                }    					
					}
				);
				$('#programs').trigger('create');	
			}
		}
	);
}
function initFooter()
{		
	var footer = $("#footer-main").html();
	$("[id^=footer]").empty().append(footer).trigger("create");

}





		
		

