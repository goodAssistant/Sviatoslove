var wrapperMonth = document.querySelector('.form_month');
var wrapperResult = document.querySelector('.form_result');
var inputMonth = wrapperMonth.querySelector('.month');
var inputDays = wrapperMonth.querySelector('.days');
var buttonMonth = wrapperMonth.querySelector('.order__month');
var inputDate = wrapperResult.querySelector('.input__date');
var inputHour = wrapperResult.querySelector('.input__hour');
var inputPP = wrapperResult.querySelector('.input__pp');
var inputPubl = wrapperResult.querySelector('.input__publ');
var inputVideo = wrapperResult.querySelector('.input__video');
var inputIz = wrapperResult.querySelector('.input__iz');
var buttonResult = wrapperResult.querySelector('.order__result');
var wrapperYear = document.querySelector('.wrapper__year');

let reports;

if(!localStorage.getItem('reports')) {
    reports = [];
} else {
  reports = JSON.parse(localStorage.getItem('reports'));
}

var valueMonth;
var monthName = '';
const cell = 6;

var tableMatrix1 = [];
var tableMatrix2 = [];
var tableMatrix3 = [];
var tableMatrix4 = [];
var tableMatrix5 = [];
var tableMatrix6 = [];
var tableMatrix7 = [];
var tableMatrix8 = [];
var tableMatrix9 = [];
var tableMatrix10 = [];
var tableMatrix11 = [];
var tableMatrix12 = [];
var tableMatrixs = [tableMatrix1, tableMatrix2, tableMatrix3, tableMatrix4, tableMatrix5, tableMatrix6, tableMatrix7, tableMatrix8, tableMatrix9, tableMatrix10, tableMatrix11, tableMatrix12];

var numberClickMonth = 0;

const active = {
  x: 0,
  y: 0
};

function renderWrapperTableDom(z) {
  var $wrapperTable = document.createElement('div');
  var $tableMonth = document.createElement('table');
  var $tBody = document.createElement('tbody');
  $tableMonth.classList.add('month');
  var $monthName = document.createElement('h2');
  $monthName.classList.add('month__name');
  wrapperYear.prepend($wrapperTable);
  $wrapperTable.append($monthName);
  $wrapperTable.append($tableMonth);
  $tableMonth.append($tBody);
  $monthName.innerHTML = monthName;
  tableMatrixs.forEach((item, index) => {
    if(index === z) {
      $wrapperTable.classList.add(`table__wrapp${z}`);
      tableMatrixs[index - 1].forEach(function(row) {
        const $rowTr = document.createElement('tr');
        $rowTr.classList.add('row');
        row.forEach(function(cell) {
          if(cell.active){
            const $cellTh = document.createElement('th');
            $cellTh.classList.add('cell', 'title');
            $rowTr.append($cellTh);
          }else {
            const $cellTd = document.createElement('td');
            $cellTd.classList.add('cell');
            $rowTr.append($cellTd);
          };
        });
        return $tBody.append($rowTr);
      });
    };
  });
  var $row = $wrapperTable.querySelectorAll('.cell');
  $row.forEach(function(cell, idx){
    if(idx === ((+ valueMonth) + 1)){
      cell.innerHTML = 'Итого:'
    }else if(cell.tagName === 'TD' && idx <= valueMonth){
      cell.innerHTML = idx;
    };
  });  
  var $titles = wrapperYear.querySelectorAll('.title');
  var valueTitles = ['Число', 'Часы', 'ПП', 'Публ', 'Видео', 'Из'];
  $titles.forEach(function(th, idx){ 
    valueTitles.forEach(function(item, id){
      if(idx === id){
        th.innerHTML = item;
      };
    });
  });
};

function renderTableMatrix(c){
  for (let y = 0; y < cell; y++) {
    const row = [];
    for (let x = 0; x < (+ valueMonth + 2) ; x++) {
      const copyCell = Object.assign({}, cell);
      if(x === 0) {
        copyCell.active = true;
      };
      row.push(copyCell);
    };
    tableMatrixs.forEach((item, index) => {
      if(index === c) {
        tableMatrixs[index - 1].push(row);
      }
    })

  };
  renderWrapperTableDom(c);
};

