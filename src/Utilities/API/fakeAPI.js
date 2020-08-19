
let decks = {
  bd76cbeac1b146c2aed53ad53abb28ba:
  {
    id: 'bd76cbeac1b146c2aed53ad53abb28ba',
    type: 'react',
    title: 'First Deck',
    cards_number: 3,
    author: 'gustavotdini',
    show_image: 'gs://udacitynativecards.appspot.com/reactBackImage.jpg',
    date_created: 6978641924629,
    views_number: 30,
    cards: [
      {
        question: 'Question One',
        answer: 'One'
      },
      {
        question: 'Question Two',
        answer: 'Two'
      },
      {
        question: 'Question three',
        answer: 'Three'
      },
    ]
  },
  ac68afcc60548d3a4f8fbd915a97f63:
  {
    id: 'ac68afcc60548d3a4f8fbd915a97f63',
    type: 'math',
    title: 'Second Deck',
    cards_number: 2,
    author: 'isoca',
    show_image: 'gs://udacitynativecards.appspot.com/mathBackImage.jpg',
    date_created: 6978641924629,
    views_number: 40,
    cards: [
      {
        question: 'Question One',
        answer: 'One'
      },
      {
        question: 'Question Two',
        answer: 'Two'
      },
    ]
  },
  a58694a0f3da1471fbd96145571e29d72:
  {
    id: 'a58694a0f3da1471fbd96145571e29d72',
    type: 'redux',
    title: 'Third Deck',
    cards_number: 5,
    author: 'gustavotdini',
    show_image: 'gs://udacitynativecards.appspot.com/reduxBackImage.jpg',
    date_created: 6978641924629,
    views_number: 50,
    cards: [
      {
        question: 'Question One',
        answer: 'One'
      },
      {
        question: 'Question Two',
        answer: 'Two'
      },
      {
        question: 'Question Three',
        answer: 'Three'
      },
      {
        question: 'Question Four',
        answer: 'Four'
      },
      {
        question: 'Question Five',
        answer: 'Five'
      },
    ]
  },
  d58694a0f3da1471fbd56145571e29d72:
  {
    id: 'd58694a0f3da1471fbd56145571e29d72',
    type: 'science',
    title: 'Fourth Deck',
    cards_number: 4,
    author: 'marilima',
    show_image: 'gs://udacitynativecards.appspot.com/scienceBackImage.jpg',
    date_created: 6978641924629,
    views_number: 50,
    cards: [
      {
        question: 'Question One',
        answer: 'One'
      },
      {
        question: 'Question Two',
        answer: 'Two'
      },
      {
        question: 'Question Three',
        answer: 'Three'
      },
      {
        question: 'Question Four',
        answer: 'Four'
      },
    ]
  },
}

let users = {
  gustavotdini: {
    name: 'Gustavo Trevisan Dini',
    id: 'gustavotdini',
    password: '123',
    decks: ["a58694a0f3da1471fbd96145571e29d72", "a58694a0f3da1471fbd96145571e29d72"],
  },
  isoca: {
    name: 'Mariana Arruda Alves de Lima',
    id: 'marilima',
    password: '123',
    decks: ["d58694a0f3da1471fbd56145571e29d72"],
  },
  isoca: {
    name: 'Isadora Alves de Lima Dini',
    id: 'isoca',
    password: '123',
    decks: ["ac68afcc60548d3a4f8fbd915a97f63"],
  },
}

let types = {
  coding:
  {
    name: 'Coding',
    id: 'coding',
    icon: '/typeIcons/coding.svg',
    backgroundColor: '#f9a825'
  },
  react:
  {
    name: 'React',
    id: 'react',
    icon: '/typeIcons/react.svg',
    backgroundColor: '#282C34'
  },
  redux:
  {
    name: 'Redux',
    id: 'redux',
    icon: '/typeIcons/redux.svg',
    backgroundColor: '#D4D5D8'
  },
  android:
  {
    name: 'Android',
    id: 'android',
    icon: '/typeIcons/android.svg',
    backgroundColor: '#D7EFFE'
  },
  ios:
  {
    name: 'IOS',
    id: 'ios',
    icon: '/typeIcons/apple.svg',
    backgroundColor: '#F3F3F3'
  },
  science:
  {
    name: 'Science',
    id: 'science',
    icon: '/typeIcons/dna.svg',
    backgroundColor: '#64dd17'
  },
  math:
  {
    name: 'Math',
    id: 'math',
    icon: '/typeIcons/calculation.svg',
    backgroundColor: '#dd2c00'
  }
}

export function _getUsers() {
  return new Promise((res, rej) => {
    setTimeout(() => res({ ...users }), 1000)
  })
}

export function _getDecks() {
  return new Promise((res, rej) => {
    setTimeout(() => res({ ...decks }), 1000)
  })
}

export function _getTypes() {
  return new Promise((res, rej) => {
    setTimeout(() => res({ ...types }), 1000)
  })
}

//<span>Photo by <a href="https://unsplash.com/@antoine1003?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Antoine Dautry</a> on <a href="https://unsplash.com/s/photos/math?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Unsplash</a></span>
//<span>Photo by <a href="https://unsplash.com/@flowforfrank?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Ferenc Almasi</a> on <a href="https://unsplash.com/s/photos/react?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Unsplash</a></span>
//<span>Photo by <a href="https://unsplash.com/@thisisengineering?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">ThisisEngineering RAEng</a> on <a href="https://unsplash.com/s/photos/coding-database?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Unsplash</a></span>
//<span>Photo by <a href="https://unsplash.com/@f7photo?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Michael Longmire</a> on <a href="https://unsplash.com/s/photos/science?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Unsplash</a></span>
//<a href="https://iconscout.com/icons/questionnaire" target="_blank">Questionnaire Icon</a> by <a href="https://iconscout.com/contributors/jemismali">Jemis Mali</a> on <a href="https://iconscout.com">Iconscout</a>
//<a href='https://br.freepik.com/vetores/verde'>Verde vetor criado por freepik - br.freepik.com</a>
//<a href="https://iconscout.com/icons/chevron-left" target="_blank">Chevron Left Icon</a> by <a href="https://iconscout.com/contributors/fatkhulkarim">Fatkhul Karim</a> on <a href="https://iconscout.com">Iconscout</a>
//Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>