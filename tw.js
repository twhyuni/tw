$('.main.menu').visibility({type: 'fixed'});

$('#hide').on('click', function(){
$('#info').hide();	
});

$('#show').on('click', function(){
$('#info').show();	
});

$('#rune').popup({on:'focus', content:'룬스킬 "정의의 심판" 레벨'});
$('#etcSum').popup({on:'focus', position:'bottom center',content:'ex)트랜스스피릿 사용시 100 입력, 고르고니아 천년빙아 사용시 10 입력 등등'});
$('.stat.tooltip').popup({on:'focus', position:'bottom center',target:'#status',title:'최종스탯', content:'룬스킬, 몬스터카드, 상태이상 등을 모두 포함한 최종 스탯을 입력해주세요.'});
$('.biho.help.icon').popup({on:'click', position:'bottom center', title:'프레쉬에어, 하드웨폰', content:'(시전자의 순수MR+마방합)/50'});

$('[type="number"]').attr('value', '0').width(50);

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

if(skillData[i].마스터리_소울차지==40 && $('#benyamastery').val()=="소울차지"){var $userBenyamastery = Number(skillData[i].마스터리_소울차지)}
else if(skillData[i].마스터리_소울커터==40 && $('#benyamastery').val()=="소울커터"){var $userBenyamastery = Number(skillData[i].마스터리_소울커터)}
else if(skillData[i].마스터리_파워크러쉬==40 && $('#benyamastery').val()=="파워크러쉬"){var $userBenyamastery = Number(skillData[i].마스터리_파워크러쉬)}
else{var $userBenyamastery = 0}




//스킬별 기본대미지계산요소
var factorSkill = Number(skillData[i].스킬공격력)+ $userTuguseed + $userTugu + $userBenyamastery;
var factorCri = (Number(skillData[i].크리배율)*(1+$userYakgan+$userComyeon+$userBocom))+((2/3)*($userRune)/100);

//몬스터 방어력(물공이면 물방값, 마공이면 마방값을 적용한다)
if(skillData[i].계열=="STAB"||skillData[i].계열=="HACK"||skillData[i].계열=="STAB+HACK"){
var factorMon = $(':input#monMulbang').val();}
else{var factorMon = $(':input#monMabang').val();}

var sokGap = Number($userSokseong)-Number($(':input#monSokseong').val());

if(sokGap<0){var factorSok = 1;}
else if(sokGap>80){var factorSok = 1.5;}
else{var factorSok = 1+sokGap*0.00625;}

//해당 셀에 스킬공격력, 크리티컬, 최종대미지를 출력한다
factorSkillResult[i].innerHTML=factorSkill;
factorCriResult[i].innerHTML=factorCri;
damageResult[i].innerHTML=Math.round((factorStat+(factorArm*(1+$userMuyeon+$userBomu))+1-factorMon)*factorSok*(factorSkill/100)*factorCri*(1+factorSum+(Number(skillData[i].댐증버프_덧셈)/100))*factorMul*(1+(Number(skillData[i].댐증버프_곱셈)/100)));
		}

		//반복문 끝
	}	//대미지계산함수 끝

//페이지가 준비되면 대미지계산 함수를 실행한다
$(document).ready(calDamage);

//<input> 요소의 값이 변경되면 대미지계산 함수를 실행한다
$(':input').on('input change', calDamage);

//캐릭터를 선택하면, 캐릭터 필터 함수를 실행한다
$('#chaName').on('change', function(){

  var chaName, filter, table, tr, td, i;
  chaName = document.getElementById("chaName");
  filter = chaName.value.toUpperCase();
  table = document.getElementById("skillTable");
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

//몬스터 데이터를 선택지에 한줄씩 추가한다
for(var i=0; i<monData.length; i++){
$('#monName').append("<option value="+i+">"+monData[i].이름+"</option>")}


//몬스터 이름을 선택하면 해당 데이터를 표시하고, 대미지계산 함수를 다시 실행한다
$(':input#monName').on('change', function(){
var $monMulbang=Number(monData[$(this).val()].DEF*3)+Number(monData[$(this).val()].물리방어력*3);
var $monMabang=Number(monData[$(this).val()].MR*3)+Number(monData[$(this).val()].마법방어력*3);
var $monSokseong=Number(monData[$(this).val()].속성);
$(':input#monMulbang').val($monMulbang);
$(':input#monMabang').val($monMabang);
$(':input#monSokseong').val($monSokseong);
calDamage();
});


/*
곰나이스 계열공식
찬솔렛, 로아미니, 아나이스평타, 장판 효과 추가
엑셀 파일이랑 결과값 차이 없는지 체크
적용효과수치 테스트 : 신방, 아나이스정의의심판, 커스, 러스트아머, 브레이크아머, 로아미니 등등
폼 유효성 검사, 이스케이핑 추가 /기합, 각비 등 각종 중복안되는것

입력값 저장/불러오기 슬롯 기능
신미/콤연에 따른 DPS 추가
범위/사거리 입력

베리어효율 제공
입력폼 인터페이스 정렬
아티펙트 데이터 저장하여 불러오기에 따른 계산
실험용 임의의 몬스터, 임의의 스킬 추가 기능
랜덤옵션 반영
*/