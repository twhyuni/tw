//스타일
$('table').addClass('ui celled very compact table');
$('table#skilltable').addClass('striped');
$('.main.menu').visibility({type: 'fixed'});

$('[type="number"]').attr('value', '0')

//배열을 표로 나타낸다
	for(var i=0; i<skillData.length; i++){
$('#contents').append("<tr><td>"+skillData[i].캐릭터+"</td><td>"+skillData[i].스킬+"</td><td></td><td class=\"factorSkillResult\"></td><td>"+skillData[i].타격수+"</td><td class=\"factorCriResult\"></td><td class=\"damageResult\"></td></tr>");
	}

//대미지를 계산하는 함수를 선언한다
function calDamage(){

//입력값을 변수에 담는다
var $userRune = Number($('#rune').val());
var $userGakseong = Number($('#gakseong').val());
var $userSokseong = Number($('#sokseong').val());

if($('#muyeon').is(':checked')){var $userMuyeon = 0.2}else{var $userMuyeon = 0}
if($('#bomu').is(':checked')){var $userBomu = 0.05}else{var $userBomu = 0}

var $userJjil = Number($(':input#jjil').val());
var $userBegi = Number($(':input#begi').val());
var $userMagong = Number($(':input#magong').val());
var $userMabang = Number($(':input#mabang').val());

var $userStab = Number($(':input#stab').val());
var $userHack = Number($(':input#hack').val());
var $userInt = Number($(':input#int').val());
var $userMr = Number($(':input#mr').val());
var $userDex = Number($(':input#dex').val());

var $userDamAbil = Number($(':input#damAbil').val());
var $userTuguseed = Number($('#tuguseed').val());
var $userArti = Number($('#arti').val());
if($('#ttang').is(':checked')){var $userTtang = 0.15}else{var $userTtang = 0}

if($('#gakbi').is(':checked')){var $userGakbi = 0.2}else{var $userGakbi = 0}
if($('#ssang').is(':checked')){var $userSsang = 0.1}else{var $userSsang = 0}
if($('#goemul').is(':checked')){var $userGoemul = 0.1}else{var $userGoemul = 0}
if($('#goeham').is(':checked')){var $userGoeham = 0.1}else{var $userGoeham = 0}
if($('#dalbit').is(':checked')){var $userDalbit = 1}else{var $userDalbit = 0}
if($('#seungja').is(':checked')){var $userSeungja = 0.15}else{var $userSeungja = 0}

if($('#sinbang').is(':checked')){var $userSinbang = 0.1}else{var $userSinbang = 0}
if($('#combo').is(':checked')){var $userCombo = 1.3}else{var $userCombo = 1}

var $userFreshAir = Number($('#freshAir').val());
var $userEtcSum = Number($('#etcSum').val());
var $userEtcMul = Number($('#etcMul').val());

//극한 시 각성에 따른 댐증
if($('#geukhan').is(':checked')){
if($('#gakseong').val() == 2){var $userGakseongPlus = 1.1}
else if($('#gakseong').val() == 3){var $userGakseongPlus = 1.25}else{var $userGakseongPlus = 1}}else{var $userGakseongPlus = 1}

//스킬공통 댐증요소
var factorSum = ($userDamAbil/100)+$userSinbang+$userGakbi+$userSsang+$userGoemul+$userGoeham+$userSeungja+$userTtang+$userDalbit+($userEtcSum/100);
var factorMul = $userGakseongPlus*$userCombo*(1+$userArti/100)*(1+$userFreshAir/100)*(1+$userEtcMul/100);
var factorSum2 = 1;

//스킬공격력, 크리티컬, 대미지를 출력할 셀을 모두 찾아 배열로 정의한다
var damageResult = document.querySelectorAll('.damageResult');
var factorSkillResult = document.querySelectorAll('.factorSkillResult');
var factorCriResult = document.querySelectorAll('.factorCriResult');

//반복문 시작
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

//극한이면 투구어빌효과없음, 약간체크시 0.2 콤연체크시 0.07 보콤체크시 0.03
//극한이 아니면 투구어빌 체크시 투구어빌효과부여하고 시드어빌효과없음, 투구어빌 체크해제시 투구어빌효과없음, 약간체크시0.5 콤연보콤0
if($('#geukhan').is(':checked')){
var $userTugu=0;
if($('#yakgan').is(':checked')){var $userYakgan = 0.2}else{var $userYakgan = 0};
if($('#comyeon').is(':checked')){var $userComyeon = 0.07}else{var $userComyeon = 0};
if($('#bocom').is(':checked')){var $userBocom = 0.03}else{var $userBocom = 0};
}else{
if($('#tugu').is(':checked')){var $userTugu = Number(skillData[i].투구어빌효과); var $userTuguseed=0}else{var $userTugu = 0};
if($('#yakgan').is(':checked')){var $userYakgan = 0.5}else{var $userYakgan = 0};
var $userComyeon = 0;
var $userBocom = 0;
}

//스킬별 기본대미지계산요소
var factorSkill = Number(skillData[i].스킬공격력)+ $userTuguseed + $userTugu;
var factorCri = (Number(skillData[i].크리배율)*(1+$userYakgan+$userComyeon+$userBocom))+((2/3)*($userRune)/100);

//해당 셀에 스킬공격력, 크리티컬, 최종대미지를 출력한다
factorSkillResult[i].innerHTML=factorSkill;
factorCriResult[i].innerHTML=factorCri;
damageResult[i].innerHTML=Math.round((factorStat+(factorArm*(1+$userMuyeon+$userBomu))+1)*(factorSkill/100)*factorCri*(1+factorSum+(Number(skillData[i].댐증버프_덧셈)/100))*factorMul*(1+(Number(skillData[i].댐증버프_곱셈)/100)));
		}
	}

//페이지가 준비되면 대미지계산 함수를 실행한다
$(document).ready(calDamage);

//<input> 요소의 값이 변경되면 대미지계산 함수를 실행한다
$(':input').on('input change', calDamage);

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
적 방어력에 따른 계산 추가
속성댐증, 찬솔렛, 로아미니, 아나이스평타, 장판 효과 추가
입력값 저장/불러오기 슬롯 기능
신미/콤연에 따른 DPS 추가
범위/사거리 입력
입력폼 인터페이스 정렬
마우스오버 시 도움말
폼 유효성 검사, 이스케이핑 추가 /기합, 각비 등 각종 중복안되는것
비호버프효율계산 팝업창 제공
베리어효율 제공
아티펙트 데이터 저장하여 불러오기에 따른 계산
벤야마스터리 적용
적용효과수치 테스트 : 신방, 아나이스정의의심판, 커스, 러스트아머, 브레이크아머, 로아미니 등등
엑셀 파일이랑 결과값 차이 없는지 체크
*/