import Part from './Part';

const Content = ({ course }) => {
  return (
    <>
      {course.parts.map((part) => (
        <Part part={part.name} exercises={part.exercises} key={part.id} />
      ))}
    </>
  );
};
export default Content;
