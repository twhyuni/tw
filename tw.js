//스타일
$('table').addClass('ui celled very compact table');
$('table#skilltable').addClass('striped');
$('.main.menu').visibility({type: 'fixed'});

$('[type="number"]').attr('value', '0')

//배열을 표로 나타낸다
	for(var i=0; i<skillData.length; i++){
$('#contents').append("<tr><td>"+skillData[i].캐릭터+"</td><td>"+skillData[i].스킬+"</td><td></td><td>"+skillData[i].스킬공격력+"</td><td>"+skillData[i].타격수+"</td><td>"+skillData[i].크리배율+"</td><td class=\"damageResult\"></td></tr>");
	}

//대미지를 계산하는 함수를 선언한다
function calDamage(){

//입력값을 변수에 담는다
var $userStab = Number($(':input#stab').val());
var $userHack = Number($(':input#hack').val());
var $userInt = Number($(':input#int').val());
var $userMr = Number($(':input#mr').val());
var $userDex = Number($(':input#dex').val());

var $userJjil = Number($(':input#jjil').val());
var $userBegi = Number($(':input#begi').val());
var $userMagong = Number($(':input#magong').val());
var $userMabang = Number($(':input#mabang').val());

//대미지를 출력할 셀을 모두 찾아 배열로 정의한다
var damageResult = document.querySelectorAll('.damageResult');

//해당 셀에 들어갈 값을 반복문으로 작성한다
for (var i=0; i<damageResult.length; i++){

//스킬 계열에 따른 스탯공격력, 장비공격력을 계산한다
	if(skillData[i].계열=="STAB"){
		var factorStat = Math.floor(($userStab*2.1)+($userHack*1.08));
		var factorArm = Math.floor(($userJjil*6.67)+($userBegi*1));}
	else if(skillData[i].계열=="HACK"){
		var factorStat = Math.floor(($userHack*2.1)+($userStab*1.08));
		var factorArm = Math.floor(($userBegi*6.67)+($userJjil*1));}
	else if(skillData[i].계열=="STAB+HACK"){
		var factorStat = Math.floor(($userStab*1.8)+($userHack*1.8));
		var factorArm = Math.floor(($userJjil*4.55)+($userBegi*4.55));}
	else if(skillData[i].계열=="HACK+INT"){
		var factorStat = Math.floor(($userHack*1.8)+($userInt*1.5));
		var factorArm = Math.floor(($userBegi*4.55)+($userMagong*3.85));}
	else if(skillData[i].계열=="STAB+INT"){
		var factorStat = Math.floor(($userStab*1.8)+($userInt*1.5));
		var factorArm = Math.floor(($userJjil*4.55)+($userMagong*3.85));}
	else if(skillData[i].계열=="INT"){
		var factorStat = Math.floor(($userInt*2.4)+($userMr*0.6));
		var factorArm = Math.floor(($userMagong*5.95)+($userMabang*1.05));}
	else if(skillData[i].계열=="MR"){
		var factorStat = Math.floor(($userInt*0.45)+($userMr*2.55));
		var factorArm = Math.floor(($userMabang*5.25)+($userMagong*0.7));}
	else{
		var factorStat = 0;
		var factorArm = 0;
	}

//해당 셀에 최종대미지를 출력한다
damageResult[i].innerHTML=Math.round((factorStat+factorArm+1)*(Number(skillData[i].스킬공격력)/100)*Number(skillData[i].크리배율));
		}
	}

//페이지가 준비되면 대미지계산 함수를 실행한다
$(document).ready(calDamage);

//<input> 요소의 값이 변경되면 대미지계산 함수를 실행한다
$(':input').on('input', calDamage);

//캐릭터를 선택하면, 캐릭터 필터 함수를 실행한다
$('#cha_name').on('change', function(){

  var cha_name, filter, table, tr, td, i;
  cha_name = document.getElementById("cha_name");
  filter = cha_name.value.toUpperCase();
  table = document.getElementById("skilltable");
  tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[0];
    if (td) {
      if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    } 
  }
});


/*

최소대미지
=([@스탯공격력]+[@장비공격력]+1

-((IF([@계열]="STAB",적물방,IF([@계열]="HACK",적물방,IF([@계열]="STAB+HACK",적물방,적마방))))*IF(찬솔렛3=TRUE,0.9,1)*IF(커스=TRUE,0.9,1)*+IF(로아미니장판=TRUE,0.9,1)))

*(([@[스킬공격력]]+시드투구어빌+IF(투구어빌=TRUE,[@[투구어빌효과]],0))/100)
*(1+[@[댐증버프_곱셈]]/100)
*([@크리배율]*(1+IF(AND(극한=TRUE,약점간파=TRUE),0.2,0)+IF(AND(극한=TRUE,약점간파=TRUE,콤보연마=TRUE),0.07,0)+IF(AND(극한=TRUE,약점간파=TRUE,보급콤연=TRUE),0.03,0)+IF(AND(극한=FALSE,약점간파=TRUE),0.5,0)
+(((2/3)*룬레벨)/100)))
*IF(극한=FALSE,1,IF(각성회차=2,1.1,IF(각성회차=3,1.25,1)))
*(1+IF((속성-적속성)<=0,0,IF(AND(0<(속성-적속성),(속성-적속성)<80),(속성-적속성)*0.00625,0.5)))
*IF(콤보=TRUE,1.3,1)*(1+(비호버프/100))*(1+(아티펙트/100))*(1+(기타곱연산/100))
*(1+(IF(신의방패=TRUE,0.1,0)+IF(찬솔렛1="극한O",0.1,IF(찬솔렛1="극한X",0.05,0))+(댐증어빌_퍼센트/100)+IF(각성의비약=TRUE,0.2,0)+IF(쌍둥이경단=TRUE,0.1,0)+IF(괴력의물약=TRUE,0.1,0)+IF(괴력의햄=TRUE,0.1,0)+IF(승자의증표=TRUE,0.15,0)+IF(진암페=TRUE,0.15,0)+IF(달빛의축복=TRUE,1,0)+(기타합연산/100)+([@[댐증버프_덧셈]]/100)))
*(1+(IF(페어리=TRUE,0.1,0)+IF(초록장판=TRUE,0.15,0)+IF(로아미니장판=TRUE,IF(포이즌마스터="극한X/포이즌X",0.1,IF(포이즌마스터="극한X/포이즌O",0.2,0.15)),0)))
*/
