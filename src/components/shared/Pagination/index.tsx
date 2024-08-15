// libs
import {
  type ChangeEvent, type FC, useEffect, useState,
} from 'react';
import { Button, NumericInput } from '@blueprintjs/core';

type PaginationProps = {
  currentPage: number;
  total: number;
  onChange: (currentPage: number) => void;
  className?: string;
};

const minPage = 1;

const Pagination:FC<PaginationProps> = ({
  currentPage, total, onChange, className,
}) => {
  const [page, setPage] = useState<string>(currentPage?.toString());

  useEffect(() => {
    if (Number(page) === currentPage) {
      return;
    }
    if (page === '') {
      setPage(currentPage?.toString());
    } else {
      onChange(Number(page));
    }
  }, [
    currentPage,
    onChange,
    page,
  ]);

  const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (Number(event.target.value) >= total) {
      setPage(total?.toString());
    } else {
      setPage(event.target.value);
    }
  };

  const nextPage = () => {
    if (Number(page) < total) {
      setPage((prevState) => (Number(prevState) + 1).toString());
    }
  };

  const prevPage = () => {
    if (Number(page) > minPage) {
      setPage((prevState) => (Number(prevState) - 1).toString());
    }
  };

  return (
    <div className={`pagination ${className ?? ''}`}>
      <Button disabled={Number(page) <= minPage} icon="arrow-left" intent="none" onClick={prevPage} variant="minimal" />
      <NumericInput buttonPosition="none" className="page-input" max={total} min={minPage} onChange={onInputChange} size="medium" value={currentPage?.toString()} />
      <span>
        {' '}
        -
        {' '}
        {total}
      </span>
      <Button disabled={Number(page) >= total} icon="arrow-right" intent="none" onClick={nextPage} variant="minimal" />
    </div>
  );
};

export default Pagination;
