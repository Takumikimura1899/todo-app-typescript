import React from 'react';

type Props = {
  text: string;
  filter: Filter;
  setText: React.Dispatch<React.SetStateAction<string>>;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

const InputForm: React.FC<Props> = ({
  text,
  filter,
  setText,
  handleSubmit,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder='Taskを入力してください'
        type='text'
        value={text}
        disabled={filter === 'checked'}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        type='submit'
        disabled={filter === 'checked'}
        onSubmit={(e) => e.preventDefault()}
      >
        追加
      </button>
    </form>
  );
};

export default InputForm;
