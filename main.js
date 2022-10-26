const wrapperMonth = document.querySelector('.form_month');
const wrapperResult = document.querySelector('.form_result');
const inputMonth = wrapperMonth.querySelector('.month');
const buttonMonth = wrapperMonth.querySelector('.order__month');
const inputDate = wrapperResult.querySelector('.input__date');
const inputHour = wrapperResult.querySelector('.input__hour');
const inputPP = wrapperResult.querySelector('.input__pp');
const inputPubl = wrapperResult.querySelector('.input__publ');
const inputVideo = wrapperResult.querySelector('.input__video');
const inputIz = wrapperResult.querySelector('.input__iz');
const buttonResult = wrapperResult.querySelector('.order__result');
const wrapperYear = document.querySelector('.wrapper__year');

const header = document.querySelector('.header');
const wrapperBurger = document.querySelector('.wrapper__burger');
const menuBurger = document.querySelector('.menu__burger__header');
const mouseOver = document.querySelector('.mouse__over');
const menu = document.querySelector('.menu');

const menuNav = document.querySelector('.nav');
const menuItem = Array.from(document.querySelectorAll('.menu__item'));
const menuLink = document.querySelectorAll('.menu__link');
const themesWrapper = document.querySelector('.themes__wrapper');
const themesTitle = document.querySelector('.themes__title');
const formWrappers = document.querySelectorAll('.form__wrapper');
const formTitle = Array.from(document.getElementsByTagName('h3'));
const inputs = document.querySelectorAll('.inputs');
const btnsAdd = document.querySelectorAll('.btns_add');
const goTopBtn = document.querySelector('.back_to_top');
const modalWindow = document.querySelector('.modal__window');
const modalWindowValues = document.querySelector('.modal__window__values');
const overlay = document.querySelector('#overlay-modal');
const checkMonth = document.querySelector('.check__month')
const checkValue = document.querySelector('.check__value')

const months = ['empty', 'январь', 'февраль', 'март', 'апрель', 'май', 'июнь', 'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь', 'empty'];
const currentMonth = new Date().getMonth() + 1;
const currentDate = new Date().getDate();
inputMonth.setAttribute('placeholder', upperCase(months[`${currentMonth}`]))

let reportsValueTrans = [];
let reportsValueNew = [];
let $wrapperYear = document.querySelector(`.wrapper__year`);
let scrollLeft = window.pageXOffset;
let scrollCenter = window.pageYOffset;
let reportsMonth;
let reportsValue;
let counterClick;
let reportsTheme;
let currentTheme;
let wrapperTables;
let $wrapperTable;
let $tableMonth;
let hoursPioneer = document.createElement('div');
let statusFormMonth;
let statusFormValues;
let infoDate;
let deleteForm;
let startTheme = 'theme__black';

class CreateTheme {
  constructor(theme, formMonth, formValues, infoDate, infoUpdate) {
    this.theme = theme;
    this.formMonth = formMonth;
    this.formValues = formValues;
    this.infoDate = infoDate;
    this.infoUpdate  = infoUpdate;
  };
};

const initTheme = theme => {
  header.classList.add(theme);
  menuBurger.classList.add(theme);
  menuNav.classList.add(theme);
  mouseOver.classList.add(theme);
  themesWrapper.classList.add(theme);
  themesTitle.classList.add(theme);
  modalWindow.classList.add(theme);
  menuLink.forEach(item => {item.classList.add(theme)});
  formTitle.forEach(item => {item.classList.add(theme)});
  formWrappers.forEach(item => {item.classList.add(theme)});
  inputs.forEach(item => {item.classList.add(theme)});
  btnsAdd.forEach(item => {item.classList.add(theme)});
};

const addTableInitTheme = theme => {
  const monthNames = wrapperYear.querySelectorAll('.month__name');
  const tds = Array.from(document.getElementsByTagName('TD'));
  const ths = Array.from(document.getElementsByTagName('TH'));
  const btnDeleteValues  = Array.from(document.querySelectorAll('.btn__delete__values'));
  const deleteBtns = Array.from(document.querySelectorAll('.btn__delete'));

  hoursPioneer.classList.add(theme);
  monthNames.forEach(item => {item.classList.add(theme)});
  tds.forEach(item => {item.classList.add(theme)});
  ths.forEach(item => {item.classList.add(theme)});
  deleteBtns.forEach(item => {item.classList.add(theme)});
  btnDeleteValues.forEach(item => {item.classList.add(theme)});
  btnDeleteValues.forEach(item => {item.classList.add(theme)});
};

if(!localStorage.getItem('reportsTheme')){
  reportsTheme = [];
  reportsTheme.push(new CreateTheme(startTheme, true, true, false, false));
  localStorage.setItem('reportsTheme', JSON.stringify(reportsTheme))
  currentTheme = startTheme;
  statusFormMonth = reportsTheme[0].formMonth;
  statusFormValues = reportsTheme[0].formValues;
}else {
  reportsTheme = JSON.parse(localStorage.getItem('reportsTheme'));
  currentTheme = reportsTheme[0].theme;
  statusFormMonth = reportsTheme[0].formMonth;
  statusFormValues = reportsTheme[0].formValues;
  infoDate = reportsTheme[0].infoDate;
};

statusFormMonth ? checkMonth.setAttribute('checked', '') : checkMonth.removeAttribute('checked');