buttonMonth.addEventListener('click', function(){
  numberClickMonth += 1;
  if(inputDays.value > 0) {
    valueMonth = inputDays.value;
    monthName = inputMonth.value;
  }else if(isNaN(inputDays.value)) {
    alert('Вы ввели не число в поле "Введите количество дней". Пожалуйста попробуйте ещё раз.')
  };
  inputDays.value = '';
  inputMonth.value = '';
  renderTableMatrix(numberClickMonth);
});

let sum = () => {
  let $wrapperTable = document.querySelector(`.table__wrapp${numberClickMonth}`);
  let $row = $wrapperTable.querySelectorAll('.cell');
  let arrHours = [];
  let arrPp = [];
  let arrPubl = [];
  let arrVid = [];
  let arrIz = [];
  Array.from($row).map((cell, i) => {
    let conditionFrom = (+ valueMonth + 2);
    let conditionWithin = (+ valueMonth + 1);
    if(i > conditionFrom && i < conditionFrom + conditionWithin) {
      arrHours.push(cell);
    }else if (i > conditionFrom * 2 && i < conditionFrom * 2 + conditionWithin){
      arrPp.push(cell);
    }else if (i > conditionFrom * 3 && i < conditionFrom * 3 + conditionWithin){
      arrPubl.push(cell);
    }else if (i > conditionFrom * 4 && i < conditionFrom * 4 + conditionWithin){
      arrVid.push(cell);
    }else if (i > conditionFrom * 5 && i < conditionFrom * 5 + conditionWithin){
      arrIz.push(cell);
    };
  })
  var resultHours = arrHours.reduce((sum, item) => {
    return sum + (+item.innerHTML);
  }, 0);
  var resultPp = arrPp.reduce((sum, item) => {
    return sum + (+item.innerHTML);
  }, 0);
  var resultPubl = arrPubl.reduce((sum, item) => {
    return sum + (+item.innerHTML);
  }, 0);
  var resultVid = arrVid.reduce((sum, item) => {
    return sum + (+item.innerHTML);
  }, 0);
  var resultIz = arrIz.reduce((sum, item) => {
    return sum + (+item.innerHTML);
  }, 0);
  for(let i = 0; i < $row.length; i++){
    let condition = (+ valueMonth + 3);
    let conditionTh = $row[i].tagName === 'TH';
    if(i > valueMonth && i < condition && conditionTh) {
      let idx = i + ( + valueMonth + 1);
      $row[idx].innerHTML = resultHours;
    }else if(i > valueMonth * 2 && i < condition * 2 && conditionTh) {
      let idx = i + ( + valueMonth + 1);
      $row[idx].innerHTML = resultPp;
    }else if(i > valueMonth * 3 && i < condition * 3 && conditionTh) {
      let idx = i + ( + valueMonth + 1);
      $row[idx].innerHTML = resultPubl;
    }else if(i > valueMonth * 4 && i < condition * 4 && conditionTh) {
      let idx = i + ( + valueMonth + 1);
      $row[idx].innerHTML = resultVid;
    }else if(i > valueMonth * 5 && i < condition * 5 && conditionTh) {
      let idx = i + ( + valueMonth + 1);
      $row[idx].innerHTML = resultIz;
    }
  };
};



buttonResult.addEventListener('click', () => {
  var $wrapperTable = document.querySelector(`.table__wrapp${numberClickMonth}`);
  var $row = $wrapperTable.querySelectorAll('.cell');
  for(let i = 0; i < $row.length; i++){
    if((+inputDate.value + (+valueMonth)) + 2 === i) {
      $row[i].innerHTML = inputHour.value;
      i += (+valueMonth)+ 2;
      $row[i].innerHTML = inputPP.value;
      i += (+valueMonth)+ 2;
      $row[i].innerHTML = inputPubl.value;
      i += (+valueMonth)+ 2;
      $row[i].innerHTML = inputVideo.value;
      i += (+valueMonth)+ 2;
      $row[i].innerHTML = inputIz.value;
    };
  };
  sum();
  inputDate.value = '';
  inputHour.value = '';
  inputPP.value = '';
  inputPubl.value = '';
  inputVideo.value = '';
  inputIz.value = '';
});














