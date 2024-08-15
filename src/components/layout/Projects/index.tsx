// libs
import { type ChangeEvent, type FC } from 'react';
import { HTMLSelect, Spinner } from '@blueprintjs/core';
// components
import ProjectCreate from 'components/layout/Projects/Create';
import Project from 'components/layout/Projects/Project';
import Pagination from 'components/shared/Pagination';
// config
import { SortVariationEnum, SortVariations } from 'store/filters/config';
// hooks
import { useAppDispatch } from 'hooks/useAppDispatch';
import { useAppSelector } from 'hooks/useAppSelector';

import { useProjectsQuery } from 'store/api/projects';
// store
import { setPagination, setSort } from 'store/filters/slice';

const Projects:FC = () => {
  const filters = useAppSelector((state) => state.filterState);
  const { data, error, isFetching } = useProjectsQuery({ ...filters });
  const dispatch = useAppDispatch();

  if (isFetching) {
    return (
      <Spinner className="projects-loader" size={50} />
    );
  }

  const onPageChange = (page: number) => {
    dispatch(setPagination({ page, limit: filters.totalPage }));
  };

  const onSortChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = SortVariationEnum[event.target.value as keyof typeof SortVariationEnum];

    dispatch(setSort(selectedValue));
  };

  const renderProjects = () => (
    data.projects.map(({
      name, id, description, createdAt,
    }) => (
      <Project key={id} date={createdAt} description={description} id={id} name={name} />
    ))
  );

  return (
    <div className="projects-layout">
      <div className="project-layout-header">
        <ProjectCreate />
        <div className="project-sort">
          <span>Сортировать по:</span>
          <HTMLSelect minimal onChange={onSortChange} options={SortVariations} />
        </div>
      </div>
      <div className="projects-container">
        {
              error ? <p>{error.toString()}</p> : renderProjects()
}
      </div>
      <Pagination className="projects-pagination" currentPage={filters.page} onChange={onPageChange} total={data.totalPages} />
    </div>
  );
};

export default Projects;
