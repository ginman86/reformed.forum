var viewModels, nav, access, currentSearchTerm;

viewModels =
{
	podcasts: null,
	essays:   null,
	search:   null
};

$(document).ready(function () {	
	access.loadViewModels();	

	initFooter();

	$(".essayBtn").on
	('click', 
	function(e)
	{
		nav.essays();
	});

	$(".programBtn").on
	('click', 
	function(e)
	{
		nav.podcasts();
	});

	var header = $("#header-main").html();
	$("[id^=header]").empty().append(header);	

	$("div[data-role='collapsible-set']").hide();

	$('.search-mini').keyup
	(function(e)
	{
		currentSearchTerm = $(this).val();
		if (e.keyCode === 13) nav.search(currentSearchTerm);

	});

});

nav =
{
	essays:
	function()
	{
		access.loadViewModels();
		syncSearch(currentSearchTerm);
	},
	podcasts:
	function()
	{
		access.loadViewModels();
		syncSearch(currentSearchTerm);
	},
	search:
	function(searchTerm)
	{
		location.hash = '#search';		
		access.search(searchTerm);
		syncSearch(currentSearchTerm);
	}
};

access = 
{
	loadViewModels:
	function()
	{
		if (viewModels.essays == null)
		{
			access.loadPosts();
		}
		if (viewModels.podcasts == null)
		{
			access.loadPodcasts();
		}		
	},
	loadPodcasts:
	function ()
	{			
		var feed;
		$.getJSON
		(
			"http://ajax.googleapis.com/ajax/services/feed/load?v=1.0&q=" +
			"http://feeds.feedburner.com/ReformedForum?format=xml"  + 
			"&num=10" +
		  	"&callback=?", 
			null, 
			function(response)
			{							
				if (response && response.responseData && response.responseData.feed) 
				{	
					feed = ko.mapping.fromJS(response.responseData.feed);
					viewModels.podcasts = feed.entries;
					ko.applyBindings(viewModels.podcasts(), $('#podcasts').get(0));
					$("div[data-role='collapsible-set']", $('#podcasts')).show();
					$('.podcasts-list').trigger('create');						
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
					$("div[data-role='collapsible-set']", $('#essays')).show();
					$('essay-list').trigger('create');		
					syncSearch(currentSearchTerm);				
				}
			}
		);
	},
	search:
	function (searchTerm)
	{			
		var feed;
		$.getJSON
		(
			"http://ajax.googleapis.com/ajax/services/feed/load?v=1.0&q=" +
			"http://reformedforum.org/feed?s="  + searchTerm + 
		  	"&callback=?", 
			null, 
			function(response)
			{							
				if (response && response.responseData && response.responseData.feed) 
				{				
					if (response.responseData.feed.entries && response.responseData.feed.entries.length > 0)
					{
						feed = ko.mapping.fromJS(response.responseData.feed);
						viewModels.search = feed.entries;						
						ko.applyBindings(viewModels.search, $('#search').get(0));
						$("div[data-role='collapsible-set']", $('#search')).show();
						$('#search').trigger('create');			
						syncSearch(currentSearchTerm);						
					}
					else
					{
						$(".searchResults").hide();	
					}
				}
			}
		);
	}
};

//this is a hack for jQuery mobile's painfully awkward dom structure.
function syncSearch(searchTerm)
{
	if (searchTerm)
		$('.search-mini').val(searchTerm);

}

function initFooter()
{		
	var footer = $("#footer-main").html();
	$("[id^=footer]").empty().append(footer).trigger("create");

}





		
		

