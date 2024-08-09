import delay from '@/utils/delay';
import { arrayOf, func, node, number, string } from 'prop-types';
import { useEffect, useState } from 'react';

TagListAsyncPage.propTypes = {
  tags: arrayOf(string).isRequired,
  timeout: number,
  children: node,
  render: func,
};

/**@type {({ tags, timeout, render, children }: {tags: string[], timeout?: number, render?: (tags: string[]) => JSX.Element, children?: React.ReactNode}) => JSX.Element} */
function TagListAsyncPage({
  tags: tagsData,
  timeout = 1000,
  render,
  children,
}) {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    const fetchTags = async () => {
      await delay(timeout);
      setTags(tagsData);
    };

    fetchTags();
  }, []);

  return <div>{render?.(tags) ?? children}</div>;
}

export default TagListAsyncPage;
