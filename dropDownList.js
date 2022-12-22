let dropdownUserValue;
let selectList;

if(localStorage.getItem('reportsValue')) {
 if(Array.isArray(reportsValue[0])) {
  dropdownUserValue = reportsValue[0];
 } else dropdownUserValue = [];
} else dropdownUserValue = [];

class CustomSelect {
 #id;
 #dropdownUserValue;
 #currentSelectedOption;

 constructor(id, dropdownUserValue) {
  this.#id = id,
  this.#dropdownUserValue = dropdownUserValue,
  this.#currentSelectedOption
 };

 render(container) {
  container.classList.add('select-dropdown__wrapp');
  const templateList = this.#dropdownUserValue.map((item, idx) => {
   if(idx <= 11) {
    return `<li class="select-dropdown__list-item" data-value=${item.value}>${convertHoursToMinutes(item.text)}</li>`;
   };
  }).join(''); 
  container.innerHTML = `
   <ul class="select-dropdown__list select-dropdown__list--${this.#id}"> 
    ${templateList}
   </ul> 
  ` ;
  wrapperInputHour.append(container);
  selectList = wrapperResult.querySelector('.select-dropdown__list');
 };

 addUserItemDrop(inputValue) {
  if(this.#dropdownUserValue.length >= 1) {
   const matches = this.#dropdownUserValue.find(item => convertMinutesToHours(item.text, false) === convertMinutesToHours(inputValue, false));
   if(matches) {
    matches.counter ++;
    reportsValue.splice(0, 1);
    reportsValue.unshift(this.#dropdownUserValue);
   }else{
    this.createObjectUser(inputValue);
   };
  }else {
   this.createObjectUser(inputValue, false);
  };
  this.#dropdownUserValue.sort(( a, b ) => b.counter - a.counter)
  this.render(dropDownWrapp);
 };

 createObjectUser(inputValue, bool = true) {
  let objUser = {
   key: 'dropdownUserValue',
   value: this.#dropdownUserValue.length + 1,
   text: inputValue,
   counter: 1
  };
  if(this.#dropdownUserValue.length <= 14) {
   this.#dropdownUserValue.push(objUser);
  }else {
   this.#dropdownUserValue.splice(this.#dropdownUserValue.length - 1, 1, objUser);
  };
  if(bool) reportsValue.splice(0, 1);
  reportsValue.unshift(this.#dropdownUserValue);
 };

 cutAndSaveObj() {
  dropdownUserValue = [...this.#dropdownUserValue];
 };

 get selectedValue() {
  return this.#currentSelectedOption;
 };

 set selectedValue(value) {
  this.#currentSelectedOption = value;
 };
};

const customSelect = new CustomSelect('my-id', dropdownUserValue);
const dropDownWrapp = document.createElement('div');
const inputsResult = wrapperResult.querySelector('.inputs__result');
const wrapperInputHour = inputsResult.querySelector('.wrapper__input__hour');
customSelect.render(dropDownWrapp);

const highlightElement = target => {
 selectList.querySelectorAll('.select-dropdown__list-item').forEach(item => item.classList.remove('selected'));
 target.classList.add('selected');
};

const selectElem = event => {
 event.stopPropagation();
 const {target} = event;
 highlightElement(target);
 const clickElemId = + target.dataset.value;
 customSelect.selectedValue = dropdownUserValue.find(item => item.value === clickElemId);
 inputHour.value = convertHoursToMinutes(customSelect.selectedValue.text);
 inputHour.focus();
 setTimeout(() => {
  buttonResult.classList.remove('btnShift');
  selectList.classList.remove('active')}, 200);
};

document.addEventListener('click', (event) => {
 const {target} = event;
 if(target.className.includes('input__hour')) {
  inputHour.onblur = () => {
  buttonResult.classList.remove('btnShift');
  };
  dropDownShow(event);
 }else {
  selectList.classList.remove('active')
  buttonResult.classList.remove('btnShift');
 };
});

function dropDownShow(event) {
 event.stopPropagation();
 if(localStorage.getItem('reportsValue')) {
  if(dropdownUserValue.length === 0) return;
  if(!selectList.classList.contains('active')) {
   selectList.classList.add('active')
   buttonResult.classList.add('btnShift');
  };
 };
 selectList.addEventListener('click', selectElem);
};