statusFormValues ? checkValue.setAttribute('checked', '') : checkValue.removeAttribute('checked');

const initPage = theme => {
  if(!localStorage.getItem('reportsMonth') && !localStorage.getItem('reportsValue')) {
    reportsMonth = [];
    reportsValue = [];
    counterClick = -1;
    initTheme(theme);
  }else if(!localStorage.getItem('reportsValue')) {
    reportsMonth = JSON.parse(localStorage.getItem('reportsMonth'));
    reportsValue = [];
    counterClick = reportsMonth[reportsMonth.length - 1].counterClickTable;
    initTheme(theme);
    addTableInitTheme(reportsTheme[0].theme);
  }else if(!localStorage.getItem('reportsMonth')) {
    reportsMonth = [];
    counterClick = -1;
    reportsValue = JSON.parse(localStorage.getItem('reportsValue'));
    initTheme(theme);
  } else {
    reportsMonth = JSON.parse(localStorage.getItem('reportsMonth'));
    reportsValue = JSON.parse(localStorage.getItem('reportsValue'));
    initTheme(theme);
    if(reportsMonth.length === 0) {
      counterClick = -1;
    }else {
      counterClick = reportsMonth[reportsMonth.length - 1].counterClickTable;
      initTheme(theme);
      addTableInitTheme(theme);
    };
  };
};

initPage(currentTheme);

class CreateMonth {
  constructor(id, monthName, daysMonth, yearMonth, counterClickTable) {
    this.id = id;
    this.monthName = monthName;
    this.daysMonth = daysMonth;
    this.yearMonth = yearMonth;
    this.counterClickTable = counterClickTable
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

function setSumSee() {
  if (wrapperYear.children.length > 0) {
    const currentDay = new Date().getDate();
    const totalHours = document.querySelector('.total')
    const createDiv = () => {
      hoursPioneer.innerHTML = `Поднажми, у тебя уже: ${totalHours.innerHTML}`
      setTimeout(() => {
        hoursPioneer.classList.add('open_menu')
      }, 1);
    };
    if(hoursPioneer === undefined) {
      if(currentDay > 20 && Number(totalHours.innerHTML[0] + totalHours.innerHTML[1]) >= 30) {
        createDiv()
      };
    }else {
      if(currentDay > 20 && Number(totalHours.innerHTML[0] + totalHours.innerHTML[1]) >= 30) {
        hoursPioneer.classList.add('open_menu')
        hoursPioneer.innerHTML = `Поднажми, у тебя уже: ${totalHours.innerHTML}`
      }else {
        hoursPioneer.innerHTML = `Поднажми, у тебя уже: ${totalHours.innerHTML}`
        if(Number(totalHours.innerHTML[0] + totalHours.innerHTML[1]) < 30 || isNaN(Number(totalHours.innerHTML[0] + totalHours.innerHTML[1]))) {
          hoursPioneer.classList.remove('open_menu')
        }
      }
    }
  }
}

const addValuesBasket  = () => {
  let buttonsDelete = Array.from(document.querySelectorAll('.btn__delete__values'));
  reportsValue.filter(valueObj => {
    buttonsDelete.filter(item => {
      if(valueObj.id === + item.id && item.classList[1] === valueObj.monthDay) {
        item.classList.add('garbage');
      };
    });
  });
};

function initFormMonth(status) {
  if(status) {
    formWrappers[0].style.display = 'table';
    formWrappers[0].style.opacity = '1';
  }else {
    formWrappers[0].style.display = 'none';
    formWrappers[0].style.opacity = '0';
  };
};

function initFormValue(status) {
  if(status) {
    formWrappers[1].style.display = 'table';
    formWrappers[1].style.opacity = '1';
  }else {
    formWrappers[1].style.display = 'none';
    formWrappers[1].style.opacity = '0';
  };
};

initFormMonth(statusFormMonth);
initFormValue(statusFormValues);

function eraseFormMonthTransition(status) {
  if(status) {
    checkMonth.removeAttribute('checked')
    statusFormMonth = !status;
  }else {
    checkMonth.setAttribute('checked', '')
    statusFormMonth = !status;
  };
  reportsTheme[0].formMonth = statusFormMonth;
  localStorage.setItem('reportsTheme', JSON.stringify(reportsTheme));
  location.reload();
};

function eraseFormValueTransition(status) {
  if(status) {
    checkValue.removeAttribute('checked')
    statusFormValues = !status;
  }else {
    checkValue.setAttribute('checked', '')
    statusFormValues = !status;
  };
  reportsTheme[0].formValues = statusFormValues;
  localStorage.setItem('reportsTheme', JSON.stringify(reportsTheme))
  location.reload();
};

checkMonth.addEventListener('click', () => {eraseFormMonthTransition(statusFormMonth)});

checkValue.addEventListener('click', () => {eraseFormValueTransition(statusFormValues)});

if(!statusFormMonth) {
  wrapperResult.style.marginTop = '30px'
}
if(formWrappers[1].style.display === 'none' && formWrappers[0].style.display === 'none') {
  wrapperYear.style.marginTop = '40px'
}

const renderWrapperTableDom = obj => {
  if(reportsMonth.length > 0) {
    wrapperYear.innerHTML = '';
    $wrapperTable = document.createElement('div');
    $wrapperTable.classList.add(`wrapper__table`, `${obj.id}`)
    $tableMonth = document.createElement('table');
    let $tBody = document.createElement('tbody');
    $tableMonth.classList.add('table__month');
    let $monthName = document.createElement('h2');
    $monthName.classList.add('month__name');
    wrapperYear.prepend($wrapperTable);
    $wrapperTable.append($monthName);
    $wrapperTable.append($tableMonth);
    $tableMonth.append($tBody);
    $monthName.innerHTML = `${obj.monthName} ${obj.yearMonth}`;

    hoursPioneer.classList.add('hours__pioneer', reportsTheme[0].theme)
    $monthName.after(hoursPioneer)

    const arrDaysMonth = Array.from({ length: obj.daysMonth}, (v, i) =>  i + 1);
    arrDaysMonth.push('Итого:');
    const valueTitles = ['Число', 'Минуты', 'ПП', 'Публ', 'Видео', 'Из', 'Очистить»'];
    let $buttonDeleteTable = document.createElement('div');
    $buttonDeleteTable.classList.add('btn__delete', `${obj.id}`);
    $buttonDeleteTable.innerHTML = `Удалить таблицу`;
    $wrapperTable.append($buttonDeleteTable);
    valueTitles.forEach((row, idx) => {
      const $rowTr = document.createElement('tr');
      $rowTr.classList.add(`row__${obj.id}`);
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
            $buttonDeleteValues.setAttribute('id', `${obj.id}`);
            $rowTr.append($buttonDeleteValues);
          };
        } else {
          if(id === arrDaysMonth.length - 1){
            const $cellTd = document.createElement('th');
            $cellTd.classList.add(`cell__${days}`, `total`);
            $rowTr.append($cellTd);
          }else {
            const $cellTd = document.createElement('td');
            $cellTd.classList.add(`cell__${days}`, `${obj.id}`, `${row}`);
            $cellTd.setAttribute('id', `${days}`);
            $cellTd.contentEditable = 'true';
            $rowTr.append($cellTd);
          };
        };
        return $tBody.append($rowTr);
      });
    });
    addTableInitTheme(reportsTheme[0].theme);
  };
};

