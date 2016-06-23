
var firstColor="lightblue";

function changeStyle(color) {
	var head = document.getElementsByTagName("header");
	var foot = document.getElementsByTagName("footer");
	var grad = 'radial-gradient('+color+', red)';
	head[0].style.background=grad;
	foot[0].style.background=grad;

	var butt = document.getElementById("colorButton");
	//alert("onclick =" + butt.onclick);
	if(color=='orange')
		butt.onclick=function(){changeStyle(firstColor)};
	else
		butt.onclick=function(){changeStyle('orange')};
}

currDate = new Date()
month = currDate.getMonth()
month = (month * 1) + 1
day = currDate.getDate()
year = currDate.getFullYear()
document.write(" ",month,"/",day,"/",year," ")
