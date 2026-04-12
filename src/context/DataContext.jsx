import { createContext, useContext, useReducer, useEffect } from 'react';
import { initialMenu } from '../data/initialMenu';
import { initialNews } from '../data/initialNews';

const DataContext = createContext(null);

const loadFromStorage = (key, fallback) => {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : fallback;
  } catch {
    return fallback;
  }
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_MENU_ITEM': {
      const newItem = { ...action.payload, id: Date.now() };
      return { ...state, menu: [...state.menu, newItem] };
    }
    case 'UPDATE_MENU_ITEM': {
      return {
        ...state,
        menu: state.menu.map(item =>
          item.id === action.payload.id ? action.payload : item
        ),
      };
    }
    case 'DELETE_MENU_ITEM': {
      return { ...state, menu: state.menu.filter(item => item.id !== action.payload) };
    }
    case 'ADD_NEWS': {
      const newPost = { ...action.payload, id: Date.now() };
      return { ...state, news: [newPost, ...state.news] };
    }
    case 'UPDATE_NEWS': {
      return {
        ...state,
        news: state.news.map(post =>
          post.id === action.payload.id ? action.payload : post
        ),
      };
    }
    case 'DELETE_NEWS': {
      return { ...state, news: state.news.filter(post => post.id !== action.payload) };
    }
    default:
      return state;
  }
};

export function DataProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, {
    menu: loadFromStorage('moodj_menu', initialMenu),
    news: loadFromStorage('moodj_news', initialNews),
  });

  useEffect(() => {
    localStorage.setItem('moodj_menu', JSON.stringify(state.menu));
  }, [state.menu]);

  useEffect(() => {
    localStorage.setItem('moodj_news', JSON.stringify(state.news));
  }, [state.news]);

  return (
    <DataContext.Provider value={{ state, dispatch }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error('useData must be used within DataProvider');
  return ctx;
}
