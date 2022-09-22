let wrapperMonth = document.querySelector('.form_month');
let wrapperResult = document.querySelector('.form_result');
let inputMonth = wrapperMonth.querySelector('.month');
let inputDays = wrapperMonth.querySelector('.days');
let buttonMonth = wrapperMonth.querySelector('.order__month');
let inputDate = wrapperResult.querySelector('.input__date');
let inputHour = wrapperResult.querySelector('.input__hour');
let inputPP = wrapperResult.querySelector('.input__pp');
let inputPubl = wrapperResult.querySelector('.input__publ');
let inputVideo = wrapperResult.querySelector('.input__video');
let inputIz = wrapperResult.querySelector('.input__iz');
let buttonResult = wrapperResult.querySelector('.order__result');
let wrapperYear = document.querySelector('.wrapper__year');

let reportsMonth;
let reportsValue;
let counterClick;

if(!localStorage.getItem('reportsMonth') && !localStorage.getItem('reportsValue')) {
 reportsMonth = [];
 reportsValue = [];
 counterClick = -1;
}else if(!localStorage.getItem('reportsValue')) {
  reportsMonth = JSON.parse(localStorage.getItem('reportsMonth'));
  reportsValue = [];
  counterClick = reportsMonth[reportsMonth.length - 1].counterClickTable;
}else if(!localStorage.getItem('reportsMonth')) {
  reportsMonth = [];
  counterClick = -1;
  reportsValue = JSON.parse(localStorage.getItem('reportsValue'));
} else {
 reportsMonth = JSON.parse(localStorage.getItem('reportsMonth'));
 reportsValue = JSON.parse(localStorage.getItem('reportsValue'));
 if(reportsMonth.length === 0) {
  counterClick = -1;
 }else {
  counterClick = reportsMonth[reportsMonth.length - 1].counterClickTable;
 };
};

class CreateMonth {
  constructor(id, monthName, daysMonth, counterClickTable) {
    this.id = id;
    this.monthName = monthName;
    this.daysMonth = daysMonth;
    this.counterClickTable = counterClickTable;
  };
};
 
class CreateValue {
  constructor(id, monthDay, hours, pp, publ, video, iz) {
    this.id = id;
    this.monthDay = monthDay;
    this.hours = hours;
    this.pp = pp;
    this.publ = publ;
    this.video = video;
    this.iz = iz
  };
};

const renderWrapperTableDom = index => {
  let arrTableMonth = [
    reportsMonth[index].monthName,
    reportsMonth[index].daysMonth,
    reportsMonth[index].id
  ];

 let $wrapperTable = document.createElement('div');
 $wrapperTable.classList.add(`wrapper__table`, `wrapper_table_${reportsMonth[index].id}`)
 let $tableMonth = document.createElement('table');
 let $tBody = document.createElement('tbody');
 $tableMonth.classList.add('table__month');
 let $monthName = document.createElement('h2');
 $monthName.classList.add('month__name');
 wrapperYear.prepend($wrapperTable);
 $wrapperTable.append($monthName);
 $wrapperTable.append($tableMonth);
 $tableMonth.append($tBody);
 $monthName.innerHTML = arrTableMonth[0];
 const arrDaysMonth = Array.from({ length: arrTableMonth[1]}, (v, i) =>  i + 1);
 arrDaysMonth.push('Итого:');
 const valueTitles = ['Число', 'Минуты', 'ПП', 'Публ', 'Видео', 'Из', 'Очистить»'];
 let $buttonDeleteTable = document.createElement('div');
 $buttonDeleteTable.classList.add('btn__delete', `${reportsMonth[index].id}`);
 $buttonDeleteTable.innerHTML = `Удалить таблицу`;
 $wrapperTable.append($buttonDeleteTable);
  valueTitles.forEach((row, idx) => {
    const $rowTr = document.createElement('tr');
    $rowTr.classList.add(`row__${reportsMonth[index].id}`);
    const $cellTh = document.createElement('th');
    $cellTh.classList.add('cell', 'title');
    $cellTh.innerHTML = row;
    $rowTr.append($cellTh);
    arrDaysMonth.forEach((days, id) => {
      const $cellTd = document.createElement('th');
      if(idx === 0) {
        $cellTd.innerHTML = days;
        $rowTr.append($cellTd);
      } else if (idx === valueTitles.length - 1) {
        if(id === arrDaysMonth.length - 1) {
          let $buttonDeleteValues = document.createElement('th');
          $buttonDeleteValues.innerHTML = `«столбец`;
          $rowTr.append($buttonDeleteValues);
        } else {
          let $buttonDeleteValues = document.createElement('th');
          $buttonDeleteValues.classList.add('btn__delete__values', `${days}`);
          $buttonDeleteValues.setAttribute('id', `${reportsMonth[index].id}`);

          $buttonDeleteValues.innerHTML = `❌`;
          $rowTr.append($buttonDeleteValues);
        };
      } else {
        if(id === arrDaysMonth.length - 1){
          const $cellTd = document.createElement('th');
          $cellTd.classList.add(`cell__${days}`);
          $rowTr.append($cellTd);
        }else {
          const $cellTd = document.createElement('td');
          $cellTd.classList.add(`cell__${days}`, `${reportsMonth[index].id}`, `${row}`);
          $cellTd.setAttribute('id', `${days}`);
          $cellTd.contentEditable = 'true';
          $rowTr.append($cellTd);
        };
      };
      return $tBody.append($rowTr);
    });
  });
};

