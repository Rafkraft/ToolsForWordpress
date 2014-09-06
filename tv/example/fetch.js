function loadJSON () { 
	$.ajax({
		url: 'data.json',
		type: "GET",
		dataType: "json",
			success: function (data) {
				window.collection=data;
				getInfos();
			}
	});
}

// Add rows to the table
function getInfos(){
	var data =window['collection'];
	//$('#lastRow').html("Nombre d'éléments : "+ data.length);

	$('#items > table > tbody').nextAll('tr').remove();
	$('#lastRow').html(data.length);
	for(i=0;i<data.length;i++){
		var id = data[i].id;
		var name = data[i].nom;
		var title = data[i].titre;
		var date = data[i].date_upload;
		var string = '<tr><td>'+id+'</td><td>'+name+'</td><td>'+title+'</td><td>'+date+'</td></tr>';
		$('#items tbody').append(string);
	}
	$('#result').val(JSON.stringify(window.collection,undefined,4))
	getAllTags()
	getAllNames()

}
//Get data from window.collection
function getData(){
	var id = $('#id').val();
	if ( typeof(window.collection[id]) == 'object' ){
		var name = window.collection[id].nom.join();
		$('#nom').val(name);
		$('#titre').val(window.collection[id].titre);
		$('#type').val(window.collection[id].type);
		var tags = window.collection[id].tags.join();
		$('#tags').val(tags);
		$('#description').val(window.collection[id].description);
		$('#langue').val(window.collection[id].langue);
		$('#date_parution').val(window.collection[id].date_parution);
		$('#date_upload').val(window.collection[id].date_upload);
		$('#url').val(window.collection[id].url);
		var parts = window.collection[id].parts.join();
		$('#parts').val(parts);
		$('#plateforme').val(window.collection[id].plateforme);
		$('#big').val(window.collection[id].big);
		$('#img').val(window.collection[id].img);
	}
	else{
		alert("ID doesn't exist");
	}

}

//Send Data to the textarea
function sendData (){
	var id = $('#id').val();
	var noms = $('#nom').val().split(',');
	var titre = $('#titre').val();
	var type = $('#type').val();
	var tags = $('#tags').val().split(',');
	var description = $('#description').val();
	var langue = $('#langue').val();
	var date_parution = $('#date_parution').val();
	var date_upload = $('#date_upload').val();
	var url = $('#url').val();
	var parts = $('#parts').val().split(',');
	var plateforme = $('#plateforme').val();
	var big = $('#big').val();
	var img = $('#img').val();

	var object = {
				"id":id,
				"nom":noms,
				"titre":titre,
				"type":type,
				"tags":tags,
				"langue":langue,
				"date_parution":date_parution,
				"date_upload":date_upload,
				"url":url,
				"parts":parts,
				"plateforme":plateforme,
				"big":big,
				"img":img
				};

	window['collection'][id] = object;
	$('#result').val(JSON.stringify(window.collection),undefined,4)
	
}
//Empty inputs
function emptyData(){
	$('#nom').val('');
	$('#titre').val('');
	$('#type').val('');
	$('#tags').val('');
	$('#addtags').val('');
	$('#description').val('');
	$('#langue').val('');
	$('#date_parution').val('');
	$('#date_upload').val('');
	$('#url').val('');
	$('#parts').val('');
	$('#addparts').val('');
	$('#plateforme').val('');
	$('#big').val('');
	$('#img').val('');
}

//Get tags, display them and sort them
function getAllTags(){

	for(i=0;i<window['collection'].length;i++){
		for(j=0;j<window['collection'][i].tags.length;j++){
			var tag = window['collection'][i].tags[j];
			var tagOK = tag.replace(" ","_");
			if($('#'+tagOK).length){
				var value = $('#'+tagOK).attr('value');
				if(value<12)
					value ++;
				$('#'+tagOK).attr('value',value);
			}else{
				$('#allTags').append('<span value=0 id='+tagOK+'>'+tag+'</span>')
			}
		}
	}
	//Add color
	$('#allTags span').each(function(index,value){
		var r = $(this).attr('value')*40;
		var rgb = 'rgb('+r+',30,100)'
		$(this).css('background-color',rgb)
	})
	//Sort divs
	function getSorted(selector, attrName) {
	    return $($(selector).toArray().sort(function(a, b){
	        var bVal = parseInt(a.getAttribute(attrName)),
	            aVal = parseInt(b.getAttribute(attrName));
	        return aVal - bVal;
	    }));
	}
	var sorted = getSorted('#allTags span', 'value');
	$('#allTags').html('');
	$('#allTags').html(sorted);
	//Click event
	$('#allTags span').click(function(e){
		html = $(e.target).html();
		console.log('html');
		var val = $('#tags').val()
		if(val.length>1)
			$('#tags').val(val+','+html);
		else
			$('#tags').val(html);
	});
}

//Get names, display them and sort them
function getAllNames(){	
	for(i=0;i<window['collection'].length;i++){
		for(j=0;j<window['collection'][i].nom.length;j++){
			var nom = window['collection'][i].nom[j];
			var nomOK = nom.replace(" ","_");

			if($('#'+nomOK[0]).length){
				var value = $('#'+nomOK[0]).attr('value');
				if(value<8)
					value ++;
				$('#'+nomOK[0]).attr('value',value);
			}else{
				$('#allNames').append('<span value=0 id='+nomOK[0]+'>'+nom+'</span>')
			}
		}
	}
	//Add color
	$('#allNames span').each(function(index,value){
		var r = $(this).attr('value')*60;
		var rgb = 'rgb(40,'+r+',120)'
		$(this).css('background-color',rgb)
	})
	//Sort divs
	function getSorted(selector, attrName) {
	    return $($(selector).toArray().sort(function(a, b){
	        var bVal = parseInt(a.getAttribute(attrName)),
	            aVal = parseInt(b.getAttribute(attrName));
	        return aVal - bVal;
	    }));
	}
	var sorted = getSorted('#allNames span', 'value');
	$('#allNames').html('');
	$('#allNames').html(sorted);
	//Click event
	$('#allNames span').click(function(e){
		html = $(e.target).html();
		var val = $('#nom').val()
		if(val.length>1)
			$('#nom').val(val+','+html);
		else
			$('#nom').val(html);
	});
}

//Send Data to updataData.php
function saveData(){
	var data = $('#result').val();
	var dataArray={"data":data};
	$.ajax({
		type: "POST",
		url: "updateData.php",
		data: dataArray,
		dataType: "text",
		success: function(data) {
			console.log(data)
			loadJSON();
		}
	});
}