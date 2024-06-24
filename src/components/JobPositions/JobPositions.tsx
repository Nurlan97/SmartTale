import Input from '../../UI/Input/Input';
import styles from './JobPositions.module.scss';

const JobPositions = () => {
  const jobsData = ['Швея', 'Утюжник', 'Технолог'];
  return (
    <div className={styles.wrapper}>
      <Input
        onChange={formik.handleChange}
        value={formik.values.title}
        required={true}
        label='Должности'
        width='100%'
        disabled={true}
      />
      <ul className={styles.jobsList}>
        {jobsData.map((job, idx) => (
          <>
            <li key={idx}>{job}</li>
          </>
        ))}
      </ul>
    </div>
  );
};

export default JobPositions;
