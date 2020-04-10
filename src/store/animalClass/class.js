import StateMachine from 'javascript-state-machine';

/* ----===== Параметры у животного =====-------
status: ['INSEARCH', 'LIKED', 'ATHOME', 'DIED'], -
name: '',
entryDate: Date(),
birthday: Date(),
species: ['CAT', 'DOG'],
photo: [url],
thumbnail: [url],
sex: ['MALE', 'FEMALE', 'unset'],
vaccinated: ['true', 'false'],
sterilized: ['true', 'false', 'unknown'],
houseTrained: ['true', 'false', 'unknown'],
attitudeToChildren: ['POSITIVE', 'NEUTRAL', 'NEGATIVE', 'unknown'],
attitudeToAnimal: ['POSITIVE', 'NEUTRAL', 'NEGATIVE', 'unknown'],
weight: number,
age: Date(),
temperament: ['EXTRAACTIVE', 'ACTIVE', 'NEUTRAL', 'LAZY'],
progress: '', -
history: [''], -
story: '',
state: 'entered'
 */

/*  Попробовать заменить класс на обьект!! */

const write = (animal) => {
  const { _fsm, ...changes } = animal;
  /* db.writeAnimalToDB("Animal", changes)
		.then(
			result => {
				console.log('статус записан в БД');
			},
			error => {
				console.log(`ошибка ${error}`);
			}
		); */
};
/**
 * @description конечный автомат по работе с обьектом питомец
 * 
 */
export default StateMachine.factory({
  //  <-- the factory is constructed here
  init: 'entered',
  transitions: [
    {
      name: 'booked',
      from: 'entered',
      to: 'liked',
    },
    {
      name: 'takenAway',
      from: ['liked', 'entered'],
      to: 'inNewHome',
    },
    {
      name: 'canceled',
      from: 'liked',
      to: 'entered',
    },
    {
      name: 'death',
      from: ['liked', 'entered'],
      to: 'died',
    },
    {
      name: 'return',
      from: 'inNewHome',
      to: 'entered',
    },
    {
      name: 'goto',
      from: '*',
      to: function(s) {
        return s;
      },
    },
  ],
  data: function(obj) {
    let {
      id = '',
      status = 'inSearch',
      name = '',
      birthday = '',
      entryDate = '',
      species = 'Кошка',
      photos = 'someDefault',
      thumbnails = 'someDefault',
      sex = 'Женский',
      vaccinated = 'Непройдена',
      sterilized = 'Неизвестно',
      houseTrained = 'Неизвестно',
      attitudeToChildren = 'Нейтральное',
      attitudeToAnimal = 'Нейтральное',
      weight = '',
      age = '',
      temperament = 'Спокойны',
      progress = 'entered',
      story = '',
      history = ['inSearch'],
    } = obj;
    return {
      id,
      status,
      name,
      entryDate,
      birthday,
      species,
      photos,
      thumbnails,
      sex,
      vaccinated,
      sterilized,
      houseTrained,
      attitudeToChildren,
      attitudeToAnimal,
      weight,
      age,
      temperament,
      progress,
      story,
      history,
    };
  },
  methods: {
    // Для того чтобы в будующем отображать историю перемещения животного
    // желательно сохранять маленькое описание на каждое событие изменение статуса животного

    // Бронировать может любой человек, просто добавляет текстовое описание

    
    onBooked(lifecycle, text) {
      this.status = 'liked';
      this.progress = 'liked';
      this.history.push({
        from: 'entered',
        to: 'liked',
        date: new Date(),
        action: text === void 0 ? '' : text,
      });
      // Изменения записываются в базу, при этом нельзя использовать действия из db
      // pushNewAnimal так как оно ожидает картинки в формате base64_url
      // а мы передаем как url
      write(this);
    },
    onTakenAway(lifecycle, text) {
      this.status = 'atHome';
      this.progress = 'inNewHome';
      this.history.push({
        from: 'liked',
        to: 'inNewHome',
        date: new Date(),
        action: text === void 0 ? '' : text,
      });
      // commit to DB
      write(this);
    },
    onCanceled(lifecycle, text) {
      this.status = 'entered';
      this.progress = 'entered';
      this.history.push({
        from: 'liked',
        to: 'entered',
        date: new Date(),
        action: text === void 0 ? '' : text,
      });
      // commit to DB
      write(this);
    },
    onDeath(lifecycle, text) {
      this.status = 'died';
      this.progress = 'died';
      this.history.push({
        from: ['liked', 'entered'],
        to: 'died',
        date: new Date(),
        action: text === void 0 ? '' : text,
      });
      // commit to DB
      write(this);
    },
    onReturn(lifecycle, text) {
      this.status = 'entered';
      this.progress = 'entered';
      this.history.push({
        from: 'inNewHome',
        to: 'entered',
        date: new Date(),
        action: text === void 0 ? '' : text,
      });
      // commit to DB
      write(this);
    },
  },
});