const getResult = (arr) => {
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
        if(+ elem.classList[1] === month.id){
          addValuesBasket(numDay);
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
      if(+ table.classList[1] === month.id) {
        let $cellResult = Array.from(table.getElementsByClassName(`cell__Итого:`));
        $cellResult.forEach((cell, cId) => {
          valueResult.forEach((valueRes, valResId) => {
            if(cId === valResId) {
              cId === 0 ? cell.innerHTML = getTimeFromMins(valueRes) : cell.innerHTML = valueRes;
            };
          });
        });
        month.totalHours = getTimeFromMins(valueResult[0])
        month.totalPp = valueResult[1]
        month.totalPubl = valueResult[2]
        month.totalVid = valueResult[3]
        month.totalIz = valueResult[4]
        localStorage.setItem('reportsMonth', JSON.stringify(reportsMonth));
      };
    });
  });
  setSumSee();
};

function upperCase(str) {
 let arr = [];
 str.split('').forEach((item, idx) => {
  idx === 0 ? arr.push(item.toUpperCase()) : arr.push(item)
 });
 return arr.join('')
};

function invisibleFormMonth() {
  formWrappers[0].style.opacity = '0';
  setTimeout(() => {formWrappers[0].style.display = 'none'}, 500)
} 

function addMonth(value, currentYear) {
  counterClick ++;
  let monthLength;
  for(let i = 0; i < months.length - 1; i++){
    if(months[i] === value.toLowerCase()) {
      monthLength = new Date(currentYear, i, 0).getDate();
      insertValueMonth(counterClick, upperCase(months[i]), monthLength, currentYear)
      invisibleFormMonth()
      break;
    }else if(+ value === i || value === '0' + i) {
      monthLength = new Date(currentYear, i, 0).getDate();
      insertValueMonth(counterClick, upperCase(months[i]), monthLength, currentYear)
      invisibleFormMonth()
      break;
    }else if (i === months.length - 2 && value !== months[i] || i === months.length - 2 && + value !== i) {
      imitationAlert('Введены не корректные данные. Введи пожалуйста название месяца либо соответствующий ему номер и будем двигаться дальше))). У тебя получится!;-)');
      break;
    };
  };
};

const daysInMonth = value => { 
  const currentYear = new Date().getFullYear();
  if(reportsMonth.length > 0) {
    let findMonth = months.find((item, idx) => + value === idx ? item : null)
    if(!reportsMonth.find(item => {
      if(item.monthName.toLowerCase() === findMonth) {
        if(item.yearMonth === currentYear) {
          return true;
        }
      }  
    })) {
      addMonth(value, currentYear);
    } else {
      imitationAlert('Вы уже вводили месяц с таким названием. Будьте внимательнее пожалуйста ;-)')
    }
  }else {
    addMonth(value, currentYear);
  }
  inputMonth.value = '';
};

function insertValueMonth (counterClick, monthName, daysValue, currentYear) {
  reportsMonth.push(new CreateMonth(counterClick + 1, monthName, daysValue, currentYear, counterClick))
  localStorage.setItem('reportsMonth', JSON.stringify(reportsMonth))
  renderWrapperTableDom(reportsMonth[reportsMonth.length - 1]);
  inputDaysValue();
  sum();
};

buttonMonth.addEventListener('click', function(){
  if(inputMonth.value === '') {
    daysInMonth(currentMonth.toString());
    formWrappers[1].style.marginTop = '40px'
  }else {
    daysInMonth(inputMonth.value);
    formWrappers[1].style.marginTop = '40px'
  }
});