const getResult = (arr) => {
  let valueResult = [];
  let arrHours = [];
  let arrPp = [];
  let arrPubl = [];
  let arrVid = [];
  let arrIz = [];
  arr.forEach(value => {
    arrHours.push(value.hours)
    arrPp.push(value.pp)
    arrPubl.push(value.publ)
    arrVid.push(value.video)
    arrIz.push(value.iz)
  });
  let resultHours = arrHours.reduce((sum, item) => {
    return sum + (+item);
  }, 0);
  let resultPp = arrPp.reduce((sum, item) => {
    return sum + (+item);
  }, 0);
  let resultPubl = arrPubl.reduce((sum, item) => {
    return sum + (+item);
  }, 0);
  let resultVid = arrVid.reduce((sum, item) => {
    return sum + (+item);
  }, 0);
  let resultIz = arrIz.reduce((sum, item) => {
    return sum + (+item);
  }, 0);
  return valueResult = [resultHours, resultPp, resultPubl, resultVid, resultIz];
};

const inputDaysValue = () => {
  let arrDaysValueId = [];
  let $wrapperTable = Array.from(document.querySelectorAll(`.wrapper__table`));
  reportsMonth.forEach((month, mId) => {
    let arrDaysMonth = Array.from({ length: month.daysMonth}, (v, i) =>  i + 1);
    arrDaysMonth.forEach(numDay => {
      arrDaysValueId = reportsValue.filter(obj => {
        if(obj.id === month.id){
          if(+ obj.monthDay === numDay) {
            return obj;
          };
        };
      });
      let valueResult = (getResult(arrDaysValueId));
      $wrapperTable.filter(elem => {
        if(+ elem.classList.value[29] === month.id){
          let $row = Array.from(elem.getElementsByClassName(`cell__${numDay}`));
          $row.forEach((cellValue, a) => {
            valueResult.forEach((value, b) => {
              if(a === b) {
                value === 0 ? cellValue.innerHTML = '' : cellValue.innerHTML = value;
              };
            });
          });
        };
      });
    });
  });
};

const getTimeFromMins = mins => {
  let hours = Math.trunc(mins/60);
  let minutes = mins % 60;
  return hours + 'ч. ' + minutes + 'м.';
};

const sum = () => {
  let $wrapperTable = Array.from(document.querySelectorAll(`.wrapper__table`));
  reportsMonth.forEach((month, mId) => {
    let arrDaysValueId = reportsValue.filter(obj => {
      if (obj.id === month.id){
        return obj;
      };
    });
    let valueResult = (getResult(arrDaysValueId));
    $wrapperTable.filter(table => {
      if(+ table.classList.value[29] === month.id) {
        let $cellResult = Array.from(table.getElementsByClassName(`cell__Итого:`));
        $cellResult.forEach((cell, cId) => {
          valueResult.forEach((valueRes, valResId) => {
            if(cId === valResId) {
              cId === 0 ? cell.innerHTML = getTimeFromMins(valueRes) : cell.innerHTML = valueRes;
            };
          });
        });
      };
    });
  });
};

