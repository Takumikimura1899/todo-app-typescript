import React from 'react';

type Props = {
  setFilter: React.Dispatch<React.SetStateAction<Filter>>;
};

const Select: React.FC<Props> = ({ setFilter }) => {
  return (
    <select
      defaultValue='all'
      onChange={(e) => setFilter(e.target.value as Filter)}
    >
      <option value='all'>全てのタスク</option>
      <option value='checked'>完了したタスク</option>
      <option value='unchecked'>未完了のタスク</option>
      <option value='removed'>削除済みのタスク</option>
    </select>
  );
};

export default Select;
