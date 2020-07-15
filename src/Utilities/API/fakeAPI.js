let decks = {
  bd76cbeac1b146c2aed53ad53abb28ba:
  {
    id: 'bd76cbeac1b146c2aed53ad53abb28ba',
    type: 'react',
    title: 'First Deck',
    cards_number: 3,
    author: 'gustavotdini',
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
  gustavotdini: {
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
    icon: 'url',
    backgroundColor: '#f9a825'
  },
  react:
  {
    name: 'React',
    id: 'react',
    icon: 'url',
    backgroundColor: '#282C34'
  },
  redux:
  {
    name: 'Redux',
    id: 'redux',
    icon: 'url',
    backgroundColor: '#D4D5D8'
  },
  android:
  {
    name: 'Android',
    id: 'android',
    icon: 'url',
    backgroundColor: '#D7EFFE'
  },
  ios:
  {
    name: 'IOS',
    id: 'ios',
    icon: 'url',
    backgroundColor: '#F3F3F3'
  },
  science:
  {
    name: 'Science',
    id: 'science',
    icon: 'url',
    backgroundColor: '#64dd17'
  },
  math:
  {
    name: 'Math',
    id: 'math',
    icon: 'url',
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