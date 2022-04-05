var arr_cocktails;
var url = "http://192.168.126.128:8080/cocktails";
var table_header = ["Name", "Tags", "Ingredients", "Instructions", "Type", "Image"];
var columns = table_header.length;


function create_table(){

	arr_cocktails = http_get();

	var body = document.getElementsByTagName("body")[0];
  
  	// creates a <table> element and a <tbody> element
  	var divTable = document.createElement("div");
  	divTable.setAttribute("class", "table-wrapper");

  	var tbl = document.createElement("table");
  	var tblBody = document.createElement("tbody");
  	var header = tbl.createTHead();
  	tbl.setAttribute("class", "fl-table");
  	tbl.setAttribute("id", "table");

  	tbl.appendChild(header);

  	for(let i = 0; i < columns; i++){
      	header.appendChild(document.createElement("th")).
      	appendChild(document.createTextNode(table_header[i]));
  	}

  	var rows = arr_cocktails.length;

  	for (let i = 0; i < rows + 1; i++) {
    	
    	//creates a table row
    	var row = document.createElement("tr");

    	for (let j = 0; j < columns + 2; j++) {


    		if(i === rows && j < columns){

    			//create input fields for create
	        	let td = document.createElement("td");
	        	let input = document.createElement("input");
		        input.setAttribute('type', 'text');
		        input.setAttribute("id", "input");
		        td.appendChild(input);
		        row.appendChild(td);
        
	        	//create the create button
	      	} else if(j === columns && i === rows){
		        let cell = document.createElement("td");
		        let button = document.createElement("input");
		        button.type = "button";
		        button.value = "Create";
		        button.setAttribute("id", "create");
		        button.setAttribute("onclick", "create(this)");
		        cell.appendChild(button);
		        row.appendChild(cell);

	      
	      		//update button
	  		} else if(j === columns && i !== rows){
		        let cell = document.createElement("td");
		        let btn = document.createElement("input");
		        btn.type = "button";
		        btn.setAttribute("id", "update");
		        btn.value = "Update";
		        btn.setAttribute("onclick", "update_row(this)");
		        cell.appendChild(btn);
		        row.appendChild(cell);

	        	//Cancel button
	        	let lblCancel = document.createElement('label');
		        lblCancel.innerHTML = '✖';
		        lblCancel.setAttribute('onclick', 'cancel(this)');
		        lblCancel.setAttribute('style', 'display:none;');
		        lblCancel.setAttribute('title', 'Cancel');
		        lblCancel.setAttribute('id', 'lbl');  
		        cell.appendChild(lblCancel);
		        row.appendChild(cell);

		        //save button
		        let btSave = document.createElement('input');
		        btSave.setAttribute('type', 'button');     
		        btSave.setAttribute('value', 'Save');
		        btSave.setAttribute('id', 'save');
		        btSave.setAttribute('style', 'display:none;');
		        btSave.setAttribute('onclick', 'save(this)');
		        cell.appendChild(btSave);
		        row.appendChild(cell);



	      		//delete button
	      	} else if(j > columns && i !== rows){
		        let cell = document.createElement("td");
		        let btn = document.createElement("input");
		        btn.type = "button";
		        btn.value = "Delete";
		        btn.setAttribute("onclick", "delete_row(this)");
		        cell.appendChild(btn);
		        row.appendChild(cell);


		        //ingredients
		    }else if(i !== rows && j === columns - 4){
		    	let cell = document.createElement("td");
      		let div = document.createElement("div");
	        div.setAttribute("id", "overflow_div");

	        let text = "";
	      	
	        for(let obj of arr_cocktails[i][table_header[j].toLowerCase()]){
	        	text += obj["measurement"] + " ";
	        	text += obj["unit"] + " ";
	        	text += obj["name"] + "/";
	        }
		  
		  		text = text.slice(0, -1);
		        
					div.innerHTML = text;
		      cell.appendChild(div);
		      row.appendChild(cell);

		    }else if(i !== rows && j === columns - 3){
		    	let cell = document.createElement("td");
        		let div = document.createElement("div");
		        div.setAttribute("id", "overflow_div");
		        div.innerHTML = arr_cocktails[i][table_header[j].toLowerCase()];
		        cell.appendChild(div);
		        row.appendChild(cell);


		    }else if (i !== rows && j === columns - 1){
		    	let cell = document.createElement("td");
		    	let img = document.createElement("img");
		    	img.setAttribute("id", "image");
		    	img.setAttribute("alt", "na");
		    	img.setAttribute("src", arr_cocktails[i]["img"]);
		    	cell.appendChild(img);
		    	row.appendChild(cell);

		    }else if(i !== rows){
		    	let cell = document.createElement("td");
        		let cellText = document.createTextNode(arr_cocktails[i][table_header[j].toLowerCase()]);
        		cell.appendChild(cellText);
        		row.appendChild(cell);

		    }
		}
    	tblBody.appendChild(row);
    }

    tbl.appendChild(tblBody);
  	// appends <table> into <body>;

  	divTable.append(tbl);
  	body.appendChild(divTable);
}

