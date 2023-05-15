import Content from './Content';
import Header from './Header';
import Total from './Total';

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total
        total={course.parts.reduce((total, part) => total + part.exercises, 0)}
      />
    </div>
  );
};
export default Course;
