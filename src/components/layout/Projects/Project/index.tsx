// libs
import { type FC } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Elevation, Section, SectionCard,
} from '@blueprintjs/core';
// constants
import { ROUTES } from 'constants/routes';

type ProjectProps = {
  id: string;
  name: string;
  description: string;
  date: string;
};

const formatter = Intl.DateTimeFormat('ru-RU', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
});

const Project: FC<ProjectProps> = ({
  date, id, description, name,
}) => {
  const navigate = useNavigate();

  return (
    <Section
      className="project"
      elevation={Elevation.ONE}
      icon="control"
      onClick={() => navigate(ROUTES.PROJECT_LINK(id))}
      subtitle={formatter.format(new Date(date))}
      title={name}
    >
      <SectionCard>{description}</SectionCard>
    </Section>
  );
};

export default Project;
