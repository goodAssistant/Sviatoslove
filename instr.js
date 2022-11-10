const container = document.querySelector('.container');

function setInstructions() {
 const instrWrapper = document.createElement('div')
 const deleteInstr = document.createElement('div')

 instrWrapper.classList.add('instr__wrapper');
 deleteInstr.classList.add('delete__form', 'delete__instr');
 container.prepend(instrWrapper)

 let quantityParagraphs = [
  'При первом запуске твоего нового помощника, считовода драгоценного времени и бесценного труда, хочется с тобой поздороваться: "Привээээт, родненький(ая)!!!"',

  'Первое, что ты увидишь, это будут две формы, в одну из них нужно ввести месяц, в другую будешь вводить свои доблестные труды...',

  'Первая форма, в поле - "Месяц" - принимает название месяца и его номер, например: март или 3 - тоже Март месяц. Нажав "Добавить", ты "нарисуешь" таблицу введённого месяца. Если нажмёшь "Добавить" сразу, то я "нарисую" текущий месяц.',

  'Вторая форма принимает одноимённые значения в каждое поле ввода. Поле "Число" принимает число месяца, если оставить его пустым, то я в него внесу число соответствующее дню ввода данных, из остальных полей ввода необходимо заполнить минимум одно поле. Они принимают исключительно цифры. Обрати внимание, что в поле "Минуты", я принимаю только минуты - люблю пересчитывать минуты на часы. В итоге ты получишь формат: чч:мин. В один день можно вводить значения сколько тебе удобно раз, все они будут суммироваться. Нажав кнопку "Внести", угадай, что произойдёт?',

  'В меню ты можешь выбирать: любой месяц для просмотра и редактирования; закрепить формы ввода или нет, убрав галочки напротив их позиций, ты сделаешь так, что они не будут появляться при загрузке программы; разные темы.',

  'Можно вводить данные на прямую, тапнув по любой из ячеек таблицы. При необходимости есть возможность удалить данные конкретного дня или целиком всей таблицы.',

  'В пункте "Итоги за месяц" выбери необходимый месяц, чтобы подвести итоги и сделать скриншот.'
 ];

 const template = 
 `
  <h4 class="instr__title">Здравствуй, дорогой друг!!!</h4>
  ${(quantityParagraphs.map((item, idx) => `<p class="instr__item instr__text${idx + 1}">${idx + 1}.  ${item}</p>`)).join('')}
  <h4 class="instr__bye">Успехов тебе, дорогой мой друг!!!</h4>
  <p class="prava release">Все не защищённые права, не защищены</p>
  <p class="inc release">Eternity Corporation</p>
  <p class="instr__footer release">Release 2.0</p>
 `
 instrWrapper.innerHTML = template;
 instrWrapper.append(deleteInstr);

 setTimeout(() => {
  overlay.classList.add('active');
 instrWrapper.classList.add('active');
 header.classList.add('active');
 }, 100)
 deleteInstr.addEventListener('click', () => {
  instrWrapper.style.opacity = '0'
  setTimeout(() => {
   overlay.classList.remove('active')
   instrWrapper.remove()
   header.classList.remove('active')
  }, 1000)
 })
}