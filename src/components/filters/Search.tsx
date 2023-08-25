import * as React from "react";
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useHistory } from 'react-router-dom';
import { getUrlParam } from '../widgets/OpsWithUrl';

let typingTimer: ReturnType<typeof setTimeout> = null;

export const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const history = useHistory();

  useEffect(() => {
    const query = getUrlParam(history, 'q');
    setSearchTerm(query ? query : '');
  }, [history.location.search]);

  const handleSearchInput = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    const value = target.value;
    setSearchTerm(value);

    // stop Typing Timer if there is one already
    if (typingTimer !== null) {
      clearTimeout(typingTimer);
    }
    typingTimer = setTimeout(() => {
      changeUrlAndReload(value);
    }, 300);
  };

  const changeUrlAndReload = (value: string) => {
    const params = new URLSearchParams(history.location.search);
    params.set('q', value);
    params.delete('page');
    history.push('?' + params.toString());
  }

  const handleClearSearch = () => {
    setSearchTerm('');
    const params = new URLSearchParams(history.location.search);
    params.delete('q');
    params.delete('page');
    history.push('?' + params.toString());
  };

  return <div className="search">
            <span className="search__icon">
              <FontAwesomeIcon icon="search"/>
            </span>
            <input className="search__input" type="text" title="Search" placeholder="Search" onInput={(e) => handleSearchInput(e)} value={searchTerm}/>
            <span className="search__close-icon" tabIndex={0} onKeyPress={handleClearSearch} onClick={handleClearSearch}>
              <FontAwesomeIcon icon="times-circle"/>
            </span>
          </div>
};