function update_row(button){

  var activeRow = button.parentNode.parentNode.rowIndex; //gives row of where this button is placed
  var tab = document.getElementById('table').rows[activeRow];

  for(let i = 1; i < columns; i++){

    if(i == columns - 1){
      let td = tab.getElementsByTagName("td")[i];
      let ele = document.createElement("input");   
      ele.setAttribute("type", "text");
      ele.setAttribute("id", "input");
      ele.setAttribute('value', td.children["image"].src);
      td.innerText = "";
      td.appendChild(ele);

    }else{

      let td = tab.getElementsByTagName("td")[i];
      let ele = document.createElement('input');     
      ele.setAttribute('type', 'text');
      ele.setAttribute("id", "input");
      ele.setAttribute('value', td.innerText);
      td.innerText = '';
      td.appendChild(ele);
    }
    
  }

  //hide button
  button.setAttribute("style", "display:none"); 
  
  //show cancel label
  let label = button.parentNode.children["lbl"];
  label.setAttribute("style", "display:inline-block");

  let save_btn = button.parentNode.children["save"];
  save_btn.setAttribute("style", "display:inline-block");
}

function cancel(label){
  
  var activeRow = label.parentNode.parentNode.rowIndex;
  var tab = document.getElementById("table").rows[activeRow];

  for(let i = 1; i < columns; i++){

    	//div for ingredients
    if(i === columns - 4){

    	let td = tab.getElementsByTagName("td")[i];
  		let div = document.createElement("div");
      div.setAttribute("id", "overflow_div");

      let text = "";
    	
      for(let obj of arr_cocktails[activeRow]["ingredients"]){
      	text += obj["name"] + " ";
      	text += obj["measurement"];
      	text += obj["unit"] + "/";
      }
  
  		text = text.slice(0, -1);
        
			div.innerHTML = text;
      td.appendChild(div);
      td.children["input"].remove();

      //div for instructions
    }else if(i === columns - 3){
    	let td = tab.getElementsByTagName("td")[i];
      let div = document.createElement("div");
      div.setAttribute("id", "overflow_div");
      div.innerHTML = arr_cocktails[activeRow]["instructions"];
      td.appendChild(div);
      td.children["input"].remove();  
    
    	//image
    }else if(i === columns - 1){
      let td = tab.getElementsByTagName("td")[i];
      let img = document.createElement("img");
      img.src = arr_cocktails[activeRow]["img"];
      img.setAttribute("id", "image");
      td.children["input"].remove();
      td.appendChild(img);
      
      //everything else
    }else{
      let td = tab.getElementsByTagName("td")[i];
      let cell_text = document.createTextNode(arr_cocktails[activeRow][table_header[i].toLowerCase()]);
      td.value = "";
      td.appendChild(cell_text);
      td.children["input"].remove();
    } 

  }
 
  label.setAttribute("style", "display:none");

  let save_btn = label.parentNode.children["save"];
  save_btn.setAttribute("style", "display:none");

  let update_btn = label.parentNode.children["update"];
  update_btn.setAttribute("style", "display:block; margin:0 auto;");
}