document.addEventListener('keypress', function(event){
  if(event.target.classList.contains('month')) {
    if(event.keyCode === 13) {
      if(event.target.value === ''){
      }
      daysInMonth(inputMonth.value);
    };
  };
});

function setCurrentScrollInsertValue(value) {
  if(value < 11) {
  $tableMonth.scrollLeft = 45 * value;
  } else if(value > 10 && value < 21) {
    $tableMonth.scrollLeft = 50 * value;
  }else {
    $tableMonth.scrollLeft = 55 * value;
  };
};

function setVisualInputDate(strDate, strMonth = 0) {
  if(isNaN(strDate) && !isNaN(strMonth)) {
    if(inputDate.getAttribute('placeholder') === strDate) {
      inputDate.setAttribute('placeholder', `${currentDate}`)
    }else {
      inputDate.setAttribute('placeholder', strDate)
    }
  }else if(isNaN(strMonth) && !isNaN(strDate)) {
    if(inputMonth.getAttribute('placeholder') === strMonth) {
      inputMonth.setAttribute('placeholder', upperCase(months[`${currentMonth}`]))
    }else {
      inputMonth.setAttribute('placeholder', strMonth)
    }
  }
}

let infoWrapper;

function deleteInfoWrapper(smileGood) {
  infoWrapper.style.opacity = 0;
  setTimeout(() => {
    infoWrapper.remove()
    inputDate.after(smileGood)
    smileGood.classList.remove('none')
  }, 510)
  setTimeout(() => {
    smileGood.classList.add('none')
    setTimeout(() => {smileGood.remove()},510)
  }, 1500);
  setVisualInputDate(`Число`);
}

function getInfo(event) {
  if(!reportsTheme[0].infoDate) {
    infoWrapper = document.createElement('div');
    const infoInputDate = document.createElement('div');
    const checkWrapper = document.createElement('div');
    const checkInputDate = document.createElement('input');
    const smileGood = document.createElement('div');
    const deleteInfo = document.createElement('div')

    infoWrapper.classList.add('info__wrapper')
    infoInputDate.classList.add('info__input__date')
    checkWrapper.classList.add('check__wrapp')
    checkInputDate.classList.add('check__input__date')
    smileGood.classList.add('smile__good', 'none')
    deleteInfo.classList.add('delete__form', 'delete__info')

    event.target.after(infoWrapper)
    infoWrapper.append(infoInputDate)
    infoInputDate.after(checkWrapper)
    checkWrapper.append(checkInputDate)
    infoWrapper.append(deleteInfo)

    checkInputDate.setAttribute('type','checkbox')
    infoInputDate.innerHTML = `Если не введёшь число и оставишь поле пустым, то автоматически будет вписано сегодняшнее число`

    checkInputDate.addEventListener('change', () => {
      reportsTheme[0].infoDate = true;
      localStorage.setItem('reportsTheme', JSON.stringify(reportsTheme))
      deleteInfoWrapper(smileGood)
    })
    deleteInfo.addEventListener('click', () => {
      deleteInfoWrapper(smileGood)
    })
    inputDate.addEventListener('blur', () => {
      if(infoWrapper.isConnected) {
        setTimeout(() => {deleteInfoWrapper(smileGood)}, 200)
      }
    })
    infoDate = reportsTheme[0].infoDate;
  }
}

if(!infoDate) {
  inputDate.addEventListener('focus', getInfo)
}

inputs.forEach((item, idx) => {
  if(idx > 0) {
    item.addEventListener('focus',  () => {setVisualInputDate(`Число`)})
    item.addEventListener('blur', () => {setVisualInputDate(`Число`)})
  }else {
    item.addEventListener('focus',  () => {setVisualInputDate(0, 'Месяц')})
    item.addEventListener('blur', () => {setVisualInputDate(0, 'Месяц')})
  }
})