if(!localStorage.getItem('reportsMonth') && !localStorage.getItem('reportsValue')) {
  reportsMonth = [];
  reportsValue = [];
 } else {
  reportsValue = [];
 
  reportsMonth = JSON.parse(localStorage.getItem('reportsMonth'));
  // reportsValue = JSON.parse(localStorage.getItem('reportsValue'));
 }
 
 class CreateMonth {
  constructor(monthName, daysMonth) {
   this.monthName = monthName;
   this.daysMonth = daysMonth;
  }
 }
 
 class CreateValue {
  constructor(monthDay, hours, pp, publ, video, iz, resultHours, resultPp, resultPubl, resultVid, resultIz) {
    this.monthDay = monthDay;
    this.hours = hours;
    this.pp = pp;
    this.publ = publ;
    this.video = video;
    this.iz = iz;
    this.resultHours = resultHours;
    this.resultPp = resultPp;
    this.resultPubl = resultPubl;
    this.resultVid = resultVid;
    this.resultIz = resultIz;
  }
 }
 
 const renderWrapperTableDom = index => {
  let arrTableMonth = [
   reportsMonth[index].monthName,
   reportsMonth[index].daysMonth
  ];
  let $wrapperTable = document.createElement('div');
  let $tableMonth = document.createElement('table');
  let $tBody = document.createElement('tbody');
  $tableMonth.classList.add('month');
  let $monthName = document.createElement('h2');
  $monthName.classList.add('month__name');
  wrapperYear.prepend($wrapperTable);
  $wrapperTable.append($monthName);
  $wrapperTable.append($tableMonth);
  $tableMonth.append($tBody);
  $monthName.innerHTML = reportsMonth[index].monthName;
  const arrDaysMonth = Array.from({ length: reportsMonth[index].daysMonth, }, (v, i) =>  i + 1);
  arrDaysMonth.push('Итого:', `❌`);
  const valueTitles = ['Число', 'Часы', 'ПП', 'Публ', 'Видео', 'Из'];
  valueTitles.forEach((row, idx) => {
   const $rowTr = document.createElement('tr');
   $rowTr.classList.add('row');
   const $cellTh = document.createElement('th');
   $cellTh.classList.add('cell', 'title');
   $cellTh.innerHTML = row;
   $rowTr.append($cellTh);
   arrDaysMonth.forEach((days, id) => {
    const $cellTd = document.createElement('td');
    if(idx === 0) {
     $cellTd.classList.add('cell');
     $cellTd.innerHTML = days;
     $rowTr.append($cellTd);
    }else if (id < arrDaysMonth.length - 1) {
     $cellTd.classList.add('cell');
     $rowTr.append($cellTd);
    };
   }); 
  return $tBody.append($rowTr);
  });
 };
 
 const getReportsLength = () => {
  reportsMonth.forEach((item, idx) => {
   renderWrapperTableDom(idx);
  });
 }
 
 getReportsLength();
 
 buttonMonth.addEventListener('click', function(){
  console.log(inputMonth.value)
 
  if(isNaN(inputMonth.value) && inputDays.value > 0) {
   console.log(1)
   reportsMonth.push(new CreateMonth(inputMonth.value, inputDays.value))
   localStorage.setItem('reportsMonth', JSON.stringify(reportsMonth));
   renderWrapperTableDom(reportsMonth.length - 1);
  }else if(isNaN(inputDays.value)) {
   alert('Вы ввели не число в поле "Введите количество дней". Пожалуйста попробуйте ещё раз.');
  }else{
   alert('Вы ввели число в поле "Название месяца". Будьте внимательнее пожалуйста.');
  }
  inputDays.value = '';
  inputMonth.value = '';
  console.log(3)
 
 });
 
 reportsValue.push(new CreateValue('2', '10', '11', '12', '13', '14', '2', '3', '2', '3', '1'))
 reportsValue.push(new CreateValue('7', '10', '11', '12', '13', '14', '2', '3', '2', '3', '1'))
 reportsValue.push(new CreateValue('1', '10', '11', '12', '13', '14', '2', '3', '2', '3', '1'))
 
 const inputDaysValue = (index) => {
  let arrDaysValue = [
   reportsValue[index].monthDay,
   reportsValue[index].hours,
   reportsValue[index].pp,
   reportsValue[index].publ,
   reportsValue[index].video,
   reportsValue[index].iz,
   reportsValue[index].resultHours,
   reportsValue[index].resultPp,
   reportsValue[index].resultPubl,
   reportsValue[index].resultVid,
   reportsValue[index].resultIz
  ];
  const arrDaysMonth = Array.from({ length: reportsMonth[index].daysMonth, }, (v, i) =>  i + 1);
  arrDaysMonth.forEach((days, idx) => {
   console.log(days)
   console.log(days === (+ reportsValue[index].monthDay))
 
   if(days === (+ reportsValue[index].monthDay)) {
    const value = [reportsValue[index].hours,
    reportsValue[index].pp,
    reportsValue[index].publ,
    reportsValue[index].video,
    reportsValue[index].iz]
    value.forEach((item, id) => {
     console.log(id)
    if(idx === id) {
     const $cellTh = document.querySelectorAll('th')
     $cellTh.forEach
     cellTd.innerHTML = item;
    }
   })
   };
  })
 }
 
 inputDaysValue(0)
 
 
 let sum = () => {
  let $wrapperTable = document.querySelector(`.table__wrapp${numberClickMonth}`);
  let $row = $wrapperTable.querySelectorAll('.cell');
  let arrHours = [];
  let arrPp = [];
  let arrPubl = [];
  let arrVid = [];
  let arrIz = [];
  Array.from($row).map((cell, i) => {
    let conditionFrom = (+ valueMonth + 2);
    let conditionWithin = (+ valueMonth + 1);
    if(i > conditionFrom && i < conditionFrom + conditionWithin) {
      arrHours.push(cell);
    }else if (i > conditionFrom * 2 && i < conditionFrom * 2 + conditionWithin){
      arrPp.push(cell);
    }else if (i > conditionFrom * 3 && i < conditionFrom * 3 + conditionWithin){
      arrPubl.push(cell);
    }else if (i > conditionFrom * 4 && i < conditionFrom * 4 + conditionWithin){
      arrVid.push(cell);
    }else if (i > conditionFrom * 5 && i < conditionFrom * 5 + conditionWithin){
      arrIz.push(cell);
    };
  })
  var resultHours = arrHours.reduce((sum, item) => {
    return sum + (+item.innerHTML);
  }, 0);
  var resultPp = arrPp.reduce((sum, item) => {
    return sum + (+item.innerHTML);
  }, 0);
  var resultPubl = arrPubl.reduce((sum, item) => {
    return sum + (+item.innerHTML);
  }, 0);
  var resultVid = arrVid.reduce((sum, item) => {
    return sum + (+item.innerHTML);
  }, 0);
  var resultIz = arrIz.reduce((sum, item) => {
    return sum + (+item.innerHTML);
  }, 0);
  for(let i = 0; i < $row.length; i++){
    let condition = (+ valueMonth + 3);
    let conditionTh = $row[i].tagName === 'TH';
    if(i > valueMonth && i < condition && conditionTh) {
      let idx = i + ( + valueMonth + 1);
      $row[idx].innerHTML = resultHours;
    }else if(i > valueMonth * 2 && i < condition * 2 && conditionTh) {
      let idx = i + ( + valueMonth + 1);
      $row[idx].innerHTML = resultPp;
    }else if(i > valueMonth * 3 && i < condition * 3 && conditionTh) {
      let idx = i + ( + valueMonth + 1);
      $row[idx].innerHTML = resultPubl;
    }else if(i > valueMonth * 4 && i < condition * 4 && conditionTh) {
      let idx = i + ( + valueMonth + 1);
      $row[idx].innerHTML = resultVid;
    }else if(i > valueMonth * 5 && i < condition * 5 && conditionTh) {
      let idx = i + ( + valueMonth + 1);
      $row[idx].innerHTML = resultIz;
    }
  };
 };
 
 buttonResult.addEventListener('click', () => {
  var $row = $wrapperTable.querySelectorAll('.cell');
  for(let i = 0; i < $row.length; i++){
    if((+inputDate.value + (+valueMonth)) + 2 === i) {
      $row[i].innerHTML = inputHour.value;
      i += (+valueMonth)+ 2;
      $row[i].innerHTML = inputPP.value;
      i += (+valueMonth)+ 2;
      $row[i].innerHTML = inputPubl.value;
      i += (+valueMonth)+ 2;
      $row[i].innerHTML = inputVideo.value;
      i += (+valueMonth)+ 2;
      $row[i].innerHTML = inputIz.value;
    };
  };
  sum();
  inputDate.value = '';
  inputHour.value = '';
  inputPP.value = '';
  inputPubl.value = '';
  inputVideo.value = '';
  inputIz.value = '';
 });
 
 





 

 const renderWrapperTableDom = index => {
  let arrTable = [
   reports[index].monthName,
   reports[index].daysMonth,
   reports[index].monthDay,
   reports[index].hours,
   reports[index].pp,
   reports[index].publ,
   reports[index].video,
   reports[index].iz,
   reports[index].resultHours,
   reports[index].resultPp,
   reports[index].resultPubl,
   reports[index].resultVid,
   reports[index].resultIz,
   `❌`
  ];
  console.log(arrTable);
  let $wrapperTable = document.createElement('div');
  let $tableMonth = document.createElement('table');
  let $tBody = document.createElement('tbody');
  $tableMonth.classList.add('month');
  let $monthName = document.createElement('h2');
  $monthName.classList.add('month__name');
  wrapperYear.prepend($wrapperTable);
  $wrapperTable.append($monthName);
  $wrapperTable.append($tableMonth);
  $tableMonth.append($tBody);
  $monthName.innerHTML = reports[index].monthName;
  const arrDaysMonth = Array.from({ length: reports[index].daysMonth, }, (v, i) =>  i + 1);
  arrDaysMonth.push('Итого:');
  arrTable.forEach((rows, idx) => {
   if(idx > 1 && idx < 8) {
    const $rowTr = document.createElement('tr');
    $rowTr.classList.add('row');
    const $cellTh = document.createElement('th');
    $cellTh.classList.add('cell', 'title');
    $rowTr.append($cellTh);
    arrDaysMonth.forEach(days => {
     const $cellTd = document.createElement('td');
     if(idx === 2) {
      $cellTd.classList.add('cell');
      $cellTd.innerHTML = days;
      $rowTr.append($cellTd);
     }else {
      $cellTd.classList.add('cell');
      $rowTr.append($cellTd);
     };
     if(days === (+ reports[index].monthDay)) {
      const value = [reports[index].hours,
      reports[index].pp,
      reports[index].publ,
      reports[index].video,
      reports[index].iz]
      value. forEach((item, id) => {
       if(idx - 3 === id) {
        $cellTd.innerHTML = item;
 
       }
 
      })
     };
    });
    return $tBody.append($rowTr);
   };
  });
  const $arrTh = document.querySelectorAll('th')
  const valueTitles = ['Число', 'Часы', 'ПП', 'Публ', 'Видео', 'Из'];
  $arrTh.forEach((th, idx) => {
   valueTitles.map((thValue,id) => {
    if(idx === id) {
     th.innerHTML = thValue;
    };
   });
  });
 };