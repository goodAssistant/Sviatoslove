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
 }
}

class CreateMonth {
 constructor(id, monthName, daysMonth, counterClickTable) {
  this.id = id;
  this.monthName = monthName;
  this.daysMonth = daysMonth;
  this.counterClickTable = counterClickTable;
 }
}
 
class CreateValue {
 constructor(id, monthDay, hours, pp, publ, video, iz) {
  this.id = id;
  this.monthDay = monthDay;
  this.hours = hours;
  this.pp = pp;
  this.publ = publ;
  this.video = video;
  this.iz = iz
 }
}

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
 $tableMonth.classList.add('month');
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
    $rowTr.classList.add('row');
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
          let $buttonDeleteValues = document.createElement('td');
          $buttonDeleteValues.style.fontWeight = 'bold';
          $buttonDeleteValues.innerHTML = `«столбец`;
          $rowTr.append($buttonDeleteValues);
        } else {
          let $buttonDeleteValues = document.createElement('th');
          $buttonDeleteValues.classList.add('btn__delete__values', `cell__${days}`, `${reportsMonth[index].id}`, `${days + 1}`);
          $buttonDeleteValues.innerHTML = `❌`;
          $rowTr.append($buttonDeleteValues);
        }
      } else {
        if(id === arrDaysMonth.length - 1){
          const $cellTd = document.createElement('th');
          $cellTd.classList.add(`cell__${days}`);
          $rowTr.append($cellTd);
        }else {
          const $cellTd = document.createElement('td');
          $cellTd.classList.add(`cell__${days}`);
          $rowTr.append($cellTd);
        }
      }
      return $tBody.append($rowTr);
    });
  });
};

const inputDaysValue = () => {
  let $wrapperTable = Array.from(document.querySelectorAll(`.wrapper__table`));
  reportsMonth.forEach((month, mId) => {
    let arrDaysValueId = reportsValue.filter(obj => {
      if (obj.id === month.id){
        return obj.id
      }
    })
    arrDaysValueId.forEach(item => {
      let arrDaysValue = [];
      arrDaysValue.push(item.hours)
      arrDaysValue.push(item.pp)
      arrDaysValue.push(item.publ)
      arrDaysValue.push(item.video)
      arrDaysValue.push(item.iz)

      $wrapperTable.filter(elem => {
        if(+ elem.classList.value[29] === month.id){
          let $row = Array.from(elem.getElementsByClassName(`cell__${item.monthDay}`));
          $row.forEach((cellValue, a) => {
            arrDaysValue.forEach((value, b) => {
              if(a === b) {
                cellValue.innerHTML = value;
              }
            })
          })
        }
      })
    })
  })
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
      }
    })
    let arrHours = [];
    let arrPp = [];
    let arrPubl = [];
    let arrVid = [];
    let arrIz = [];
    arrDaysValueId.forEach(value => {
      arrHours.push(value.hours)
      arrPp.push(value.pp)
      arrPubl.push(value.publ)
      arrVid.push(value.video)
      arrIz.push(value.iz)
    })
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
    let valueResult = [resultHours, resultPp, resultPubl, resultVid, resultIz];
    $wrapperTable.filter(table => {
      if(+ table.classList.value[29] === month.id) {
        let $cellResult = Array.from(table.getElementsByClassName(`cell__Итого:`));
        $cellResult.forEach((cell, cId) => {
          valueResult.forEach((valueRes, valResId) => {
            if(cId === valResId) {
              if(cId === 0) {
                cell.innerHTML = getTimeFromMins(valueRes);

              } else {
                cell.innerHTML = valueRes;
              }
            }
          })
        })
      }
    })
  })
}

