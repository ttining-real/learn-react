import { arrayOf, string } from 'prop-types';

TagList.propTypes = {
  tags: arrayOf(string).isRequired,
};

/**@type {({ tags }: { tags: string[] }) => JSX.Element} */
function TagList({ tags }) {
  return (
    <ul className="TagList">
      {tags.map((tag) => (
        <li key={tag}>{tag}</li>
      ))}
    </ul>
  );
}

export default TagList;