buttonMonth.addEventListener('click', function(){
 if(isNaN(inputMonth.value) && inputDays.value > 0) {
  counterClick ++;
  reportsMonth.push(new CreateMonth(counterClick + 1, inputMonth.value, inputDays.value, counterClick))
  localStorage.setItem('reportsMonth', JSON.stringify(reportsMonth))
  renderWrapperTableDom(reportsMonth.length - 1);
  inputDaysValue();
  sum();
 }else if(isNaN(inputDays.value)) {
  alert('Вы ввели не число в поле "Введите количество дней". Пожалуйста попробуйте ещё раз.');
 }else{
  alert('Вы ввели число в поле "Название месяца". Будьте внимательнее пожалуйста.');
 };
 inputDays.value = '';
 inputMonth.value = '';
});

const pushBtnResult = () => {
  if(
    !isNaN(inputDate.value) && inputDate.value !== '' ||
    !isNaN(inputHour.value) && inputHour.value !== '' ||
    !isNaN(inputPP.value) && inputPP.value !== '' ||
    !isNaN(inputPubl.value) && inputPubl.value !== '' ||
    !isNaN(inputVideo.value) && inputVideo.value !== '' ||
    !isNaN(inputIz.value) && inputIz.value !== ''
    ) {
    reportsValue.push(new CreateValue(
      counterClick + 1,
      inputDate.value, 
      inputHour.value,
      inputPP.value,
      inputPubl.value,
      inputVideo.value,
      inputIz.value
    ));
    localStorage.setItem('reportsValue', JSON.stringify(reportsValue))
    inputDaysValue();
    sum();
  }else if(
    inputDate.value == ''
  ) {
    alert('Число месяца обязательный пункт для ввода.');
  } else {
    alert('Вы ввели не число в одно из полей. Будьте внимательнее пожалуйста.')
  };
  inputDate.value = '';
  inputHour.value = '';
  inputPP.value = '';
  inputPubl.value = '';
  inputVideo.value = '';
  inputIz.value = '';
};

buttonResult.addEventListener('click', pushBtnResult);

document.addEventListener('click', event => {
  let reportsValueTrans = [];
  let reportsValueNew = [];
  let $wrapperTable = document.querySelector(`.wrapper__year`);
  if(event.target.classList.contains('btn__delete')){
    if(confirm(`Вы уверены, что желаете удалить таблицу и все введённые в неё данные без возможности восстановления?`)) {
      if(confirm(`Извиняюсь, но хочу ещё раз уточнить, хорошо подумайте, данные потом не восстановишь! Удалить таблицу?`)) {
        if(confirm(`Ладно, ладно, хорошо, я понял, ты кремень и решительно настроен, твоё "да" означает "да", как и написано! Хвалю и удаляю?`)) {
          alert(`Мооооо - лооооооо - деееец!!!`);
          let classBtn = + event.target.classList[1];
          reportsMonth.forEach((month, monthIdx) => {
            if(reportsMonth.length > 1 ) {
              if(month.id === classBtn) {
                reportsMonth.splice(monthIdx, 1);
                localStorage.setItem('reportsMonth', JSON.stringify(reportsMonth));
                reportsValue.forEach((objVal, objValIdx) => {
                  if(objVal.id !== month.id) {
                    reportsValueTrans.push(reportsValue.slice(objValIdx, objValIdx + 1));
                    reportsValueNew = reportsValueTrans.flat();
                    localStorage.setItem('reportsValue', JSON.stringify(reportsValueNew));
                  };
                });
                $wrapperTable.innerHTML = ``;
                location.reload();
              };
            }else {
              reportsValue.splice(0);
              reportsMonth.splice(0);
              $wrapperTable.innerHTML = ``;
              localStorage.setItem('reportsValue', JSON.stringify(reportsValue));
              localStorage.setItem('reportsMonth', JSON.stringify(reportsMonth));
            };
          });
        };
      };
    };
    
  } else if (event.target.classList.contains('btn__delete__values')) {
    event.stopImmediatePropagation();
    let classCellBtn = + event.target.classList[1];
    let classTableBtn = + event.target.id;
    let indexMonth = reportsMonth.map(month => month.id).indexOf(classTableBtn);
    let idMonth = reportsMonth[indexMonth].id;
    let currentValuesMonth = reportsValue.filter(item => item.id === idMonth);
    let valuesMonth = reportsValue.filter(item => item.id !== idMonth);
    if(currentValuesMonth.find(item => + item.monthDay === classCellBtn)) {
      if(confirm(`Вы уверены, что желаете очистить все значения в столбце?`)) {
        let currentValues = currentValuesMonth.filter(item => + item.monthDay !== classCellBtn);
        let finalValues = [...valuesMonth, ...currentValues];
        $wrapperTable.innerHTML = ``;
        localStorage.setItem('reportsValue', JSON.stringify(finalValues));
        reportsValue = JSON.parse(localStorage.getItem('reportsValue'));
        getReportsLength();
      };
    };

  }else if(event.target.id !== '') {
    let classTableBtn = + event.target.classList[1];
    let dateValue = event.target.id;
    let hourValue;
    let ppValue;
    let publValue;
    let videoValue;
    let izValue;
    event.target.addEventListener ('keypress', (event) => {
      if(event.target.classList[2] === 'Минуты') {
        hourValue = event.target.innerHTML;
        ppValue = '';
        publValue = '';
        videoValue = '';
        izValue = '';
      }else if(event.target.classList[2] === 'ПП') {
        hourValue = '';
        ppValue = event.target.innerHTML;
        publValue = '';
        videoValue = '';
        izValue = '';
      }else if(event.target.classList[2] === 'Публ') {
        hourValue = '';
        ppValue = '';
        publValue = event.target.innerHTML;
        videoValue = '';
        izValue = '';
      }else if(event.target.classList[2] === 'Видео') {
        hourValue = '';
        ppValue = '';
        publValue = '';
        videoValue = event.target.innerHTML;
        izValue = '';
      }else if(event.target.classList[2] === 'Из') {
        hourValue = '';
        ppValue = '';
        publValue = '';
        videoValue = '';
        izValue = event.target.innerHTML;
      }
      if(event.key === 'Enter') {
        event.stopImmediatePropagation();
        event.preventDefault();
        reportsValue.push(new CreateValue(
          classTableBtn,
          dateValue, 
          hourValue,
          ppValue,
          publValue,
          videoValue,
          izValue
        ));
        localStorage.setItem('reportsValue', JSON.stringify(reportsValue))
        inputDaysValue();
        sum();
      };
    });
  };
});