const pushBtnResult = () => {
  let id = + wrapperYear.children[0].classList[1];
  if(
    inputDate.value === '' &&
    !isNaN(inputDate.value) &&
    !isNaN(inputHour.value) && 
    !isNaN(inputPP.value) && 
    !isNaN(inputPubl.value) && 
    !isNaN(inputVideo.value) &&
    !isNaN(inputIz.value)
    ) {
    reportsValue.push(new CreateValue(
      id,
      currentDate.toString(), 
      inputHour.value,
      inputPP.value,
      inputPubl.value,
      inputVideo.value,
      inputIz.value
    ));
    localStorage.setItem('reportsValue', JSON.stringify(reportsValue))
    inputDaysValue();
    sum();
    setCurrentScrollInsertValue(currentDate.toString());
  }else if(
  !isNaN(inputDate.value) &&
  !isNaN(inputHour.value) && 
  !isNaN(inputPP.value) && 
  !isNaN(inputPubl.value) && 
  !isNaN(inputVideo.value) &&
  !isNaN(inputIz.value)) {
    reportsValue.push(new CreateValue(
      id,
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
    setCurrentScrollInsertValue(inputDate.value);
  }else {
    imitationAlert('Вы ввели не число в одно из полей. Будьте внимательнее пожалуйста.')
  };
  inputDate.value = '';
  inputHour.value = '';
  inputPP.value = '';
  inputPubl.value = '';
  inputVideo.value = '';
  inputIz.value = '';
  inputs.forEach((item, idx) => {idx > 0 ? item.blur() : null})
};

buttonResult.addEventListener('click', pushBtnResult);

document.addEventListener('keypress', function(event){
  if(
    event.target.classList.contains('input__date') ||
    event.target.classList.contains('input__hour') ||
    event.target.classList.contains('input__pp') ||
    event.target.classList.contains('input__publ') ||
    event.target.classList.contains('input__video') ||
    event.target.classList.contains('input__iz')
  ) {
    if(event.keyCode === 13) {
      pushBtnResult();
    };
  };
});

const modalText = document.querySelector('.modal__text')
const modalTextValues = document.querySelector('.modal__text__values')

function moveModalWindow(str = null) {
  if(overlay.classList.contains('active')) {
    overlay.classList.remove('active')
    modalWindow.classList.remove('active')
  }else {
    setTimeout(() => {
      overlay.classList.add('active')
      modalWindow.classList.add('active')
      modalText.innerHTML = str
    }, 800);
  };
  formWrappers[1].scrollIntoView();
};

function moveModalWindowValues(str = null) {
  if(overlay.classList.contains('active')) {
    overlay.classList.remove('active')
    modalWindowValues.classList.remove('active')
  }else {
    setTimeout(() => {
      overlay.classList.add('active')
      modalWindowValues.classList.add('active')
      modalTextValues.innerHTML = str
    }, 800);
  };
  formWrappers[1].scrollIntoView();
};

function modalBtnYes() {
  setTimeout(() => {
    document.querySelector('.yes__btn').addEventListener('click', event => {
      if(modalWindow.classList.contains('active')) {
        modalWindow.classList.remove('active')
        overlay.classList.remove('active')
      };
    });
  },810);
}

function imitationAlert(str) {
  $('.no__btn').css('display', 'none');
  moveModalWindow(str);
  modalBtnYes();
}

function deleteTable(event) {
  let classBtn = + event.classList[1];
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
        location.reload();
      };
    }else {
      reportsValue.splice(0);
      reportsMonth.splice(0);
      $wrapperYear.innerHTML = ``;
      localStorage.setItem('reportsValue', JSON.stringify(reportsValue));
      localStorage.setItem('reportsMonth', JSON.stringify(reportsMonth));
      eraseFormMonthTransition();
    };
  });
};

function imitationConfirmTable(func, e, str1, str2, str3, str4) {
  let clickYes = 0;
  btnsModal = document.querySelectorAll('.modal__btn');
  moveModalWindow(str1);
  btnsModal[0].onclick = function() {
    clickYes ++
    if(clickYes === 1) {
      modalText.innerHTML = str2;
    };
    if(clickYes === 2) {
      modalText.innerHTML = str3;
    };
    if(clickYes === 3) {
      modalText.innerHTML = str4;
    };
    if(clickYes === 4) {
      func(e);
    };
  };
  btnsModal[1].onclick = function() {
    clickYes = 0;
    moveModalWindow();
  };
};

function imitationConfirmValues(func, str1, e = null, classCellBtn = null, classTableBtn = null) {
  btnsModalValues = document.querySelectorAll('.modal__btn__values');
  moveModalWindowValues(str1);
  btnsModalValues[0].onclick = function() {
    func(e, classCellBtn = null, classTableBtn = null);
  }
  btnsModalValues[1].onclick = function() {
    moveModalWindowValues();
  }
};

function deleteValues(event, classCellBtn, classTableBtn) {
  let indexMonth = reportsMonth.map(month => month.id).indexOf(classTableBtn);
  let idMonth = reportsMonth[indexMonth].id;
  let currentValuesMonth = reportsValue.filter(item => item.id === idMonth);
  let valuesMonths = reportsValue.filter(item => item.id !== idMonth);
  let currentValues = currentValuesMonth.filter(item => + item.monthDay !== classCellBtn);
  let finalValues = [...valuesMonths, ...currentValues];
  localStorage.setItem('reportsValue', JSON.stringify(finalValues));
  reportsValue = JSON.parse(localStorage.getItem('reportsValue'));
  event.classList.remove('garbage');
  moveModalWindowValues();
  inputDaysValue();
  sum();
};