function save(button){
	
	if(confirm('Are you sure you want to save this?')){
		var activeRow = button.parentNode.parentNode.rowIndex;
  	var tab = document.getElementById("table").rows[activeRow];
  	let data = {};

  	data["name"] = tab.getElementsByTagName("td")[0].innerHTML;

		for(let i = 1; i < columns; i++){

			if(i === columns - 4 || i === columns - 3){
				let td = tab.getElementsByTagName("td")[i];
				let cell = document.createElement("div");
				cell.setAttribute("id", "overflow_div");
				cell.innerHTML = td.children["input"].value;
				td.appendChild(cell);
				td.children["input"].remove();
				data[table_header[i].toLowerCase()] = cell.innerHTML;

			}else if(i === columns - 1){
				let td = tab.getElementsByTagName("td")[i];
        let img = document.createElement("img");
        img.src = td.children["input"].value;
        img.setAttribute("id", "image");
        td.appendChild(img);
        td.children["input"].remove();
        data["img"] = img.src;

			}else{
				let td = tab.getElementsByTagName("td")[i];
        let cell_text = document.createTextNode(td.children["input"].value);
        data[table_header[i].toLowerCase()] = td.children["input"].value;
        td.value = "";
        td.appendChild(cell_text);
        td.children["input"].remove();
			}
		}

		button.setAttribute("style", "display:none");

    let lbl_cancel = button.parentNode.children["lbl"];
    lbl_cancel.setAttribute("style", "display:none");

    let update_btn = button.parentNode.children["update"];
    update_btn.setAttribute("style", "display:block; margin:0 auto;");

    http_update(data, activeRow);
	}else{

		return false
	}
}

function http_get(){

  let con = new XMLHttpRequest();
  con.open("GET", url, false); // false for synchronous request
  con.send(null);
  return JSON.parse(con.responseText);  

}

let http_update = (data, activeRow) => {

	data["tags"] = data["tags"].split(",");
	data["ingredients"] = data["ingredients"].split("/");
	let i = 0;
	for(let x of data["ingredients"]){
		data["ingredients"][i] = {};

		if(x.includes(" oz ")){
			let measurement = x.substring(0, x.search(" oz "));
			let name = x.substring(x.search(" oz ") + 4);
			data["ingredients"][i]["measurement"] = measurement;
			data["ingredients"][i]["unit"] = "oz";
			data["ingredients"][i]["name"] = name;

		}else if(x.includes(" top with ")){
			let measurement = x.substring(0, x.search(" top with "));
			let name = x.substring(x.search(" top with ") + 10);

			data["ingredients"][i]["measurement"] = measurement;
			data["ingredients"][i]["unit"] = "top with";
			data["ingredients"][i]["name"] = name;

		}else if(x.includes(" dash ")){
			let measurement = x.substring(0, x.search(" dash "));
			let name = x.substring(x.search(" dash ") + 6);

			data["ingredients"][i]["measurement"] = measurement;
			data["ingredients"][i]["unit"] = "dash";
			data["ingredients"][i]["name"] = name;
		}
		i++;
	}	
	
  // Sending PUT request with fetch API in javascript
  fetch(url + "/" + arr_cocktails[activeRow]["name"], {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    method: "PATCH",    //cant modify primary key
 
    // Sending only the fields that to be updated
    body: JSON.stringify(data)
  })
    .then(function (response) {
      return response.json();
    });
};


function http_delete(name){

	let con = new XMLHttpRequest();
  con.open("DELETE", url + "/" + name, false);
  con.setRequestHeader('Content-type', 'application/json;charset=utf-8');
  con.send(null);
}

function delete_row(button){
	
	if(confirm("Are you sure you want to delete this Cocktail?")){

		document.getElementById("table").deleteRow(button.parentNode.parentNode.rowIndex);
		http_delete(button.parentNode.parentNode.children[0].innerText);
	}

}