buttonMonth.addEventListener('click', function(){
 if(isNaN(inputMonth.value) && inputDays.value > 0) {
  counterClick ++;
  reportsMonth.push(new CreateMonth(counterClick + 1, inputMonth.value, inputDays.value, counterClick))
  localStorage.setItem('reportsMonth', JSON.stringify(reportsMonth))
  renderWrapperTableDom(reportsMonth.length - 1, counterClick);
  inputDaysValue();
  sum();
 }else if(isNaN(inputDays.value)) {
  alert('Вы ввели не число в поле "Введите количество дней". Пожалуйста попробуйте ещё раз.');
 }else{
  alert('Вы ввели число в поле "Название месяца". Будьте внимательнее пожалуйста.');
 }
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
      if(reportsValue.length === 0) {
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
      }else {
        let arr = []
        reportsValue.forEach(obj => {
          arr.push(Object.entries(obj).flat()[3]);
        })
        function getIdenticValue(arr, value) {
          return arr.some(obj => obj === value)
        }
        if(getIdenticValue(arr, inputDate.value) && reportsValue[reportsValue.length - 1].id === counterClick + 1) {
          let reportsMonth = JSON.parse(localStorage.getItem('reportsMonth'));
          reportsMonth.forEach(month => {
            if(month.id === counterClick + 1) {
              alert(`Данные на ${inputDate.value} число ${month.monthName} месяца уже введены, чтобы их заменить очистите пожалуйста столбец соответствующей кнопкой для удаления и введите новые данные. У вас всё получится!`)
            }
          })
        }else {
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
        }
      }
    }else if(
      inputDate.value == ''
    ) {
      console.log(2)
      alert('Число месяца обязательный пункт для ввода.');
    } else {
      console.log(3)
      alert('Вы ввели не число в одно из полей. Будьте внимательнее пожалуйста.')
    }
  inputDate.value = '';
  inputHour.value = '';
  inputPP.value = '';
  inputPubl.value = '';
  inputVideo.value = '';
  inputIz.value = '';
}

buttonResult.addEventListener('click', pushBtnResult);

document.addEventListener('click', event => {
  let reportsValueTrans = [];
  let reportsValueNew = [];
  let $wrapperTable = document.querySelector(`.wrapper__year`);
  if(event.target.classList.contains('btn__delete')){
    let classBtn = + event.target.classList[1];
    reportsMonth.forEach((month, monthIdx) => {
      if(reportsMonth.length > 1) {
        if(month.id === classBtn) {
          reportsMonth.splice(monthIdx, 1);
          localStorage.setItem('reportsMonth', JSON.stringify(reportsMonth));
          reportsValue.forEach((objVal, objValIdx) => {
            if(objVal.id !== month.id) {
              reportsValueTrans.push(reportsValue.slice(objValIdx, objValIdx + 1));
              reportsValueNew = reportsValueTrans.flat();
              localStorage.setItem('reportsValue', JSON.stringify(reportsValueNew));
            }
          });
          $wrapperTable.innerHTML = ``;
          getReportsLength();
        };
      }else {
        reportsValue.splice(0);
        reportsMonth.splice(0);
        $wrapperTable.innerHTML = ``;
        localStorage.setItem('reportsValue', JSON.stringify(reportsValue));
        localStorage.setItem('reportsMonth', JSON.stringify(reportsMonth));
      };
    });
  } else if (event.target.classList.contains('btn__delete__values')) {
    let classCellBtn = + event.target.classList[3] - 1;
    let classTableBtn = + event.target.classList[2];
    reportsMonth.forEach((month, monthIdx) => {
      if(month.id === classTableBtn) {
        reportsValue.forEach((objVal, objValIdx) => {
          if(objVal.id === month.id) {
            if(+ objVal.monthDay === classCellBtn) {
              reportsValue.splice(objValIdx, 1);
              $wrapperTable.innerHTML = ``;
              localStorage.setItem('reportsValue', JSON.stringify(reportsValue))
              getReportsLength();
            }
          }
        })
      }
    })
  }
});

const getReportsLength = () => {
 reportsMonth.forEach((item, idx) => {
  renderWrapperTableDom(idx);
 });
  inputDaysValue();
  sum();
};
getReportsLength();