document.addEventListener('click', event => {
  if(event.target.classList.contains('btn__delete')) {
    let monthName = reportsMonth.find(item => item.id === + event.target.classList[1]).monthName;
    imitationConfirmTable(
      deleteTable, 

      event.target, 

      `Вы уверены, что желаете удалить таблицу за ${monthName} месяц и все введённые в неё данные без возможности восстановления?`,

      `Извиняюсь, но хочу ещё раз уточнить, хорошо подумайте, данные потом не восстановишь! Удалить таблицу?`,

      `Ладно, ладно, хорошо, я понял, ты кремень и решительно настроен, твоё "да" означает "да", как и написано! Хвалю и удаляю?`,

      `Мооооо - лооооооо - деееец!!!`
      )
  } else if (event.target.classList.contains('btn__delete__values')) {
    let classCellBtn = + event.target.classList[1];
    let classTableBtn = + event.target.id;
    let indexMonth = reportsMonth.map(month => month.id).indexOf(classTableBtn);
    let month = reportsMonth[indexMonth].monthName;
    if(event.target.classList.contains('garbage')) {
      imitationConfirmValues(
        deleteValues,
        `Вы уверены, что желаете очистить все значения в столбце за ${classCellBtn}-ое число месяца ${month}?`,
        event.target,
        classCellBtn,
        classTableBtn
        )
    }
  }else if(event.target.id !== '') {
    event.target.innerHTML = ''
    let element = event.target;
    let classTableBtn = + event.target.classList[1];
    let dateValue = event.target.id;
    let hourValue;
    let ppValue;
    let publValue;
    let videoValue;
    let izValue;
    event.target.addEventListener ('keypress', event => {
      if(event.key === 'Enter') {
        event.preventDefault();
        event.stopImmediatePropagation();
        if(!isNaN(+ event.target.innerHTML) && event.target.innerHTML !== '') {
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
          reportsValue.push(new CreateValue(
            classTableBtn,
            dateValue, 
            hourValue,
            ppValue,
            publValue,
            videoValue,
            izValue
          ));
          localStorage.setItem('reportsValue', JSON.stringify(reportsValue));
          inputDaysValue();
          sum();
          element.blur();
        }else if(event.target.innerHTML === '') {
          element.blur();
        }else {
          imitationAlert(`Вы ввели буквы. Это поле принимает только число. Как то так)))`);
          event.target.innerHTML = '';
          element.blur();
        };
      };
    });
    element.addEventListener('blur', event => {
      event.target.innerHTML = '';
      inputDaysValue();
    })
  };
});

const moveMenuBurger = () => {
  menuBurger.classList.toggle('open_menu');
  menuNav.classList.toggle('open_menu');
  wrapperBurger.classList.toggle('open_menu');
};

const closeBurgerMenu = () => {
  menuBurger.classList.remove('open_menu');
  menuNav.classList.remove('open_menu');
  wrapperBurger.classList.remove('open_menu');
}

const backToTop = () => {
  if (window.pageYOffset > 0) {
    window.scrollBy(0, (-window.pageYOffset));
  };
};

const closeThemesMenu = () => {
  setTimeout(() => {themesWrapper.classList.remove('open_menu')}, 1)
};

document.addEventListener("scroll", function() {
  if(window.pageYOffset >= 1) {
    goTopBtn.classList.add('back_to_top-show');
    closeBurgerMenu();
    closeThemesMenu();
  }else {
    goTopBtn.classList.remove('back_to_top-show');
  }
});

goTopBtn.addEventListener('click', () => {
  backToTop();
});

document.addEventListener('click', (event) =>{
  function fu() {
    let z;
    menuItem.forEach(item => {
      event.target === item ? z = true : false
    })
    return z;
  };
  if(event.target === menuBurger) {
    if(wrapperTables !== undefined) {
      wrapperTables.remove();
    }
    if(themesWrapper.classList.contains('open_menu')) {
      closeThemesMenu();
      overlay.classList.remove('active')
      menuBurger.classList.remove('open_menu');
    }else {
      moveMenuBurger();
    };
  }else if(fu() || event.target === menu || event.target === menuNav) {
    return;
  } else {
    menuBurger.classList.remove('open_menu');
    menuNav.classList.remove('open_menu');
    wrapperBurger.classList.remove('open_menu');
  };
});

const changeTheme = (theme) => {
  const monthNames = wrapperYear.querySelectorAll('.month__name');
  const tds = Array.from(document.getElementsByTagName('TD'));
  const ths = Array.from(document.getElementsByTagName('TH'));
  const deleteBtns = Array.from(document.querySelectorAll('.btn__delete'));
  let currentTheme = header.classList[1];
  header.classList.remove(currentTheme);
  menuBurger.classList.remove(currentTheme);
  menuNav.classList.remove(currentTheme);
  mouseOver.classList.remove(currentTheme);
  themesWrapper.classList.remove(currentTheme);
  themesTitle.classList.remove(currentTheme);
  modalWindow.classList.remove(currentTheme);
  hoursPioneer.classList.remove(currentTheme);
  menuLink.forEach(item => {item.classList.remove(currentTheme)});
  monthNames.forEach(item => {item.classList.remove(currentTheme)});
  formWrappers.forEach(item => {item.classList.remove(currentTheme)});
  formTitle.forEach(item => {item.classList.remove(currentTheme)});
  inputs.forEach(item => {item.classList.remove(currentTheme)});
  btnsAdd.forEach(item => {item.classList.remove(currentTheme)});
  tds.forEach(item => {item.classList.remove(currentTheme)});
  ths.forEach(item => {item.classList.remove(currentTheme)});
  deleteBtns.forEach(item => {item.classList.remove(currentTheme)});

  header.classList.add(theme);
  menuBurger.classList.add(theme);
  menuNav.classList.add(theme);
  mouseOver.classList.add(theme);
  themesWrapper.classList.add(theme);
  themesTitle.classList.add(theme);
  modalWindow.classList.add(theme);
  hoursPioneer.classList.add(theme);
  menuLink.forEach(item => {item.classList.add(theme)});
  monthNames.forEach(item => {item.classList.add(theme)});
  formWrappers.forEach(item => {item.classList.add(theme)});
  formTitle.forEach(item => {item.classList.add(theme)});
  inputs.forEach(item => {item.classList.add(theme)});
  btnsAdd.forEach(item => {item.classList.add(theme)});
  tds.forEach(item => {item.classList.add(theme)});
  ths.forEach(item => {item.classList.add(theme)});
  deleteBtns.forEach(item => {item.classList.add(theme)});
  reportsTheme[0].theme = theme;
  localStorage.setItem('reportsTheme', JSON.stringify(reportsTheme));
};