i = 0;
dt = new Array(
  '#ffd70000', '#ffd7001a', '#ffd70036', '#ffd7004d', '#ffd70063', '#ffd70080', '#ffd7009e', '#ffd700ba', '#ffd700d1', '#ffd700e6', '#ffd700fa', "#ffd700", "#d5c328", "#a0963e", "#767144", "#827e5f", "#8c8973", '#8e8c80', '#afaea6', '#d3d2cb', '#efeeea', '#ffffff', '#f5ede2', '#ecdcc7', '#f0d6b4', '#f5d09e', '#f4c689', '#f5bf78', '#f3b767', '#f2ae54', '#f3a742', '#ef9c2f', '#ef9c2f', '#ef941c', '#f3900f', '#ff9000', '#ff9002e3', '#ff9002c9', '#ff9002ad', '#ff90028f', '#ff900278', '#ff90025e', '#ff900247', '#ff900233', '#ff900221', '#ff90020d', '#ff900200', '#64398b17', '#64398b36', '#64398b4f', '#64398b70', '#64398b87', '#64398b9e', '#64398bb5', '#64398bcc', '#64398be3', '#64398bf5', '#64398b', '#6d399d', '#7235ab', '#752fb6', '#7c2ac8', '#7f23d4', '#7f17df', '#7f0de8', '#8206f5', '#8400ff', '#7906df', '#6606bb', '#5a0aa1', '#4f0f88', '#4c1a79', '#4e2375', '#562f78', '#613e80', '#6a4b86', '#704c90', '#694f80', '#614f71', '#74697e', '#76717a', '#737275', '#5a5a5a', '#393737', '#201f1f', '#100f0f', '#0e0e0e', '#000000'
);

function cl() {
  document.querySelector('.reports__title').style.color = dt[i++];
  if (i > dt.length) i=0;
  setTimeout("cl()",200);
};

setTimeout("cl()",5);

const getReportsLength = () => {
 reportsMonth.forEach((item, idx) => {
  renderWrapperTableDom(idx);
 });
  inputDaysValue();
  sum();
};

getReportsLength();