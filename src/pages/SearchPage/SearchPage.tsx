import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { SearchItem } from '../../api/data-contracts';
import Header from '../../components/Header/Header';
import SearchResultUnit from '../../components/SearchResultUnit/SearchResultUnit';
import { useDebounce } from '../../hooks/useDebounce';
import { searchStore, userStore } from '../../store';
import ScrollableWrapper from '../../UI/ScrollableWrapper/ScrollableWrapper';
import SearchInput from '../../UI/SearchInput/SearchInput';
import styles from './searchPage.module.scss';
const SearchPage = observer(() => {
  const [searchParams, setSearchParams] = useSearchParams();

  const contexts: { context: SearchItem['type']; title: string }[] = [
    { context: 'ADVERTISEMENT', title: 'Все объявления' },

    { context: 'PRODUCT', title: 'Оборудование' },

    { context: 'ORDER', title: 'Заказы' },
  ];
  if (userStore.isAuth) {
    contexts.push(
      { context: 'MY_ADVERTISEMENT', title: 'Мои объявления' },
      { context: 'MY_PRODUCT', title: 'Мое оборудование' },
      { context: 'MY_ORDER', title: 'Мои заказы' },
      { context: 'USER', title: 'Пользователи' },
      { context: 'PURCHASE', title: 'Покупки' },
    );
  }
  if (userStore.orgId !== undefined) {
    contexts.push(
      { context: 'ORG_ORDER', title: 'Заказы организации' },
      { context: 'ORGANIZATION', title: 'Организации' },
      { context: 'EMPLOYEE', title: 'Работники' },
    );
  }
  const [search, setSearch] = useState('');
  useEffect(() => {
    const searchQuery = searchParams.get('query');
    const contextQuery = searchParams.get('context') as SearchItem['type'];
    if (searchQuery && contextQuery) {
      setSearch(searchQuery);
      searchStore.setContext(contextQuery);
      searchStore.fetchSearch(searchQuery, false, 8);
    }
  }, []);
  const debouncedSearch = useDebounce(() => {
    searchStore.fetchSearch(search, false, 8);
  }, 1000);
  return (
    <div className={styles.page}>
      <Header
        path={`${
          contexts.find((obj) => {
            return obj.context === searchStore.context;
          })?.title
        }/Поиск`}
        title={'Поиск'}
      />
      <div className={styles.body}>
        {/* <form
          className={styles.search}
          onSubmit={(e) => {
            e.preventDefault();
            searchStore.fetchSearch(search, false, 8);
          }}
        ></form> */}
        <SearchInput
          onChange={(e) => {
            setSearch(e.target.value);
            debouncedSearch();
          }}
          value={search}
          width='100%'
        />
        <div className={styles.contextWrapper}>
          <ScrollableWrapper>
            <div className={styles.context}>
              {contexts.map((cont) => {
                return (
                  <button
                    className={
                      cont.context === searchStore.context
                        ? styles.active
                        : styles.nonActive
                    }
                    key={cont.context}
                    onClick={() => {
                      searchStore.setContext(cont.context);
                      searchStore.fetchSearch(search, false, 8);
                    }}
                  >
                    {cont.title}
                  </button>
                );
              })}
            </div>
          </ScrollableWrapper>
        </div>
        <ScrollableWrapper>
          <div className={styles.results}>
            {searchStore.results.content.length > 0
              ? searchStore.results.content.map((res, ind) => {
                  return <SearchResultUnit item={res} key={ind} />;
                })
              : 'Ничего не найдено'}
          </div>
        </ScrollableWrapper>
      </div>
    </div>
  );
});

export default SearchPage;