function setTotalMonth() {
  if(reportsMonth.length > 1) {
    overlay.classList.add('active')
    wrapperTotal = document.createElement('div');
    wrapperTotal.classList.add('tables__total', reportsTheme[0].theme);
    setInterval(() => wrapperTotal.classList.add('open_menu'), 1);
    header.append(wrapperTotal);
    closeBurgerMenu();
    let tableItem = (reportsMonth.map(item =>{ 
      let blockItem = 
      `
        <div class="menu__link">
          <a href="#" id=${item.id} class="table__link">
            ${item.monthName}   ${item.yearMonth}
          </a>
        </div>
      `
      return blockItem
    }))
    wrapperTotal.innerHTML = tableItem.join('')
    wrapperTotal.classList.add(reportsTheme[0].theme);
    const menuLinks = document.querySelectorAll('.menu__link');
    menuLinks.forEach(item => {
      if(!item.classList.contains(reportsTheme[0].theme)) {
        item.classList.add(reportsTheme[0].theme);
      };
    });
    const totalLinks = Array.from(document.querySelectorAll('.table__link'))
    totalLinks.forEach(item => {
      item.addEventListener('click', event => {
        event.preventDefault();
        reportsMonth.forEach(item => {
          if(+ event.target.id === item.id) {
            let template = 
            `
            <h2 class="month__name ${reportsTheme[0].theme}">${item.monthName} ${item.yearMonth}</h2>
            <table class="table__month ${reportsTheme[0].theme}">
              <tbody>
                <tr>
                  <th class="total__modal ${reportsTheme[0].theme}">
                    Публикации:
                  </th>
                  <td class="total__modal ${reportsTheme[0].theme}">
                    ${item.totalPubl}
                  </td>
                </tr>
                <tr>
                  <th class="total__modal ${reportsTheme[0].theme}">
                    Видеоролики:
                  </th>
                  <td class="total__modal ${reportsTheme[0].theme}">
                    ${item.totalVid}
                  </td>
                </tr>
                <tr>
                  <th class="total__modal ${reportsTheme[0].theme}">
                    Пп:
                  </th>
                  <td class="total__modal ${reportsTheme[0].theme}">
                    ${item.totalPp}
                  </td>
                </tr>
                <tr>
                  <th class="total__modal ${reportsTheme[0].theme}">
                    Часы:
                  </th>
                  <td class="total__modal ${reportsTheme[0].theme}">
                    ${item.totalHours}
                  </td>
                </tr>
                <tr>
                  <th class="total__modal ${reportsTheme[0].theme}">
                    Изучения:
                  </th>
                  <td class="total__modal ${reportsTheme[0].theme}">
                    ${item.totalIz}
                  </td>
                </tr>
              </tbody>
            </table>
            `;
            overlay.classList.remove('active')
            imitationAlert(template);
            wrapperTotal.remove();
          }
        })
      })
    })
  }else if(wrapperYear.children.length === 0) {
    imitationAlert('Добавьте таблицу, пожалуйста ;-)')
  }else {imitationAlert('Добавьте более одной таблицы, пожалуйста ;-)')}
} 

const deleteLocalStorage = () => {
  localStorage.clear();
  location.reload();
}

menuNav.addEventListener('click', event => {
  event.preventDefault();
  if(event.target.classList.contains('welcome')) {
    setInstructions();
  }else if(event.target.classList.contains('change__theme')) {
    overlay.classList.add('active')
    menuNav.classList.remove('open_menu');
    themesWrapper.classList.add('open_menu');
    const btnsThemes = document.querySelectorAll('.theme__link');
    btnsThemes.forEach(item => {
      item.addEventListener('click', event => {
      event.preventDefault();
      changeTheme(event.target.classList[1])
      closeThemesMenu();
      closeBurgerMenu();
      overlay.classList.remove('active')
      });
    });
  }else if(event.target.classList.contains('total__month')) {
    setTotalMonth();
  }else if(event.target.classList.contains('clear__data')) {
    imitationConfirmValues(
      deleteLocalStorage,
      `<div style="display:flex; justify-content: space-between; align-items: center;"><div style="width: min-content">Вы уверены, что желаете очистить данные всего приложения?</div><div class="localStorage__smile"></div></div>`
    )
  }else if(event.target.classList.contains('change__table')) {
    if(reportsMonth.length > 1) {
      overlay.classList.add('active')
      wrapperTables = document.createElement('div');
      wrapperTables.classList.add('tables__wrapper', reportsTheme[0].theme);
      setInterval(() => wrapperTables.classList.add('open_menu'), 1);
      header.append(wrapperTables);
      closeBurgerMenu();
      wrapperYear.classList.add('wrapper__year__none');
      let tableItem = (reportsMonth.map(item =>{ 
        let blockItem = 
        `
          <div class="menu__link">
            <a href="#" id=${item.id} class="table__link">
              ${item.monthName}   ${item.yearMonth}
            </a>
          </div>
        `
        return blockItem
      }))
      wrapperTables.innerHTML = tableItem.join('')
      wrapperTables.classList.add(reportsTheme[0].theme);
      const menuLinks = document.querySelectorAll('.menu__link');
      menuLinks.forEach(item => {
        if(!item.classList.contains(reportsTheme[0].theme)) {
          item.classList.add(reportsTheme[0].theme);
        };
      });
      const tableLinks = Array.from(document.querySelectorAll('.table__link'))
      tableLinks.forEach(item => {
        item.addEventListener('click', event => {
          event.preventDefault();
          reportsMonth.forEach(item => {
            if(+ event.target.id === item.id) {
              wrapperTables.remove();
              wrapperYear.classList.remove('wrapper__year__none');
              overlay.classList.remove('active')
              renderWrapperTableDom(item);
              inputDaysValue();
              sum();
            }
          })
        })
      })
    }else if(wrapperYear.children.length === 0) {
      imitationAlert('Добавьте таблицу, пожалуйста ;-)')
    }else {imitationAlert('Добавьте более одной таблицы, пожалуйста ;-)')}
  }else if(event.target.classList.contains('values__month')) {
    if(wrapperYear.classList.contains('wrapper__year__none')) {
      imitationAlert('Выберите пожалуйста сначала таблицу');
    }else {
      formWrappers[0].style.display = 'table';
      setTimeout(() => {formWrappers[0].style.opacity = '1'}, 100)
      closeBurgerMenu();
    }
  }else if(event.target.classList.contains('values__table')) {
    if(wrapperYear.classList.contains('wrapper__year__none')) {
      imitationAlert('Выберите пожалуйста сначала таблицу');
    }else {
      formWrappers[1].style.display = 'table';
      setTimeout(() => {formWrappers[1].style.opacity = '1'}, 100)
      closeBurgerMenu();
    };
  };
});

