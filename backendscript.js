function insert(list,length,user){
	var header = document.getElementById("header");
	header.style="text-align:center";
	header.innerHTML ="";
	var case1 = document.createElement("div");
	var case2 = document.createElement("div");
	var case3 = document.createElement("div"); case3.style="display:inline-block";
	var section = document.createElement("div"); section.style="display:inline-block";
	
	var name = document.createElement("span");
	var bio = document.createElement("span");
	var userName = document.createElement("h1"); 
	userName.innerHTML = user.username;
	userName.style="text-align:center"
	case1.append(userName);
	var ulist = document.createElement("ul");
	var listItem = document.createElement("li");
	var listItem2 = document.createElement("li");
	var listItem3= document.createElement("li");
//user data
	listItem.innerHTML = user.edge_owner_to_timeline_media.count+ " posts";
	listItem2.innerHTML = user.edge_followed_by.count+" followers";
	listItem3.innerHTML = user.edge_follow.count+" following";
	listItem.style="display:inline-block; margin-right:20px";
	listItem2.style="display:inline-block; margin-right:20px";
	listItem3.style="display:inline-block; margin-right:20px";
	ulist.appendChild(listItem); ulist.appendChild(listItem2); ulist.appendChild(listItem3);

	name.innerHTML = user.full_name; name.style="margin-right: 20px; font-weight: bold; vertical-align:center-left";
	bio.innerHTML = user.biography;
	case2.appendChild(name);
	case2.appendChild(bio);
//profile picture
	var profpic = document.createElement("img");
	profpic.src = user.profile_pic_url;
	profpic.style="border-radius:100px";
	case3.append(profpic);
//final appending
	section.appendChild(case1);
	section.appendChild(ulist);
	section.appendChild(case2);
	
	header.appendChild(case3);
	header.append(section);
	var container = document.getElementById("container");
	container.innerHTML = "";
		for(x = 0; x < length; x++){
			var item = document.createElement("div");
			var image = document.createElement("img");
			image.src = list[x].node.display_url;
			item.appendChild(image);
			container.append(item);
		}
}

function getInstagram(){
var input = document.getElementById('input').value;
var account ="https://instagram.com/"+ input+"/";
console.log(account)
	fetch(account)
	.then(function(response){
	console.log(response.status);
		//if response objectt.status === 200 then return the html document as a string
		if (response.ok){
			return response.text();
		}
		else if(response.status === 404){
		document.getElementById("container").innerHTML ="";
		var header = document.getElementById("header");
		header.innerHTML ="Oops! Account Doesnt Exist";
		header.style="text-align:center; font-size:30px";
		}
		else{
			throw("Unable to fetch instagram account") 
		}
	 })
	 .then(function (data){extract (data);})
	
}

function extract(data){
let sift = JSON.parse(data.match(/window._sharedData = ({.+);/i)[1]);
let user = sift.entry_data.ProfilePage["0"].graphql.user;
console.log(user);
let instaList = sift.entry_data.ProfilePage["0"].graphql.user.edge_owner_to_timeline_media.edges;
//console.log(instaList);
//call insert and add the images
insert(instaList,instaList.length,user);
}