function create(button){

	let activeRow = button.parentNode.parentNode.rowIndex;
  let tab = document.getElementById("table").rows[activeRow];
  let text_of_cells = {};
  let row = table.insertRow(activeRow);

  for(let i = 0; i < columns + 2; i++){
  	if(i === columns){
      let cell = document.createElement("td");
      let btn = document.createElement("input");
      btn.type = "button";
      btn.setAttribute("id", "update");
      btn.value = "Update";
      btn.setAttribute("onclick", "update_row(this)");
      cell.appendChild(btn);
      row.appendChild(cell);

      //Cancel button
      let lblCancel = document.createElement('label');
      lblCancel.innerHTML = '✖';
      lblCancel.setAttribute('onclick', 'cancel(this)');
      lblCancel.setAttribute('style', 'display:none;');
      lblCancel.setAttribute('title', 'Cancel');
      lblCancel.setAttribute('id', 'lbl');
      cell.appendChild(lblCancel);
      row.appendChild(cell);

      //save button
      let btSave = document.createElement('input');
      btSave.setAttribute('type', 'button');     
      btSave.setAttribute('value', 'Save');
      btSave.setAttribute('id', 'save');
      btSave.setAttribute('style', 'display:none;');
      btSave.setAttribute('onclick', 'save(this)');
      cell.appendChild(btSave);
      row.appendChild(cell);

    }else if(i > columns){
      let cell = document.createElement("td");
      let btn = document.createElement("input");
      btn.type = "button";
      btn.value = "Delete";
      btn.setAttribute("onclick", "delete_row(this)");
      cell.appendChild(btn);
      row.appendChild(cell);

    }else if(i === columns - 1){
    	let td = tab.getElementsByTagName("td")[i];
    	let cell = row.insertCell(i);
    	let img = document.createElement("img");
    	img.src = td.children["input"].value;
    	img.setAttribute("alt", "na");
    	img.setAttribute("id", "image");
    	text_of_cells["img"] = td.children["input"].value;
    	td.children["input"].value = "";

    }else{
    	let td = tab.getElementsByTagName("td")[i];
      let cell = row.insertCell(i);     
      cell.innerHTML = td.children["input"].value
      text_of_cells[table_header[i].toLowerCase()] = cell.innerHTML;
      td.children["input"].value = "";
    }	
  }

  text_of_cells["tags"] = text_of_cells["tags"].split(",");
  text_of_cells["ingredients"] = text_of_cells["ingredients"].split("/");

  let i = 0;
  for(let x of text_of_cells["ingredients"]){
		text_of_cells["ingredients"][i] = {};

		if(x.includes(" oz ")){
			let measurement = x.substring(0, x.search(" oz "));
			let name = x.substring(x.search(" oz ") + 4);
			text_of_cells["ingredients"][i]["measurement"] = measurement;
			text_of_cells["ingredients"][i]["unit"] = "oz";
			text_of_cells["ingredients"][i]["name"] = name;

		}else if(x.includes(" top with ")){
			let measurement = x.substring(0, x.search(" top with "));
			let name = x.substring(x.search(" top with ") + 10);

			text_of_cells["ingredients"][i]["measurement"] = measurement;
			text_of_cells["ingredients"][i]["unit"] = "top with";
			text_of_cells["ingredients"][i]["name"] = name;

		}else if(x.includes(" dash ")){
			let measurement = x.substring(0, x.search(" dash "));
			let name = x.substring(x.search(" dash ") + 6);

			text_of_cells["ingredients"][i]["measurement"] = measurement;
			text_of_cells["ingredients"][i]["unit"] = "dash";
			text_of_cells["ingredients"][i]["name"] = name;
		}
		i++;
	}

	http_post(text_of_cells);

	location.reload();

}

function http_post(data){

  let con = new XMLHttpRequest();
  con.open("POST", url, false);
  con.setRequestHeader('Content-type', 'application/json;charset=utf-8');
  con.send(JSON.stringify(data));
}

function scroll_to(x){
	
	if(x === -1){
		window.scrollTo(0, document.body.scrollHeight);
	}else{
		window.scrollTo(0, 0);
	}
}