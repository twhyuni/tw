$('.main.menu').visibility({type: 'fixed'});

$('#hide').on('click', function(){$('#info').hide();});
$('#show').on('click', function(){$('#info').show();});

$('.help.icon').popup();
$('.stat.tooltip').popup({on:'focus', position:'bottom center',target:'#status',title:'최종스탯', content:'룬스킬, 몬스터카드, 상태이상 등을 모두 포함한 최종 스탯을 입력해주세요.'});
$('.biho.help.icon').popup({position:'bottom center', title:'프레쉬에어, 하드웨폰', content:'(시전자의 순수MR+마방합)/50 , 최대 25'});

$('[type="number"]').width(50);

//스킬리스트를 표로 나타낸다
	for(var i=0; i<skillData.length; i++){
$('#contents').append("<tr><td>"+skillData[i].캐릭터+"</td><td>"+skillData[i].스킬+"</td><td class=\"factorSkillResult\"></td><td>"+skillData[i].타격수+"</td><td class=\"factorCriResult\"></td><td class=\"damageResult\"></td></tr>");
	}

//대미지를 계산하는 함수를 정의한다
function calDamage(){

//입력값을 변수와 로컬저장소에 담는다
var $userGakseong = Number($('#gakseong').val());
localStorage.setItem('gakseong', $userGakseong);

var $userGeukhan = Boolean($('#geukhan').is(':checked'));
localStorage.setItem('geukhan', $userGeukhan);

//극한 시 각성에 따른 댐증
if($('#geukhan').is(':checked')){
if($('#gakseong').val() == 2){var $userGakseongPlus = 1.1}
else if($('#gakseong').val() == 3){var $userGakseongPlus = 1.25}else{var $userGakseongPlus = 1}}else{var $userGakseongPlus = 1}

if($('#muyeon').is(':checked')){var $userMuyeon = 0.2}else{var $userMuyeon = 0}
if($('#bomu').is(':checked')){var $userBomu = 0.05}else{var $userBomu = 0}

var $userRune = Number($('#rune').val());
localStorage.setItem('rune', $userRune);

var $userSokseong = Number($('#sokseong').val());
localStorage.setItem('sokseong', $userSokseong);

var $userJjil = Number($(':input#jjil').val());
localStorage.setItem('jjil', $userJjil);

var $userBegi = Number($(':input#begi').val());
localStorage.setItem('begi', $userBegi);

var $userMagong = Number($(':input#magong').val());
localStorage.setItem('magong', $userMagong);

var $userMabang = Number($(':input#mabang').val());
localStorage.setItem('mabang', $userMabang);

var $userStab = Number($(':input#stab').val());
localStorage.setItem('stab', $userStab);

var $userHack = Number($(':input#hack').val());
localStorage.setItem('hack', $userHack);

var $userInt = Number($(':input#int').val());
localStorage.setItem('int', $userInt);

var $userMr = Number($(':input#mr').val());
localStorage.setItem('mr', $userMr);

var $userDex = Number($(':input#dex').val());
localStorage.setItem('dex', $userDex);

var $userDamAbil = Number($(':input#damAbil').val());
localStorage.setItem('damAbil', $userDamAbil);

var $userTuguseed = Number($('#tuguseed').val());
localStorage.setItem('tuguseed', $userTuguseed);

var $userArti = Number($('#arti').val());
localStorage.setItem('arti', $userArti);

var $userTtang = Number($('#ttang').val());
localStorage.setItem('ttang', $userTtang);

if($('#gakbi').is(':checked')){var $userGakbi = 0.2}else{var $userGakbi = 0}
if($('#ssang').is(':checked')){var $userSsang = 0.1}else{var $userSsang = 0}
if($('#goemul').is(':checked')){var $userGoemul = 0.1}else{var $userGoemul = 0}
if($('#goeham').is(':checked')){var $userGoeham = 0.1}else{var $userGoeham = 0}
if($('#dalbit').is(':checked')){var $userDalbit = 1}else{var $userDalbit = 0}
if($('#seungja').is(':checked')){var $userSeungja = 0.15}else{var $userSeungja = 0}

if($('#sinbang').is(':checked')){var $userSinbang = 0.1}else{var $userSinbang = 0}
if($('#combo').is(':checked')){var $userCombo = 1.3}else{var $userCombo = 1}
if($('#dobal').is(':checked')){var $userDobal = 20}else{var $userDobal = 0}

var $userBenyamastery = Number($('#benyamastery').val());
localStorage.setItem('benyamastery', $userBenyamastery);

if($('#fairyLight').is(':checked')){var $userFairyLight = 0.1}else{var $userFairyLight = 0}
if($('#overPace').is(':checked')){var $userOverPace = 0.15}else{var $userOverPace = 0}

if($('#poisonNova').is(':checked') && $('#loaLimit').val()=="2"){var $monPoisonNova = 0.1}
else if($('#poisonNova').is(':checked') && $('#loaLimit').val()=="3"){var $monPoisonNova = 0.2}
else if($('#poisonNova').is(':checked') && $('#loaLimit').val()=="4"){var $monPoisonNova = 0.1}
else{var $monPoisonNova = 0}


if($('#chantLimit').is(':checked')){var $userChantLimit = 0.1}else{var $userChantLimit = 0}


if($('#loaLimit').val()=="2"){var $userPoisonNova = 0.1}
else if($('#loaLimit').val()=="3"){var $userPoisonNova = 0.2}
else if($('#loaLimit').val()=="4"){var $userPoisonNova = 0.1}
else{var $userPoisonNova = 0}

var $userLoaLimit = Number($('#loaLimit').val());
localStorage.setItem('loaLimit', $userLoaLimit);


var $userFreshAir = Number($('#freshAir').val());
localStorage.setItem('freshAir', $userFreshAir);

var $userEtcSum = Number($('#etcSum').val());
localStorage.setItem('etcSum', $userEtcSum);

//스킬공통 댐증요소
var factorSum = ($userDamAbil/100)+$userSinbang+$userGakbi+$userSsang+$userGoemul+$userGoeham+$userSeungja+$userTtang+$userDalbit+$userPoisonNova+$userChantLimit+($userEtcSum/100);
var factorMul = $userGakseongPlus*$userCombo*(1+$userArti/100)*(1+$userFreshAir/100);
var factorSum2 = 1+$userFairyLight+$userOverPace+$monPoisonNova;

//스킬공격력, 크리티컬, 대미지를 출력할 셀을 모두 찾아 배열로 정의한다
var damageResult = document.querySelectorAll('.damageResult');
var factorSkillResult = document.querySelectorAll('.factorSkillResult');
var factorCriResult = document.querySelectorAll('.factorCriResult');

//반복문 시작
for (var i=0; i<damageResult.length; i++){

//스킬 계열에 따른 스탯공격력, 장비공격력을 계산한다
	if(skillData[i].계열=="STAB"&&skillData[i].캐릭터!="아나이스"){
		var factorStat = Math.floor(($userStab*2.1)+($userHack*1.08));
		var factorArm = Math.floor(($userJjil*6.67)+($userBegi*1))*(1+((skillData[i].극한전기합+$userDobal)/100))}
	else if(skillData[i].계열=="STAB"&&skillData[i].캐릭터=="아나이스"){
		var factorStat = Math.floor(($userInt*2.1)+($userHack*1.08));
		var factorArm = Math.floor(($userMagong*6.67)+($userBegi*1))*(1+((skillData[i].극한전기합+$userDobal)/100));}
	else if(skillData[i].계열=="HACK"){
		var factorStat = Math.floor(($userHack*2.1)+($userStab*1.08));
		var factorArm = Math.floor(($userBegi*6.67)+($userJjil*1))*(1+((skillData[i].극한전기합+$userDobal)/100));}
	else if(skillData[i].계열=="STAB+HACK"){
		var factorStat = Math.floor(($userStab*1.8)+($userHack*1.8));
		var factorArm = Math.floor(($userJjil*4.55)+($userBegi*4.55))*(1+((skillData[i].극한전기합+$userDobal)/100));}
	else if(skillData[i].계열=="HACK+INT"){
		var factorStat = Math.floor(($userHack*1.8)+($userInt*1.5));
		var factorArm = Math.floor(($userBegi*4.55)+($userMagong*3.85))*(1+((skillData[i].극한전기합+$userDobal)/100));}
	else if(skillData[i].계열=="STAB+INT"){
		var factorStat = Math.floor(($userStab*1.8)+($userInt*1.5));
		var factorArm = Math.floor(($userJjil*4.55)+($userMagong*3.85))*(1+((skillData[i].극한전기합+$userDobal)/100));}
	else if(skillData[i].계열=="INT"){
		var factorStat = Math.floor(($userInt*2.4)+($userMr*0.6));
		var factorArm = Math.floor(($userMagong*5.95)+($userMabang*1.05))*(1+((skillData[i].극한전기합+$userDobal)/100));}
	else if(skillData[i].계열=="MR"){
		var factorStat = Math.floor(($userInt*0.45)+($userMr*2.55));
		var factorArm = Math.floor(($userMabang*5.25)+($userMagong*0.7))*(1+((skillData[i].극한전기합+$userDobal)/100));}
	else{
		var factorStat = 0;
		var factorArm = 0;

		/**(1+([@[극한전기합]]/100)+IF(도발=TRUE,0.2,0))*/
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

//벤야 마스터리 적용
if(skillData[i].마스터리_소울차지==40 && $('#benyamastery').val()=="1"){var $userBenyamastery = Number(skillData[i].마스터리_소울차지)}
else if(skillData[i].마스터리_소울커터==40 && $('#benyamastery').val()=="2"){var $userBenyamastery = Number(skillData[i].마스터리_소울커터)}
else if(skillData[i].마스터리_파워크러쉬==40 && $('#benyamastery').val()=="3"){var $userBenyamastery = Number(skillData[i].마스터리_파워크러쉬)}
else{var $userBenyamastery = 0}

//스킬별 기본대미지계산요소
var factorSkill = Number(skillData[i].스킬공격력)+ $userTuguseed + $userTugu + $userBenyamastery;
var factorCri = Number(skillData[i].크리배율)*((1+$userYakgan+$userComyeon+$userBocom)+((2/3)*($userRune)/100));

//몬스터 방어력(물공이면 물방값, 마공이면 마방값을 적용한다)
if(skillData[i].계열=="STAB"||skillData[i].계열=="HACK"||skillData[i].계열=="STAB+HACK"){
var factorMon = $(':input#monMulbang').val();}
else{var factorMon = $(':input#monMabang').val();}

//몬스터 속성에 따른 대미지 증가
var sokGap = Number($userSokseong)-Number($(':input#monSokseong').val());
if(sokGap<0){var factorSok = 1;}
else if(sokGap>80){var factorSok = 1.5;}
else{var factorSok = 1+sokGap*0.00625;}

//해당 셀에 스킬공격력, 크리티컬, 최종대미지를 출력한다
factorSkillResult[i].innerHTML=factorSkill;
factorCriResult[i].innerHTML=factorCri.toFixed(2);

//최소대미지 계산
var damageResultMin = Math.round((factorStat+(factorArm*(1+$userMuyeon+$userBomu))+1-factorMon)*factorSok*(factorSkill/100)*factorCri*(1+factorSum+(Number(skillData[i].댐증버프_덧셈)/100))*factorSum2*factorMul*(1+(Number(skillData[i].댐증버프_곱셈)/100)));
if(damageResultMin<0){var damageResultMin = 0};
if($('#geukhan').is(':checked')==false && $('#gakseong').val() == 0 && damageResultMin >7000){damageResultMin = 7000}
else if($('#geukhan').is(':checked')==false && $('#gakseong').val() == 1 && damageResultMin >9999){damageResultMin = 9999}
else if($('#geukhan').is(':checked')==false && $('#gakseong').val() == 2 && damageResultMin >12000){damageResultMin = 12000}
else if($('#geukhan').is(':checked')==false && $('#gakseong').val() == 3 && damageResultMin >15000){damageResultMin = 15000}

//최대대미지 계산
var damageResultMax = Math.round((factorStat+(factorArm*(1+$userMuyeon+$userBomu))+1+((factorStat+3*$userDex)/18)-factorMon)*factorSok*(factorSkill/100)*factorCri*(1+factorSum+(Number(skillData[i].댐증버프_덧셈)/100))*factorSum2*factorMul*(1+(Number(skillData[i].댐증버프_곱셈)/100)));
if(damageResultMax<0){var damageResultMax = 0};
if($('#geukhan').is(':checked')==false && $('#gakseong').val() == 0 && damageResultMax >7000){damageResultMax = 7000}
else if($('#geukhan').is(':checked')==false && $('#gakseong').val() == 1 && damageResultMax >9999){damageResultMax = 9999}
else if($('#geukhan').is(':checked')==false && $('#gakseong').val() == 2 && damageResultMax >12000){damageResultMax = 12000}
else if($('#geukhan').is(':checked')==false && $('#gakseong').val() == 3 && damageResultMax >15000){damageResultMax = 15000}

//대미지 셀에 대미지 출력
damageResult[i].innerHTML= damageResultMin +" ~ "+ damageResultMax;

}//반복문 끝

}//대미지계산함수 끝

//페이지가 준비되면 로컬저장소에 저장된 입력값을 입력칸에 기본값으로 표시
$(document).ready(function(){
document.getElementById('gakseong').value = localStorage.getItem('gakseong');
document.getElementById('rune').value = localStorage.getItem('rune');
document.getElementById('sokseong').value = localStorage.getItem('sokseong');
document.getElementById('jjil').value = localStorage.getItem('jjil');
document.getElementById('begi').value = localStorage.getItem('begi');
document.getElementById('magong').value = localStorage.getItem('magong');
document.getElementById('mabang').value = localStorage.getItem('mabang');
document.getElementById('stab').value = localStorage.getItem('stab');
document.getElementById('hack').value = localStorage.getItem('hack');
document.getElementById('int').value = localStorage.getItem('int');
document.getElementById('mr').value = localStorage.getItem('mr');
document.getElementById('dex').value = localStorage.getItem('dex');
document.getElementById('damAbil').value = localStorage.getItem('damAbil');
document.getElementById('tuguseed').value = localStorage.getItem('tuguseed');
document.getElementById('arti').value = localStorage.getItem('arti');
document.getElementById('ttang').value = localStorage.getItem('ttang');
document.getElementById('loaLimit').value = localStorage.getItem('loaLimit');
document.getElementById('benyamastery').value = localStorage.getItem('benyamastery');
document.getElementById('freshAir').value = localStorage.getItem('freshAir');
document.getElementById('etcSum').value = localStorage.getItem('etcSum');
});


//몬스터 데이터를 선택지에 한줄씩 추가한다
for(var i=0; i<monData.length; i++){
$('#monName').append("<option value="+i+">"+monData[i].이름+"</option>")}

//몬스터 이름을 선택하면 해당 데이터를 표시한다
$(':input#monName').on('change', function(){

$monMulbang1 = Number(monData[$(this).val()].DEF*3);
$monMulbang2 = Number(monData[$(this).val()].물리방어력*3);
$(':input#monMulbang').val($monMulbang1+$monMulbang2);

$monMabang1 = Number(monData[$(this).val()].MR*3)
$monMabang2 = Number(monData[$(this).val()].마법방어력*3);
$(':input#monMabang').val($monMabang1+$monMabang2);

var $monSokseong=Number(monData[$(this).val()].속성);
$(':input#monSokseong').val($monSokseong);});

//몬스터 방어력 디버프류
$('#monDebuff input').on('change', function(){
	if($('#holyShout').is(':checked')){var $monHolyShout = 0.8}else{var $monHolyShout = 1}
	if($('#poisonNova').is(':checked')){var $monPoisonNova = 0.9}else{var $monPoisonNova = 1}
	if($('#soeyak').is(':checked')){var $monSoeyak = 0.8}else{var $monSoeyak = 1}
	if($('#dokseol').is(':checked')){var $monDokseol = 0.8}else{var $monDokseol = 1}
	if($('#curse').is(':checked')){var $monCurse = 0.8}else{var $monCurse = 1}
	if($('#rustArmour').is(':checked')){var $monRustArmour = 0.8}else{var $monRustArmour = 1}
	if($('#breakArmour').is(':checked')){var $monBreakArmour = 0.8}else{var $monBreakArmour = 1}

	$(':input#monMulbang').val($monMulbang1*$monHolyShout*$monSoeyak*$monDokseol*$monCurse*$monRustArmour*$monBreakArmour+$monMulbang2);
	$(':input#monMabang').val($monMabang1*$monHolyShout*$monSoeyak*$monDokseol*$monCurse+$monMabang2)});

//캐릭터를 선택하면, 캐릭터 필터 함수를 실행
$('#chaName').on('change', function(){
var chaName = document.getElementById("chaName");
var filter = chaName.value.toUpperCase();
var table = document.getElementById("skillTable");
var tr = table.getElementsByTagName("tr");
for (var i = 0; i < tr.length; i++) {
var td = tr[i].getElementsByTagName("td")[0];
if (td) {if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";} else {
        tr[i].style.display = "none";}}}});

//페이지가 준비되면 대미지계산함수 실행
$(document).ready(calDamage);

//입력칸에 값이 바뀌면 대미지계산함수 실행
$(':input').on('change', calDamage);