deleteForm = Array.from(document.querySelectorAll('.delete__form'));
deleteForm.forEach(item => {
  item.addEventListener('click', event => {
    if(event.target.classList.contains('delete__month')) {
      formWrappers[0].style.opacity = '0';
      setTimeout(() => {formWrappers[0].style.display = 'none'}, 500)
      formWrappers[1].style.marginTop = '30px'
    }else if(event.target.classList.contains('delete__values')) {
      formWrappers[1].style.opacity = '0';
      setTimeout(() => {formWrappers[1].style.display = 'none'}, 500)
      wrapperYear.style.marginTop = '40px'
    };
  });
});

i = 0;
dt = [
  '#ffd70000', '#ffd7001a', '#ffd70036', '#ffd7004d', '#ffd70063', '#ffd70080', '#ffd7009e', '#ffd700ba', '#ffd700d1', '#ffd700e6', '#ffd700fa', "#ffd700", "#d5c328", "#a0963e", "#767144", "#827e5f", "#8c8973", '#8e8c80', '#afaea6', '#d3d2cb', '#efeeea', '#ffffff', '#f5ede2', '#ecdcc7', '#f0d6b4', '#f5d09e', '#f4c689', '#f5bf78', '#f3b767', '#f2ae54', '#f3a742', '#ef9c2f', '#ef9c2f', '#ef941c', '#f3900f', '#ff9000', '#ff9002e3', '#ff9002c9', '#ff9002ad', '#ff90028f', '#ff900278', '#ff90025e', '#ff900247', '#ff900233', '#ff900221', '#ff90020d', '#ff900200', '#64398b17', '#64398b36', '#64398b4f', '#64398b70', '#64398b87', '#64398b9e', '#64398bb5', '#64398bcc', '#64398be3', '#64398bf5', '#64398b', '#6d399d', '#7235ab', '#752fb6', '#7c2ac8', '#7f23d4', '#7f17df', '#7f0de8', '#8206f5', '#8400ff', '#7906df', '#6606bb', '#5a0aa1', '#4f0f88', '#4c1a79', '#4e2375', '#562f78', '#613e80', '#6a4b86', '#704c90', '#694f80', '#614f71', '#74697e', '#76717a', '#737275', '#5a5a5a', '#393737', '#201f1f', '#100f0f', '#0e0e0e', '#000000'
];

function cl() {
  document.querySelector('.reports__title').style.color = dt[i++];
  if (i > dt.length) i=0;
  setTimeout("cl()",200);
};

// setTimeout("cl()",5);

const getReportsLength = () => {
  renderWrapperTableDom(reportsMonth[reportsMonth.length - 1]);
  inputDaysValue();
  sum();
};

getReportsLength();

if(!reportsTheme[0].infoUpdate) {
  setTimeout(() => {
    imitationAlert(`
    <div style="display:flex; justify-content: space-between; align-items: center;">
      <div style="width: min-content">Приветствую тебя, дорогой мой друг! В обновлении твоего помощника до версии 2.0
      Для корректной работы приложения необходимо очистить все данные с помощью соответствующего пункта в меню. Не спеши очищать данные если ты их не переписал, чтобы не потерять их безвозвратно. Успехов!
      </div>
      <div class="info__smile"></div>
    </div>
    <div style="display: flex; margin-top: 10px; align-items: center;">
      <div style="font-size: 10px; font-weight: 100; margin-left: auto;">
        Больше не показывать: 
      </div>
      <input type="checkbox" class="info__smile__input">
    </div>
    `)
    setTimeout(() => {
      header.classList.add('active')
      modalWindow.classList.add('start') 
      let smileInput = document.querySelector('.info__smile__input')
      smileInput.addEventListener('change', () => {
        reportsTheme[0].infoUpdate = true;
        localStorage.setItem('reportsTheme', JSON.stringify(reportsTheme))
      })
    },800)
  }, 2000)
}