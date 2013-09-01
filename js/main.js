
var viewModels =
{
	programs: null,
	essays:   null
};

$(document).ready(function () {	
	access.loadPrograms();

	initFooter();

	$(".essayBtn").on
	('click', 
	function(e)
	{
		nav.essays();
	});

	var header = $("#header-main").html();
	$("[id^=header]").empty().append(header);	

});

var nav =
{
	essays:
	function()
	{
		if (viewModels.essays == null)
		{
			access.loadPosts();
		}
		else
		{
			ko.applyBindings(viewModels.essays, $('#essays').get(0));
		}
	}
};

var access = 
{
	loadPrograms:
	function ()
	{			
		var feed;
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
					viewModels.programs = feed.entries;
					ko.applyBindings(viewModels.programs(), $('#programs').get(0));
					$('#programs').trigger('create');	
				}
			}
		);
	},
	loadPosts:
	function ()
	{			
		var feed;
		$.getJSON
		(
			"http://ajax.googleapis.com/ajax/services/feed/load?v=1.0&q=" +
			"http://reformedforum.org/feed/?post_type=post"  + 
		  	"&callback=?", 
			null, 
			function(response)
			{							
				if (response && response.responseData && response.responseData.feed) 
				{				
					feed = ko.mapping.fromJS(response.responseData.feed);
					viewModels.essays = feed.entries;
					ko.applyBindings(viewModels.essays, $('#essays').get(0));
					$('#essays').trigger('create');	
				}
			}
		);
	},
};

function initFooter()
{		
	var footer = $("#footer-main").html();
	$("[id^=footer]").empty().append(footer).trigger("create");

}





		
		

